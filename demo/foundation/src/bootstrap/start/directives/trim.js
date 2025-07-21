function getInput(el) {
  let inputEle;
  if (el.tagName !== 'INPUT') {
    inputEle = el.querySelector('input');
    if (inputEle === null) {
      inputEle = el.querySelector('textarea');
    }
  } else {
    inputEle = el;
  }
  return inputEle;
}

function dispatchEvent(el, type) {
  const evt = document.createEvent('HTMLEvents');
  evt.initEvent(type, true, true);
  el.dispatchEvent(evt);
}

export default {
  mounted: function (el, binding, vnode, oldVnode) {
    const inputEle = getInput(el);

    const handler = function(event) {
      const newVal = event.target.value.trim();
      if (event.target.value !== newVal) {
        event.target.value = newVal;
        dispatchEvent(inputEle, 'input');
      }
    };
    // 回车后过滤空格(因为输入框可以回车调接口查询，所以这时候单纯的失去焦点过滤不起作用，要对回车键单独做一下处理)
    const keydown = function(event) {
      if (event.keyCode === 13) {
        const newVal = event.target.value.trim();
        if (event.target.value !== newVal) {
          event.target.value = newVal;
          dispatchEvent(inputEle, 'input');
        }
      }
    };
    el.inputEle = inputEle;
    el._blurHandler = handler;
    el._keyHandler = keydown;
    inputEle.addEventListener('blur', handler);
    inputEle.addEventListener('keydown', keydown);
  },
  unmounted(el) {
    const { inputEle } = el;
    inputEle.removeEventListener('blur', el._blurHandler);
    inputEle.removeEventListener('keydown', el._keyHandler);
  }
};