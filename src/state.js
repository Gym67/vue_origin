import { observe } from "./observe/index.js"

export function initSate(vm) {
    const opts = vm.$options   //获取所有的选项
    if (opts.data) {
        initData(vm)
    }
}
function proxy(vm, target, key) {
    Object.defineProperty(vm, key, { // vm.name
        get() {
            return vm[target][key]; // vm._data.name
        },
        set(newValue){
            vm[target][key] = newValue
        }
    })
}
function initData(vm) {
    let data = vm.$options.data    //这就是用户写的data数据  data可能是函数或对象
    data = typeof data === 'function' ? data.call(vm) : data
    vm._data = data; // 我将返回的对象放到了_data上

    // 对数据进行劫持 vue2里采用了一个api   defineProperty
    observe(data)
     // 将vm._data 用vm来代理就可以了 
     for (let key in data) {
        proxy(vm, '_data', key);
    }
    console.log(vm);
}