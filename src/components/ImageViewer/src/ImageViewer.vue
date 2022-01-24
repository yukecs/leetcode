<template>
  <div :style="{ width: '100%', height: '100%', position: 'relative' }">
    <div
      class="image-viewer"
      ref="imageViewer"
      @mousewheel.stop="handleMouseWheel"
      @mousewheel.prevent
    >
      <image-base
        class="image"
        id="image-viewer-image"
        :src="props.src"
        draggable="false"
        :style="imageStyle"
        @load="onImageLoad"
        ref="mainImage"
      ></image-base>

      <!-- <div
      class="test"
      style="
        position: absolute;
        right: 0;
        top: 0px;
        z-index: 2022;
        max-width: 300px;
        background-color: rgb(255, 255, 255);
        padding: 20px;
        border: 1px solid gold;
      "
    >
      <h4 style="color: rgb(114, 182, 100)">
        位置:{{ props.modelValue.position }}
      </h4>
      <h4 style="color: rgb(114, 182, 100)">
        缩放:{{ props.modelValue.scale }}
      </h4>
      <h4 style="color: rgb(114, 182, 100)">
        ...{{scrollbar}}
      </h4>
    </div>

    <div
      class="test"
      style="
        position: absolute;
        right: 0;
        top: 300px;
        z-index: 2022;
        max-width: 300px;
        background-color: rgb(255, 255, 255);
        padding: 20px;
        border: 1px solid gold;
      "
    >
      <h4 style="color: rgb(109, 35, 12)">
        viewerMouse信息:{{ viewer.mouse }}
      </h4>
    </div>

    <test-base>
      <h2 style="color: rgb(35, 22, 150)">imageMouse信息</h2>
      <h4 style="color: rgb(33, 53, 71)">{{ image.mouse }}</h4>
    </test-base> -->
      <!-- <test-base :top="500"> Fps : {{ fps }} </test-base>

       -->
      <!-- <test-base>{{ isHoverMini }}</test-base> -->
      <div ref="miniViewer">
        <mini-viewer
          :src="props.src"
          :data="scrollbar"
          :scale="props.modelValue.scale"
          @onMiniChange="onMiniChange"
        ></mini-viewer>
      </div>
    </div>
    <scroll-bar
      :data="scrollbar"
      @onRightChange="onRightChange"
      @onBottomChange="onBottomChange"
      ref="scrollbarRef"
    >
    </scroll-bar>
  </div>
</template>

<script setup lang="ts">
import ImageBase from "@/components/public/image/image-base.vue";
import { ref, reactive, computed, onMounted, nextTick, watch } from "vue";
import {
  useMouseInElement,
  useMousePressed,
  useFps,
  useThrottleFn,
  useDebounceFn,
  useElementHover,
  useFocus
} from "@vueuse/core";
import type { IImageViewer } from "../type";
import ScrollBar from "./ScrollBar.vue";
import MiniViewer from "./MiniViewer.vue";
import OtherVue from "@/views/home/1Library/components/CefInstall/OfflineInstallation/Other.vue";

const BOUND = 100;

const props = defineProps<{
  src: string;
  modelValue: IImageViewer;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: IImageViewer): void;
}>();

const imageViewer = ref<HTMLElement | null>(null);

const mainImage = ref<HTMLElement | null>(null);

const image = ref({
  naturalWidth: 0,
  naturalHeight: 0,
  mouse: useMouseInElement(mainImage),
  size: computed(() => {
    return {
      width: image.value.naturalWidth * props.modelValue.scale,
      height: image.value.naturalHeight * props.modelValue.scale,
    };
  }),
  rotate: 0,
});

const miniViewer = ref(null);

const isHoverMini = useElementHover(miniViewer);

const fps = useFps();

const viewer = ref({
  // sizes: useElementSize(imageViewer),
  mouse: useMouseInElement(imageViewer),
  pressed: useMousePressed({ target: imageViewer }).pressed,
});

watch(
  [
    () => viewer.value.mouse.elementHeight,
    () => viewer.value.mouse.elementWidth,
  ],
  () => {
    useDebounceFn(showDefault, 500)();
  }
);

const onImageLoad = (e) => {
  const img = e.path[0] as HTMLImageElement;
  image.value.naturalWidth = img.naturalWidth;
  image.value.naturalHeight = img.naturalHeight;
  showDefault();
};

function showDefault() {
  const { elementWidth: viewerW, elementHeight: viewerH } = viewer.value.mouse;
  const { naturalHeight, naturalWidth } = image.value;
  let top = 0;
  let left = 0;
  let scale = 0;
  if (naturalWidth > naturalHeight) {
    const width = (viewerW * 4) / 5;
    scale = width / naturalWidth;
    left = (viewerW * 1) / 10;
    const height = (width * naturalHeight) / naturalWidth;
    top = (viewerH - height) / 2;
  } else {
    const height = (viewerH * 4) / 5;
    scale = height / naturalHeight;
    top = (viewerH * 1) / 10;
    const width = (height * naturalWidth) / naturalHeight;
    left = (viewerW - width) / 2;
  }

  updateModel({
    position: {
      top,
      left,
    },
    scale,
  });
  image.value.rotate = 0;
}

watch(
  [() => viewer.value.mouse.x, () => viewer.value.mouse.y],
  ([x, y], [prevX, prevY]) => {
    /**
     * Emit image's position when mouse's position is changed and mouse is pressed
     */

    if (viewer.value.pressed &&!isHoverMini.value) {
      // console.log(x-prevX,y-prevY)

      const { left, top } = props.modelValue.position;
      updateModel({
        position: {
          left: left + (x - prevX),
          top: top + (y - prevY),
        },
        scale: props.modelValue.scale,
      });
    }
  }
);
const imageStyle = computed(() => {
  let style = {
    transform: "",
    position: "absolute",
    width: "",
    height: "",
    // transformOrigin:'0px 0px'
  };
  const { left = 0, top = 0 } = props.modelValue.position;
  const scale = props.modelValue.scale || 1.0;
  const { naturalHeight, naturalWidth, rotate } = image.value;
  style.width = `${naturalWidth * scale}px`;
  style.height = `${naturalHeight * scale}px`;
  style.transform = `translate(${left}px,${top}px) rotate(${rotate}deg)`;
  // style.transform = `translate(${left}px,${top}px) scale(${scale}) rotate(${rotate}deg)`;
  return style;
});

// const imageStyle = computed(() => {
//   let style = {
//     transform: "",
//     position: "absolute",
//     width: "",
//     height: "",
//     transformOrigin:'0px 0px'
//   };
//   const { left = 0, top = 0 } = props.modelValue.position;
//   const scale = props.modelValue.scale || 1.0;
//   const { naturalHeight, naturalWidth, rotate } = image.value;
//   style.transform = `translate(${left}px,${top}px) scale(${scale}) rotate(${rotate}deg)`;
//   return style;
// });

const handleMouseWheel = (e) => {
  const scale = props.modelValue.scale || 1.0;

  const { wheelDelta } = e;
  if ((wheelDelta < 0 && scale <= 0.05) || (wheelDelta > 0 && scale >= 10))
    return;
  const { elementX: x, elementY: y } = viewer.value.mouse;
  const { left = 0, top = 0 } = props.modelValue.position;
  let nextScale = scale * (1 + 0.0008 * wheelDelta);
  let nextPosition = {
    left: (left - x) * (1 + 0.0008 * wheelDelta) + x,
    top: (top - y) * (1 + 0.0008 * wheelDelta) + y,
  };
  if (nextScale <= 0.045 || nextScale >= 10.005) {
    return;
  }

  updateModel({
    position: nextPosition,
    scale: nextScale,
  });
};

function updateModel(datas: IImageViewer) {
  let { top, left } = datas.position;
  let scale = datas.scale;
  const { elementWidth: viewerW, elementHeight: viewerH } = viewer.value.mouse;
  const { naturalHeight, naturalWidth } = image.value;
  const imageH = naturalHeight * scale;
  const imageW = naturalWidth * scale;

  if (top > viewerH - BOUND) {
    top = viewerH - BOUND;
  } else if (top + imageH < BOUND) {
    top = BOUND - imageH;
  }

  if (left > viewerW - BOUND) {
    left = viewerW - BOUND;
  } else if (left + imageW < BOUND) {
    left = BOUND - imageW;
  }

  emit("update:modelValue", {
    position: { left, top },
    scale,
  });
}

const scrollbar = computed(() => {
  const { elementHeight: viewerH, elementWidth: viewerW } = viewer.value.mouse;
  const { width: imageW, height: imageH } = image.value.size;
  const { top, left } = props.modelValue.position;
  const scrollTop = -top + viewerH - BOUND;
  const scrollHeight = imageH + viewerH - 2 * BOUND;

  const scrollLeft = -left + viewerW - BOUND;
  const scrollWidth = imageW + viewerW - 2 * BOUND;

  return {
    scrollTop,
    scrollHeight,
    clientHeight: viewerH,
    scrollLeft,
    scrollWidth,
    clientWidth: viewerW,
  };
});

const onRightChange = (val: number) => {
  val = -val;
  const { elementHeight: viewerH, elementWidth: viewerW } = viewer.value.mouse;
  const { width: imageW, height: imageH } = image.value.size;
  const scale = props.modelValue.scale || 1.0;
  const { top, left } = props.modelValue.position;
  const scrollHeight = imageH + viewerH - 2 * BOUND;
  let nextTop = top + scrollHeight * val;
  // if(nextTop>viewerH - BOUND){
  //   nextTop = viewerH - BOUND
  // }

  updateModel({
    position: {
      left,
      top: nextTop,
    },
    scale,
  });
};

const onBottomChange = (val: number) => {
  val = -val;
  const { elementHeight: viewerH, elementWidth: viewerW } = viewer.value.mouse;
  const { width: imageW, height: imageH } = image.value.size;
  const scale = props.modelValue.scale || 1.0;
  const { top, left } = props.modelValue.position;
  const scrollWidth = imageW + viewerW - 2 * BOUND;
  let nextLeft = left + scrollWidth * val;
  // if(nextTop>viewerH - BOUND){
  //   nextTop = viewerH - BOUND
  // }

  updateModel({
    position: {
      left: nextLeft,
      top,
    },
    scale,
  });
};

const onMiniChange = (value)=>{
  const {left,top} = value
  const scale = props.modelValue.scale || 1.0;
  const { left:prevLeft, top:prevTop } = props.modelValue.position
  updateModel({
    position: { left:left+prevLeft, top:top+prevTop },
    scale,
  });
}

function rotateFn(rotate?: number) {
  rotate = rotate || 90;
  image.value.rotate += rotate;
}

defineExpose({
  showDefault,
  rotateFn,
});
</script>
