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
module.exports.throttle = function( fn , delay, time) {
    var timeout,
        startTime = new Date();
    return function() {
        var context = this,
            args = arguments,
            curTime = new Date();
        clearTimeout(timeout);
        // 如果达到了规定的触发时间间隔，触发 handler
        if (curTime - startTime >= time) {
            fn.apply(context, args);
            startTime = curTime;
            // 没达到触发间隔，重新设定定时器
        } else {
            timeout = setTimeout(function(){
                fn.apply(context, args);
            }, delay);
        }
    };
};


// debounce函数用来包裹我们的事件
module.exports.debounce = function(fn, delay) {
  // 持久化一个定时器 timer
  let timer = null;
  // 闭包函数可以访问 timer
  return function() {
    // 通过 'this' 和 'arguments'
    // 获得函数的作用域和参数
    let context = this;
    let args = arguments;
    // 如果事件被触发，清除 timer 并重新开始计时
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  }
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
