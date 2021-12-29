<template>
  <div class="main-loading-wrap" :class="{ 'main-loading-wrap-mac': isMac }">
    <div class="main-loading-content">
      <!-- 左侧动画 -->
      <div
        class="main-loading-left tac"
        v-if="type === 'all' || type === 'left'"
      >
        <div class="mt30 main-load-show">
          <div class="top-square"></div>
          <div class="top-circle"></div>
        </div>

        <div class="main-loading-tab mt20 " v-for="(item, i) in 3" :key="i">
          <div
            v-for="(val, index) in 5"
            :key="index"
            class="main-load-show"
            :style="{ 'animation-delay': `${item + index * 0.2 - 0.5}s` }"
          >
            <!-- {{`${1+item*0.5+index*0.2}s`}} -->
            <div class="circle"></div>
            <div class="square"></div>
          </div>
          <hr
            class="mt30 main-load-show"
            :style="{ 'animation-delay': `${item + 1}s` }"
          />
        </div>
      </div>

      <div class="main-loading-middle f-center"></div>

      <!-- 右侧动画 -->
      <div class="main-loading-right" v-if="type === 'all' || type === 'right'">
        <div class="top-info mt40">
          <div
            class=" main-load-show"
            style="width: 76px; height: 8px"
            :style="{ 'animation-delay': `1s` }"
          ></div>
          <div
            class=" main-load-show"
            style="width: 163px; height: 8px"
            :style="{ 'animation-delay': `1.1s` }"
          ></div>
          <div
            class=" main-load-show"
            style="width: 131px; height: 8px"
            :style="{ 'animation-delay': `1.2s` }"
          ></div>
          <div
            class=" main-load-show"
            style="width: 150px; height: 8px"
            :style="{ 'animation-delay': `1.3s` }"
          ></div>
        </div>
      </div>

      <!-- 中间logo -->
      <div class="main-loading-animate-content">
        <div class="main-loading-logo f-center">
          <svg class="svg" aria-hidden="true">
            <use xlink:href="#iconlogo"></use>
          </svg>
        </div>
        <div class="main-loading-strip">
          <div class="main-loading-strip-active"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import g_config from "@/api/config.js";

export default {
  props: ["type"],
  setup(p) {
    const d = reactive({
      sideShow: false,
      stripWidth: "0%",
      topShow: false,
      tabShow: 0,
    });
    //__setupValue 标记
    //__setupFunc 标记
    return {
      d,
      isMac: g_config.isMac,
      //__setupReturn 标记
      //__setupEnd 标记
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/viriables.scss";
.main-loading-wrap {
  position: fixed;
  left: $nav-width;
  right: 0;
  top: 0;
  bottom: 0;
  background: #2f2f2f;
  z-index: 3090;
  .main-loading-content {
    width: 100%;
    height: 100%;
    display: flex;

    .main-loading-middle {
      height: 100%;
      flex: 5.59;
    }
  }
}
.main-loading-wrap-mac {
  left: $nav-mac-width;
}

@keyframes strip-show {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@mixin main-load-show {
  opacity: 0;
  animation-name: strip-show;
  animation-timing-function: ease-in-out;
  animation-duration: 1s;
  animation-fill-mode: forwards;
}

.main-load-show {
  @include main-load-show;
  animation-delay: 0.6s; //等待时间
}
.main-load-show-1200 {
  @include main-load-show;
  animation-delay: 1.2s; //等待时间
}
.main-load-show-1400 {
  @include main-load-show;
  animation-delay: 1.4s; //等待时间
}

.main-load-show-item0 {
  @include main-load-show;
  animation-delay: 1.2s; //等待时间
}
.main-load-show-item1 {
  @include main-load-show;
  animation-delay: 1.3s; //等待时间
}
.main-load-show-item2 {
  @include main-load-show;
  animation-delay: 1.4s; //等待时间
}

@keyframes strip-left {
  0% {
    width: 0px;
    opacity: 0;
  }
  100% {
    width: 260px;
    opacity: 1;
  }
}

.main-loading-left,
.main-loading-right {
  height: 100%;
  opacity: 0;
  border-right: #242424 solid 1px;
  background: #313131;

  animation-name: strip-left;
  animation-delay: 0.1s; //等待时间
  // animation-timing-function: ease-in-out;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;

  .top-square {
    background: #474747;
    width: 186px;
    height: 24px;
    display: inline-block;
    border-radius: 4px;
  }
  .top-circle {
    background: #474747;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: inline-block;
    margin-left: 17px;
  }
}

.main-loading-right {
  height: 100%;
  // flex: 1;
  width: 0px;
  border-left: #242424 solid 1px;
  background: #313131;
  .top-info {
    div {
      background: #474747;
      border-radius: 6px;
      margin-top: 16px;
      margin-left: 16px;
    }
  }
}

.left-active {
  width: 260px !important;
  transition: 0.5s;
  padding: 19px 16px;
}

.right-active {
  width: 229px !important;
  transition: 0.5s;
  padding-top: 30px;
  box-sizing: border-box;
}

.main-loading-animate-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 186px;
  height: 80px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .main-loading-logo {
    width: 48px;
    height: 48px;
    // border: 2px solid #ffffff;
    svg {
      width: 100%;
      height: 100%;
    }
    box-sizing: border-box;
    border-radius: 50%;
  }
  .main-loading-strip {
    position: relative;
    bottom: -18px;
    width: 100%;
    height: 6px;
    // box-shadow: (0px 4px 10px rgba(0, 0, 0, 0.1));
    border-radius: 6px;
    background: #474747;
  }
  .main-loading-strip-active {
    position: absolute;
    // width: 60%;
    height: 6px;
    // box-shadow:(0px 4px 4px rgba(0, 0, 0, 0.25));
    background: #6fcf97;
    border-radius: 6px;
    animation-name: strip-loading;
    // animation-delay: 0.5s;
    animation-duration: 8s;
    animation-fill-mode: forwards;
    // background: #474747;
  }
}

.main-loading-tab {
  width: 100%;
  // border-bottom: 1px solid #242424;
  height: 209px;
  box-sizing: border-box;
  div {
    margin-bottom: 2px;
  }
  div .square {
    background: #474747;
    width: 186px;
    height: 24px;
    display: inline-block;
    border-radius: 4px;
  }
  div .circle {
    background: #474747;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 17px;
    // margin-left: 17px;
  }
}

.tab-active {
  padding: 28px 0px;
}

@keyframes strip-loading {
  0% {
    width: 0%;
  }
  25% {
    width: 85%;
  }
  // 70% {
  //   width: 90%;
  // }
  100% {
    width: 99%;
  }
}
</style>
