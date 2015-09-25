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