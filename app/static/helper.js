function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

function qsAll(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

const addEvent = (target, eventName, handler) => {
  target.addEventListener(eventName, (event) => {
    try {
      handler(event);
    } catch (error) {
      return console.log(error);
    }
  });
};

function creatEl(element, scope = document) {
  return scope.createElement(element);
}

function customEv(target, eventName, detail) {
  const event = new CustomEvent(eventName, { detail });
  target.dispatchEvent(event);
}

export { qs, qsAll, addEvent, creatEl, customEv };
