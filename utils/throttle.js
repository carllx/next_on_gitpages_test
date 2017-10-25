/*  节流函数
    摘自['实现图片懒加载'] (https://i.jakeyu.top/2016/11/26/%E5%AE%9E%E7%8E%B0%E5%9B%BE%E7%89%87%E6%87%92%E5%8A%A0%E8%BD%BD/#more)

    usage:

    // 实际想绑定在 scroll 事件上的 handler
    function lazyload(event) {}
    // 采用了节流函数
    window.addEventListener('scroll',throttle(lazyload,500,1000));

*/

// 简单的节流函数
// fn 要执行的函数
// delay 延迟
// time  在time时间内必须执行一次
// module.exports.throttle = function( fn , delay, time) {
//     var timeout,
//         startTime = new Date();
//     return function() {
//         var context = this,
//             args = arguments,
//             curTime = new Date();
//         clearTimeout(timeout);
//         // 如果达到了规定的触发时间间隔，触发 handler
//         if (curTime - startTime >= time) {
//             fn.apply(context, args);
//             startTime = curTime;
//             // 没达到触发间隔，重新设定定时器
//         } else {
//             timeout = setTimeout(function(){
//                 fn.apply(context, args);
//             }, delay);
//         }
//     };
// };


// debounce函数用来包裹我们的事件
// module.exports.debounce = function(fn, delay) {
//   // 持久化一个定时器 timer
//   let timer = null;
//   // 闭包函数可以访问 timer
//   return function() {
//     // 通过 'this' 和 'arguments'
//     // 获得函数的作用域和参数
//     let context = this;
//     let args = arguments;
//     // 如果事件被触发，清除 timer 并重新开始计时
//     clearTimeout(timer);
//     timer = setTimeout(function() {
//       fn.apply(context, args);
//     }, delay);
//   }
// }
//
// 参考:
// decko
// A concise implementation of the three most useful decorators:
// https://github.com/developit/decko/blob/master/src/decko.js
module.exports.debounce = function(fn, opts) {
    if (typeof opts==='function') { let p = fn; fn = opts; opts = p; }
        let delay = opts && opts.delay || opts || 0,
            args, context, timer;
        return function(...a) {
            args = a;
            context = this;
            if (!timer) timer = setTimeout( () => {
                fn.apply(context, args);
                args = context = timer = null;
            }, delay);
        };
}





//函数节流
module.exports.simpleThrottle = (fn, delay) => {
    let last = null;
    return () => {
        const now = + new Date();
        if (now - last > delay) {
            fn();
            last = now;
        }
    }
}

//函数防抖
module.exports.simpleDebouce = (fn, delay) => {
    let timer = null;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn();
        }, delay);
    }
}



/* eslint-disable no-undefined,no-param-reassign,no-shadow */

/**
 * Throttle execution of a function. Especially useful for rate limiting
 * execution of handlers on events like resize and scroll.
 *
 * @param  {Number}    delay          A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  {Boolean}   noTrailing     Optional, defaults to false. If noTrailing is true, callback will only execute every `delay` milliseconds while the
 *                                    throttled-function is being called. If noTrailing is false or unspecified, callback will be executed one final time
 *                                    after the last throttled-function call. (After the throttled-function has not been called for `delay` milliseconds,
 *                                    the internal counter is reset)
 * @param  {Function}  callback       A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                    to `callback` when the throttled-function is executed.
 * @param  {Boolean}   debounceMode   If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms. If `debounceMode` is false (at end),
 *                                    schedule `callback` to execute after `delay` ms.
 *
 * @return {Function}  A new, throttled, function.
 */
module.exports.throttle = function ( delay, noTrailing, callback, debounceMode ) {

    // After wrapper has stopped being called, this timeout ensures that
    // `callback` is executed at the proper times in `throttle` and `end`
    // debounce modes.
    var timeoutID;

    // Keep track of the last time `callback` was executed.
    var lastExec = 0;

    // `noTrailing` defaults to falsy.
    if ( typeof noTrailing !== 'boolean' ) {
        debounceMode = callback;
        callback = noTrailing;
        noTrailing = undefined;
    }

    // The `wrapper` function encapsulates all of the throttling / debouncing
    // functionality and when executed will limit the rate at which `callback`
    // is executed.
    function wrapper () {

        var self = this;
        var elapsed = Number(new Date()) - lastExec;
        var args = arguments;

        // Execute `callback` and update the `lastExec` timestamp.
        function exec () {
            lastExec = Number(new Date());
            callback.apply(self, args);
        }

        // If `debounceMode` is true (at begin) this is used to clear the flag
        // to allow future `callback` executions.
        function clear () {
            timeoutID = undefined;
        }

        if ( debounceMode && !timeoutID ) {
            // Since `wrapper` is being called for the first time and
            // `debounceMode` is true (at begin), execute `callback`.
            exec();
        }

        // Clear any existing timeout.
        if ( timeoutID ) {
            clearTimeout(timeoutID);
        }

        if ( debounceMode === undefined && elapsed > delay ) {
            // In throttle mode, if `delay` time has been exceeded, execute
            // `callback`.
            exec();

        } else if ( noTrailing !== true ) {
            // In trailing throttle mode, since `delay` time has not been
            // exceeded, schedule `callback` to execute `delay` ms after most
            // recent execution.
            //
            // If `debounceMode` is true (at begin), schedule `clear` to execute
            // after `delay` ms.
            //
            // If `debounceMode` is false (at end), schedule `callback` to
            // execute after `delay` ms.
            timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
        }

    }

    // Return the wrapper function.
    return wrapper;

};
