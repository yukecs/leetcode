<template>
  <div>
    <div class="mini-viewer" ref="viewer" v-show="isShow">
      <img
        class="mini-viewer-img"
        ref="image"
        draggable="false"
        :src="props.src"
        @click.stop="handleClick"
      />
      <div class="main-div" ref="mainDiv" :style="mainStyle"></div>
    </div>
    <!-- <test-base :top="400">{{ div.pressed }}</test-base> -->
  </div>
</template>

<script setup lang='ts'>
import { IScrollBar, IImageViewer } from "../type";
import { computed, ref, watch } from "vue";
import {
  useElementSize,
  useMouseInElement,
  useMousePressed,
} from "@vueuse/core";
const props = defineProps<{
  src: String;
  data: IScrollBar;
  scale: number;
}>();

const emit = defineEmits<{
  (e: "onMiniChange", value: { left: number; top: number }): void;
}>();

const image = ref(null);

const viewer = ref(null);

const mainDiv = ref(null);

const div = ref({
  pressed: useMousePressed({ target: mainDiv }).pressed,
  mouse: useMouseInElement(mainDiv),
});

watch(
  [() => div.value.mouse.x, () => div.value.mouse.y],
  ([x, y], [prevX, prevY]) => {
    if (div.value.pressed) {
      const {
        scrollTop,
        scrollLeft,
        scrollHeight,
        scrollWidth,
        clientHeight,
        clientWidth,
      } = props.data;
      const showImageW = scrollWidth - clientWidth + 200;
      const showImageH = scrollHeight - clientHeight + 200;
      const width = (clientWidth / showImageW) * imgW.value;
      const height = (clientHeight / showImageH) * imgH.value;
      const _y =
        imgH.value *
        (1 + (clientHeight - 200) / (scrollHeight - clientHeight + 200));
      const _x =
        imgW.value *
        (1 + (clientWidth - 200) / (scrollWidth - clientWidth + 200));
      const left = ((x - prevX) / width) * clientWidth;
      const top = ((y - prevY) / height) * clientHeight;

      emit("onMiniChange", {
        left: -left,
        top: -top,
      });
    }
  }
);

const { width: viewerW, height: viewerH } = useElementSize(viewer);

const { width: imgW, height: imgH } = useElementSize(image);

const isShow = computed(() => {
  const {
    scrollTop,
    scrollLeft,
    scrollHeight,
    scrollWidth,
    clientHeight,
    clientWidth,
  } = props.data;
  return (
    clientWidth < scrollWidth - clientWidth + 200 ||
    clientHeight < scrollHeight - clientHeight + 200
  );
});

const handleClick = (e) => {
  const { clientX: x, clientY: y } = e;
  const { elementPositionX: prevX, elementPositionY: prevY } = div.value.mouse;
  const {
    scrollTop,
    scrollLeft,
    scrollHeight,
    scrollWidth,
    clientHeight,
    clientWidth,
  } = props.data;
  const showImageW = scrollWidth - clientWidth + 200;
  const showImageH = scrollHeight - clientHeight + 200;
  const width = (clientWidth / showImageW) * imgW.value;
  const height = (clientHeight / showImageH) * imgH.value;
  const left = ((x - prevX-width/2) / width) * clientWidth;
  const top = ((y - prevY-height/2) / height) * clientHeight;
  emit("onMiniChange", {
        left: -left,
        top: -top,
  });
};

const mainStyle = computed(() => {
  const {
    scrollTop,
    scrollLeft,
    scrollHeight,
    scrollWidth,
    clientHeight,
    clientWidth,
  } = props.data;
  const showImageW = scrollWidth - clientWidth + 200;
  const showImageH = scrollHeight - clientHeight + 200;
  const width = (clientWidth / showImageW) * imgW.value;
  const height = (clientHeight / showImageH) * imgH.value;
  const y =
    imgH.value *
    (1 + (clientHeight - 200) / (scrollHeight - clientHeight + 200));
  const top =
    (viewerH.value - imgH.value) / 2 +
    (scrollTop / scrollHeight) * y -
    ((clientHeight - 100) / scrollHeight) * y;
  const x =
    imgW.value * (1 + (clientWidth - 200) / (scrollWidth - clientWidth + 200));
  const left =
    (viewerW.value - imgW.value) / 2 +
    (scrollLeft / scrollWidth) * x -
    ((clientWidth - 100) / scrollWidth) * x;

  const divTop = -top + (viewerH.value-imgH.value)/2 - 1
  const divLeft = -left + (viewerW.value-imgW.value)/2 - 1

  return {
    width: `${width}px`,
    height: `${height}px`,
    top: `${top}px`,
    left: `${left}px`,
    backgroundImage:`url('${props.src}')`,
    backgroundSize:`${imgW.value}px ${imgH.value}px`,
    backgroundPosition:`${divLeft}px ${divTop}px`
  };
});
</script>
