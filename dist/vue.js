(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

    function initSate(vm) {
        const opts = vm.$options;   //获取所有的选项
        if (opts.data) {
            initData(vm);
        }
    }
    function initData(vm) {
        let data = vm.$options.data;    //这就是用户写的data数据  data可能是函数或对象
        data = typeof data === 'function' ? data.call(vm) : data;
        console.log(data);

        // 对数据进行劫持 vue2里采用了一个api   defineProperty
        observe;
    }

    function initMinxin(Vue) {      //给Vue添加init方法
        Vue.prototype._init = function (options) {       //用于初始化操作
            // vue vm.$options 就是获取用户的配置
            // 我们使用的 vue 的时候 $nextTick $data $attr....
            const vm = this;
            vm.$options = options;    //将用户的选项挂载到实例上

            initSate(vm);
        };
    }

    // 将所有方法耦合在一起
    function Vue(options){         //options就是用户的选项
        debugger
        this._init(options);
    }

    initMinxin(Vue);      //扩展了init方法

    return Vue;

}));
//# sourceMappingURL=vue.js.map
