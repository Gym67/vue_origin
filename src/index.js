import { initMinxin } from "./init"

// 将所有方法耦合在一起
function Vue(options){         //options就是用户的选项
    this._init(options)
}

initMinxin(Vue)      //扩展了init方法
export default Vue