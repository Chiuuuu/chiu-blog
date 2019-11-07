function debounce(fn, delay = 400) {
  let timer = null;
  
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay);
  }
}

function throttle(fn, delay = 400, beginStart = false) {
  let curTime = !!beginStart ? 0 : delay;
  let isFirst = true;    // 当前是否是初次触发状态
  let timer = null;      // 用于重置初次触发状态的定时器

  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      isFirst = true
      fn.apply(this, args)      // 事件结束后最终触发一次
    }, delay);
    
    let now = +new Date()
    if (!!isFirst) {   // 初次触发
      curTime = !!beginStart ? 0 : now 
      isFirst = false
    }
    if (now - curTime >= delay) {
      fn.apply(this, args)
      curTime = +new Date()
    }
  }
}

export {
  debounce,
  throttle
}