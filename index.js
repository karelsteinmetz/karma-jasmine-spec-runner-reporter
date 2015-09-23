var path = require('path');
var fs = require('fs');
var simplet = require('simplet');
var glob = require('glob');


function createImportsScript(specs) {
    var imports = '<script>';
    imports += 'var imports = [';
    for (i = 0; i < specs.length; i++)
        imports += i < specs.length - 1
            ? '\'' + specs[i] + '\','
            : '\'' + specs[i] + '\'';
    imports += '];';
    imports += '</script>';
    return imports;
}

function normalizePath(spec, basePath, helper) {
    var normalizedPath = helper.normalizeWinPath(spec.replace(basePath, ''));
    return normalizedPath.length > 1 && normalizedPath[0] === '/'
        ? normalizedPath.substring(1)
        : normalizedPath;
}

var JasmineSpecRunnerReporter = function (config, logger, helper) {
    var log = logger.create('reporter.jasmine-spec-runner');
    var outputFile = helper.normalizeWinPath(path.resolve(config.basePath, 'jasmine-spec-runner.html'));
    var specsPattern = path.resolve(config.basePath, './**/*.spec.js');

    this.adapters = [];

    this.onRunStart = function (browsers) {
        var specs = glob.sync(specsPattern);
        var relativeSpecs = [];
        for (i = 0; i < specs.length; i++)
            relativeSpecs.push(normalizePath(specs[i], config.basePath, helper));

        var output = simplet().render(__dirname + '/spec-runner-template.html', {
            lib: helper.normalizeWinPath(path.relative('', __dirname)),
            imports: createImportsScript(relativeSpecs)
        });

        helper.mkdirIfNotExists(path.dirname(outputFile), function () {
            fs.writeFile(outputFile, output, function (err) {
                if (err)
                    log.warn('Jasmine Spec Runner could not be generated\n\t' + err.message);
            });
        });
    };
};

JasmineSpecRunnerReporter.$inject = ['config', 'logger', 'helper'];

module.exports = {
    'reporter:jasmine-spec-runner': ['type', JasmineSpecRunnerReporter]
};