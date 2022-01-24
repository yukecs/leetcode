<template>
  <div class="bg-scrollbar base-scrollbar-right" v-if="isShow">
    <div
      class="scrollbar-slider scrollbar-slider-right"
      :style="{
        height: `${rightStyle.size * 100}%`,
        top: `${rightStyle.top * 100}%`,
      }"
      ref="rightScrollbar"
    ></div>
  </div>
  <div class="bg-scrollbar base-scrollbar-bottom" v-if="isShow">
    <div
      class="scrollbar-slider scrollbar-slider-bottom"
      :style="{
        width: `${bottomStyle.size * 100}%`,
        left: `${bottomStyle.left * 100}%`,
      }"
      ref="bottomScrollbar"
    ></div>
  </div>
</template>

<script setup lang='ts'>
import { IScrollBar } from "../type";
import { computed, ref, watch } from "vue";
import { useMousePressed, useMouse } from "@vueuse/core";
const props = defineProps<{
  data: IScrollBar;
}>();

const emit = defineEmits<{
  (e: "onRightChange", value: number): void;
  (e: "onBottomChange", value: number): void;
}>();

const rightScrollbar = ref(null);

const bottomScrollbar = ref(null);

const mouse = useMouse();

const right = ref({
  pressed: useMousePressed({ target: rightScrollbar }).pressed,
});

const bottom = ref({
  pressed: useMousePressed({ target: bottomScrollbar }).pressed,
});

watch(mouse.y, (y, prevY) => {
  const { top, size } = rightStyle.value;
  const { scrollTop, scrollHeight, clientHeight } = props.data;

  if (right.value.pressed) {
    emit("onRightChange", (y - prevY) / ((1-size)*clientHeight));
  }
});

const isShow = computed(()=>{
    const {
    scrollTop,
    scrollLeft,
    scrollHeight,
    scrollWidth,
    clientHeight,
    clientWidth,
  } = props.data;
    return (clientWidth<scrollWidth-clientWidth+200)||(clientHeight<scrollHeight-clientHeight+200)
})

watch(mouse.x, (x, prevX) => {
  const { left, size } = bottomStyle.value;
  const { scrollLeft, scrollWidth, clientWidth } = props.data;

  if (bottom.value.pressed) {
    emit("onBottomChange", (x - prevX) / ((1-size)*clientWidth));
  }
});

const rightStyle = computed(() => {
  const { scrollTop, scrollHeight, clientHeight } = props.data;
  const size = clientHeight / scrollHeight;
  const top = (scrollTop / scrollHeight) * (1 - size);
  return {
    size,
    top,
  };
});
const bottomStyle = computed(() => {
  const { scrollLeft, scrollWidth, clientWidth } = props.data;
  const size = clientWidth / scrollWidth;
  const left = (scrollLeft / scrollWidth) * (1 - size);
  return {
    size,
    left,
  };
});
</script>
