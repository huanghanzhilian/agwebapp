var fs = require('fs');
var path = require('path');

var mockbase = path.join(__dirname, 'mock');
var mockApi = function(res, pathname, paramObj, next) {
    switch (pathname) {
        case '/api/vote':
            var data = fs.readFileSync(path.join(mockbase, 'vote.json'), 'utf-8');

            // res.setHeader('Content-Type', 'application/json');
            res.setHeader('Content-type', 'application/javascript');
            res.end(paramObj.callback + '(' + data + ')');
            return;

        case '/api/getUserInfo':
            var data = fs.readFileSync(path.join(mockbase, 'getUserInfo.json'), 'utf-8');
            res.setHeader('Content-type', 'application/javascript');
            res.end(paramObj.callback + '(' + data + ')');
            return;
        case '/api/apply':
            var data = fs.readFileSync(path.join(mockbase, 'apply.json'), 'utf-8');
            res.setHeader('Content-type', 'application/javascript');
            res.end(paramObj.callback + '(' + data + ')');
            return;
        default:
            ;
    }
    next();
};

module.exports = mockApi;
console.log(mockApi);