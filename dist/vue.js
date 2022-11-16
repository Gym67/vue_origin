(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

    function observe(data) {
        // 对这个对象进行劫持
        if (typeof data !== 'object' || data == null) return      //只对对象进行劫持
        // 如果一个对象被劫持过了,那就不需要再被劫持了(要判断一个对象是否被劫持过,可以添加一个实例,用实例来判断是否被劫持过)
        return new Observer(data)            // 对数据观测
    }
    class Observer {
        constructor(data) {
            // Object.defineProperty只能劫持已经存在的属性(vue里面会为此单独写一些api $set $delete)
            this.walk(data);
        }
        walk(data) {           //循环对象    对属性依次劫持
            // "重新定义" 属性
            Object.keys(data).forEach(key => defineReactive(data, key, data[key]));
        }
    }
    function defineReactive(target, key, value) {     //闭包   属性劫持
        observe(value);                                  //对所有对象都进行劫持
        Object.defineProperty(target, key, {
            get() {                                //取值的时候  会执行get
                return value
            },
            set(newValue) {                        //修改的时候  会执行set
                // 里面值可能一样
                if (value === newValue) return
                value = newValue;
            }
        });
    }

    function initSate(vm) {
        const opts = vm.$options;   //获取所有的选项
        if (opts.data) {
            initData(vm);
        }
    }
    function proxy(vm, target, key) {
        Object.defineProperty(vm, key, { // vm.name
            get() {
                return vm[target][key]; // vm._data.name
            },
            set(newValue){
                vm[target][key] = newValue;
            }
        });
    }
    function initData(vm) {
        let data = vm.$options.data;    //这就是用户写的data数据  data可能是函数或对象
        data = typeof data === 'function' ? data.call(vm) : data;
        vm._data = data; // 我将返回的对象放到了_data上

        // 对数据进行劫持 vue2里采用了一个api   defineProperty
        observe(data);
         // 将vm._data 用vm来代理就可以了 
         for (let key in data) {
            proxy(vm, '_data', key);
        }
        console.log(vm);
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
        this._init(options);
    }

    initMinxin(Vue);      //扩展了init方法

    return Vue;

}));
//# sourceMappingURL=vue.js.map
