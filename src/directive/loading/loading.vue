<template>
  <div v-show="d.visible" class="loading-wrap f-center">
    <div class="loading-main">
      <!-- 加载中 -->
      <div class="load-container load8">
        <div class="loader" :style="widthStyle"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'

export default {
  props: ['width'],
  setup(p) {
    const d = reactive({
      visible: true
    })

    const widthStyle = computed(() => {
      let w = 20;
      if (p.width > 80)
        w = 50;
      else if (p.width > 40)
        w = 25;
      else
        w = p.width * 0.5;

      return {
        width: w + 'px',
        height: w + 'px'
      }
    })
    //__setupValue 标记
    //__setupFunc 标记
    return {
      d,
      widthStyle,
      //__setupReturn 标记
      //__setupEnd 标记
    }
  }
}
</script>

<style lang='scss' scoped>
.loading-wrap {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 3090;
  background: rgba(54,54,54,0.9);
}

.loading-main {
  overflow-x: hidden;
  overflow-y: hidden;
  color: #fff;
  font-size: 12px;
  text-align: center;
}

.load8 .loader {
  /* font-size: 2px; */
  position: relative;
  text-indent: -9999em;
  border-top: 2px solid rgba(255, 255, 255, 0.1);
  border-right: 2px solid rgba(255, 255, 255, 0.1);
  border-bottom: 2px solid rgba(255, 255, 255, 1);
  border-left: 2px solid rgba(255, 255, 255, 1);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
.load8 .loader,
.load8 .loader:after {
  border-radius: 50%;
  width: 20px;
  height: 20px;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
