// src/directive/loading/index.js

import { createApp } from 'vue'
import Loading from './loading.vue'
import './index.css'

const loadingDirective = {
  mounted(el, binding) {
    if (binding.value) {
      append(el)
    }

    // el.style.position = 'relative';
  },
  updated(el, binding) {
    // console.log(binding.value)
    // console.log(el.style.position)
    if (binding.value !== binding.oldValue) {
      binding.value ? append(el) : remove(el)
    }
  },
}

const append = (el) => {
  const div = document.createElement('div') //创建一个div放到body
  div.classList.add("my-v-loading-bg");
  el.appendChild(div)
  el.$div = div
  if(el.style.position == "" || el.style.position =="static"){
    el.style.position = "relative"
  }
  el.style.pointerEvents = 'none';
  let loadingInstance = createApp(Loading, {
    width: Math.min(el.clientWidth, el.clientHeight),
  }).mount(div)
}

const remove = (el) => {
  el.style.pointerEvents = 'auto';
  el.removeChild(el.$div)
}


export default loadingDirective