//引入最重要的模块gilp
var gulp =require('gulp');
//引用加载gulp加载模块，就可以通过$使用所有gulp模块 不需要再声明变量
var $=require('gulp-load-plugins')();//并且在方法后加上双扣号，表示立即调用
//引入没有gulp开头的模块
var open=require('open');

var mockApi = require('./mockApi');



//模块定义完成 来声明全局变量
/**
 * app全局变量用来定义目录路径
 * 比如sec目录 源代码放置位置
 * build目录是整合之后的文件 开发环境要用的文件放置目录
 * dist 用于生产部署目录
 */
var app={
	srcPath:'src/',
	devPath:'build/',
	prdPath:'dist/'
};


/**
 * 放置文件方式  使用拷贝方式
 * gulp.task定义一个任务  第一个参数为任务名称，第二个参数是回调函数，写入需要执行的内容
 * gulp.src()方法来读取文件
 * gulp.src('bower_components/xx/x');所有的子文件进行深度遍历读取所有文件
 * 如果只想读取js文件 gulp.src('bower_components/xx/x.js');
 * gulp.pipe()拷贝
 * 拷贝到生产环境和部署环境
 * gulp.dest()执行拷贝
 * 执行命令 gulp lib
 */


//gulp-plumber：修复了pipe处理异常的bug，让任务执行更平滑



gulp.task('lib',function(){
	gulp.src('bower_components/**/*.js')
	.pipe(gulp.dest(app.devPath + 'vender'))
	.pipe(gulp.dest(app.prdPath + 'vender'))
	.pipe($.connect.reload());
});

/**
 * 拷贝src目录下所有html文件
 * 执行命令 gulp html
 */
gulp.task('html',function(){
	gulp.src(app.srcPath + '**/*.html')
	.pipe(gulp.dest(app.devPath))
	.pipe(gulp.dest(app.prdPath))
	.pipe($.connect.reload());
});


/**
 * 拷贝json文件
 * 在src下创建data目录，里面存放用来模拟后台数据的json文件
 */
gulp.task('json',function(){
  gulp.src(app.srcPath + 'data/**/*.json')
    .pipe(gulp.dest(app.devPath + 'data'))
    .pipe(gulp.dest(app.prdPath + 'data'))
    .pipe($.connect.reload());
});

/**
 * 在src下创建style文件夹，里面存放less文件。
 * 只需要index.less文件作为入口，其他的子less文件的引用 通过在index.less中使用@import来实现。
 * //因为有gulp-load-plugins插件，可以直接用$.less调用gulp-less插件
 * .pipe($.cssmin())//因为有gulp-load-plugins插件，可以直接用$.less调用gulp-cssmin插件
 * .pipe(gulp.dest(app.prdPath + 'css'))//传入到线上路径之前先压缩css
 */
gulp.task('less', function(){
  gulp.src(app.srcPath + 'style/index.less')
    .pipe($.plumber())
    .pipe($.less())
    .pipe(gulp.dest(app.devPath + 'css'))
    .pipe($.cssmin())
    .pipe(gulp.dest(app.prdPath + 'css'))
    .pipe($.connect.reload());
});

gulp.task('js', function(){
  gulp.src(app.srcPath + 'script/**/*.js')
    .pipe($.plumber())
    .pipe($.concat('index.js'))//通过gulp-concat插件将所有js文件合并成一个index.js
    .pipe(gulp.dest(app.devPath + 'js'))
    .pipe($.uglify())//流入线上环境路径之前，压缩js代码
    .pipe(gulp.dest(app.prdPath + 'js'))
    .pipe($.connect.reload());
});

/**
 * 在src目录下创建image文件夹，用来存放图片
 * PS：icon图标类文件最好制作成sprite雪碧图，或者base64调用
 * .pipe($.imagemin())//流入线上环境路径之前，压缩image图片
 */
gulp.task('image', function(){
  gulp.src(app.srcPath + 'image/**/*')
  	.pipe($.plumber())
    .pipe(gulp.dest(app.devPath + 'image'))
    .pipe($.imagemin())
    .pipe(gulp.dest(app.prdPath + 'image'))
    .pipe($.connect.reload());
});

/**
 * 这样在每次构建的时候，只需要执行build总任务就可以，会把build任务数组内的任务执行一遍
 */
gulp.task('build',['image','js','less','json','lib','html']);

/**
 * 每次发布的时候，可能需要把之前目录内的内容清除，避免旧的文件对新的内容有所影响。
 * 需要在每次发布前删除dist和build目录
 */
gulp.task('clean', function(){
  gulp.src([app.devPath, app.prdPath])  //同时清除编码环境和线上环境的目录内容
    .pipe($.clean());
});


//为实现构建完成后，刷新浏览器，进行实时预览，
// 需要在每个任务最后添加.pipe($.connect.reload());
gulp.task('server', ['build'], function() {//serve任务中引入build任务
	$.connect.server({  //启动一个服务器
		root: [app.devPath], //服务器从哪个路径开始读取，默认从开发路径读取
		livereload: true, //每当写完之后自动刷新浏览器，只支持高版本浏览器
		port: 8060 //服务器端口号
	});

	open('http://localhost:8060'); //服务起来后，自动打开页面

	//watch作用，当监控的内容发生变化，修改原文件的时候，自动执行构建任务
	gulp.watch('bower_components/**/*', ['lib']);
	gulp.watch(app.srcPath + '**/*.html', ['html']);
	gulp.watch(app.srcPath + 'data/**/*.json', ['json']);
	gulp.watch(app.srcPath + 'style/**/*.less', ['less']);
	gulp.watch(app.srcPath + 'script/**/*.js', ['js']);
	gulp.watch(app.srcPath + 'image/**/*', ['image']);
});

/**
 * 控制台使用gulp命令，就会调用default任务
 * 这里设定的default任务是serve，即gulp等同于gulp serve。
 */
gulp.task('default', ['server']);
/*gulp.task('default', ['clean'], function(){
    gulp.start(['server']);
});*/