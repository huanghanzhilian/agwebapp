#使用技术
AngularJS + gulp + bower +less

#项目运行

```
cnpm i -g bower(安装bower)

bower install(安装第三方依赖)

cnpm install

gulp (运行)

```



# 说明

>  如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^

>  或者您可以 "follow" 一下，我会不断开源更多的有趣的项目

>  开发环境 window 10  Chrome 56  nodejs 6.10.0


>  如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR

>  项目交流群：476190214(QQ)

>  此项目总结了一些技术文档，可以去我的博客看看。[地址在这里](http://huanghanlian.com/)




# 效果演示

[查看demo请点击这里](http://www.huanghanlian.com/agwebapp/build/)（请用chrome手机模式预览）



# 项目布局

```
.
├── git                                               //版本管理
├── bower_components                                  //bower安装第三方依赖默认安装路径
├── build                                             //构建代码编译之后存放目录  未压缩用于调试
├── dist                                              //产品发布的目录  上线压缩体积最小化
├── node_modules                                      //node安装插件 默认安装目录
├── sec                                               //源码所存放的目录
│   ├── data                                          //存放假数据
│   ├── image                                         //图片存放目录
│   ├── script                                        //js存放目录
│   │   ├── config                                    //启动项目的配置文件目录 app.js启动时候读取配置信息
│   │   ├── controller                                //控制器目录
│   │   ├── directive                                 //指令目录
│   │   ├── filter                                    //过滤器目录
│   │   ├── service                                   //服务目录
│   │   ├── app.js                                    //启动程序入口文件
│   ├── style                                         //存放样式目录
│   ├── view                                          //存放html文件  html片段
├── ├── 404.html                                      //404页面 页面入口
├── ├── index.html                                    //页面入口
├── test                                              //存放单元测试和集成测试代码
├── .eslintrc                                         //校验js语法风格是否符合配置文件的要求
├── .gitignore                                        //git发布忽略文件
├── bower.json                                        //bower的配置文件
├── gulpfile.js                                       //gulp配置文件
├── package.json                                      //node插件配置文件
.
```