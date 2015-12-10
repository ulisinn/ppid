/**
 * Created by ulrichsinn on 03/19/2015.
 */
/// <reference path="typings/require.d.ts" />
requirejs.config({
    baseUrl: "ts",
    paths: {
        TweenMax: "../bower_components/gsap/src/minified/TweenMax.min",
        d3: "../bower_components/d3/d3.min",
        createjs: "../bower_components/easeljs/lib/easeljs-0.8.0.combined",
        AppFactory: "factory/AppFactory"
    },
    shim: {
        createjs: {
            exports: 'createjs'
        }
    }
});
requirejs(["AppFactory"], function (AppFactory) {
    var appFactory = new AppFactory();
    appFactory.run();
});
//# sourceMappingURL=config.js.map