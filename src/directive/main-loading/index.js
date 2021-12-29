// src/directive/loading/index.js

import { createApp } from 'vue'
import Loading from './main-loading.vue'

// console.log('abc',Loading)

// const loadingCtor = createApp(Loading)
// console.log('123',loadingCtor)



const loadingDirective = {
  mounted(el, binding) {

    if (binding.value) {
      append(el,binding.value)
    }

  },
  updated(el, binding) {
    console.log(binding.value)
    if(binding.value !== binding.oldValue){
      binding.value ? append(el):remove(el)
    }
  },
}

const append = (el,type)=>{
  const div = document.createElement('div') //创建一个div放到body
  el.appendChild(div)
  el.$div=div
  //  console.log('🚀==========>>','module:mainloading');
  // /*console module*/
  // console.log(type)
  //  console.log('>>==========🚀');
  
  let loadingInstance = createApp(Loading,{type:type}).mount(div)
}

const remove = (el)=>{
  
  el.removeChild(el.$div)
}


export default loadingDirective