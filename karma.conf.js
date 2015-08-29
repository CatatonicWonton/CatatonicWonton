module.exports = function(config){
  config.set({

    basePath : './',

    // when you finish a test, add it to the files array
    files : [
      'client/app/bower_components/angular/angular.js',
      'client/app/bower_components/angular-ui-router/release/angular-ui-router.js',
      'client/app/**/**/*Spec.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};