function starNumber(score) {
  const arr = []
  const num = score.toString().substring(0, 1)
  for (let i = 0; i < 5; i++) {
    if (i < num) {
      arr.push(1)
    } else {
      arr.push(0)
    }
  }
  return arr
}

function throttle(delay, ...func) {
  let timer

  if (timer) {
    clearTimeout(timer)
  } else {
    timer = setTimeout(() => {
      func
    }, delay)
  }
}

module.exports = {
  starNumber,
  throttle
}