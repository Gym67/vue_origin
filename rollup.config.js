import babel from 'rollup-plugin-babel'
// rollup默认可以到处一个对象，作为打包的配置文件
export default {
    input: './src/index.js',    //入口
    output: {
        file: './dist/vue.js',    //出口
        name: 'Vue',              //global.Vue
        format: 'umd',            //esm es6模块  commonjs模块   iife自执行函数   umd
        sourcemap: true,           //希望可以调试源码
        plugins: [
            babel({
                exclude:'./node_modules/**'      //排除node_modules所有的文件
            })
        ]
    }
}