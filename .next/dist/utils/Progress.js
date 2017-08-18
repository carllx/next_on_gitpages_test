'use strict';

var _promise = require('next\\node_modules\\babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('next\\node_modules\\babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const Promise = require('promise-polyfill');
// require('./loadProgress.scss')
var percentComplete = 0;
var onSucess = function onSucess(res) {
  console.log('成功');
  LoadingLenght -= 1;
  console.log('XHRProgress @onErr:' + res.url + '完成, xhr 总数更新为' + LoadingLenght);
  // Percentage.update( LoadingLenght )
};
var onLoad = function onLoad(resolve) {
  return function () {
    // console.log('resolve',resolve)
    resolve(true);
  };
};
var onError = function onError(reject) {
  return function () {
    console.log('XHRProgress @onErr: 失败');
    reject(Error('There was a network error.'));
  };
};

var onProgress = function onProgress(xhr) {
  // console.log('xhr',xhr)
  if (xhr.lengthComputable) {
    // false的话total返回是0 ,github 上 json , js , txt
    percentComplete = Math.round(xhr.loaded / xhr.total * 100);
    console.log(percentComplete, '%');
  } else {
    console.log('@onProgress 该资源无法计算byte长度');
  }
};

var XHRProgress = // load function
function XHRProgress(src) {
  var _this = this;

  (0, _classCallCheck3.default)(this, XHRProgress);

  this.send = function (url) {
    return new _promise2.default(function (resolve, reject) {
      // Standard XHR to load an image
      var req = new XMLHttpRequest();
      req.onprogress = _this.onProgress;
      // req.onloadstart = this.onLoad(resolve);
      req.onload = _this.onLoad(resolve);
      req.onerror = _this.onError(reject);
      // req.addEventListener("abort", this.transferCanceled, false);
      req.open('GET', url);
      req.responseType = 'blob';
      // Send the request
      req.send();
    });
  };

  this.onProgress = onProgress;
  this.onLoad = onLoad;
  this.onError = onError;
  this.percentCount = 0;
};

module.exports = XHRProgress;
// 序列 询问
// const onProgress = (xhr) =>{
//   if(xhr.lengthComputable){ // false的话total返回是0 ,github 上 json , js , txt
//     let in100 = (xhr.loaded / xhr.total * 100) / this.source.length;
//     this.progress[i] = in100;
//     let sum = this.progress.reduce((a, b) => a + b, 0); //数组相加
//     console.log(Math.round(sum), '% loaded');
//   }
//   // if(xhr.upload)
//   if(xhr.upload) console.log(`xhr.upload.lengthComputable:${xhr.upload.lengthComputable}\nxhr.upload.total:${xhr.upload.total}`);
//   if(xhr.lengthComputable) console.log(`xhr.upload:${xhr.upload}\nxhr.lengthComputable:${xhr.lengthComputable}\nxhr.total:${xhr.total}`);
// }
// const Promise = require('promise-polyfill');
// function ProgressWithFetch(reader) {
//   var total = 0
//   return new Promise((resolve, reject) => {
//     function pump() {
//       //Progress.js?f92a8f4:106 Uncaught (in promise) TypeError: Cannot read property 'read' of undefined
//       reader.read().then(({done, value}) => {
//         if (done) {
//           resolve({ok:true})
//           return
//         }
//         total += value.byteLength
//         console.log(`received ${value.byteLength} bytes (${total} bytes in total)`)
//         pump()
//       }).catch(reject)
//     }
//     pump()
//   })
// }
// fetch("/music/pk/altes-kamuffel.flac")
//   .then(res => FetchInProgress(res.body.getReader()))
//   .then(() => log("consumed the entire body without keeping the whole thing in memory!"))
//   .catch(e => log("something went wrong: " + e))
// module.exports = ProgressWithFetch ;