import { initSate } from "./state"

export function initMinxin(Vue) {      //给Vue添加init方法
    Vue.prototype._init = function (options) {       //用于初始化操作
        // vue vm.$options 就是获取用户的配置
        // 我们使用的 vue 的时候 $nextTick $data $attr....
        const vm = this
        vm.$options = options    //将用户的选项挂载到实例上

        initSate(vm)
    }
}

