import { observe } from "./observe"

export function initSate(vm) {
    const opts = vm.$options   //获取所有的选项
    if (opts.data) {
        initData(vm)
    }
}
function initData(vm) {
    let data = vm.$options.data    //这就是用户写的data数据  data可能是函数或对象
    data = typeof data === 'function' ? data.call(vm) : data
    console.log(data)

    // 对数据进行劫持 vue2里采用了一个api   defineProperty
    observe(data)
}