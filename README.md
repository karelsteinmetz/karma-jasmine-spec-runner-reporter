# karma-jasmine-spec-runner-reporter

* karma plugin which reports Spec results as Html Jasmine SpecRunner
* spec-runner-template supports only ES6 with SystemJS

## Installation

through npm:
```bash
npm install karma-jasmine-spec-runner-reporter --save-dev
```

## Configuration
e.g.:
```js
// karma.conf.js
var karmaConf = {
    ...
    reporters: [ reporter, 'jasmine-spec-runner'],
    jasmineSpecRunnerReporter: {
        jasmineCoreDir: 'jasmine-core'
    },
    ...
};
```

### Options
* jasmineCoreDir
 * sets root of jasmine-core which is needed for html report, see: spec-runner-template.html,
 * directory jasmine-core have to be distributed through your build process.

```html
<!doctype html>
<html>
<head>
    <title>Jasmine Spec Runner</title>
    <link rel="stylesheet" type="text/css" href="<%= jasmineCore %>/jasmine.css">
    <noscript>No fun without JavaScript</noscript>
    <script type="text/javascript" src="<%= jasmineCore %>/jasmine.js"></script>
    <script type="text/javascript" src="<%= jasmineCore %>/jasmine-html.js"></script>
    <script type="text/javascript" src="<%= jasmineCore %>/boot.js"></script>
    <script src="system.js"></script>
    <%= imports %>
    <script>
        System.config({
            'baseURL': './',
            'defaultJSExtensions': true
        });
        var importPromises = [];
        for (i = 0; i < imports.length; i++)
            importPromises.push(System.import(imports[i]));

        Promise.all(importPromises)
                .then(function (modules) {
                    console.log(modules);
                    window.onload();
                });
    </script>
</head>
<body>
</body>
</html>
```
