/**
 * God help & forgive me,
 * I wanna build something
 * that's gonna outlive me.
 *
 * Observable wrapper around the history API.
 */
export function makeHistory() {
  const observers = {};

  const unsubscribe = (target, callback) => {
    if (!observers[target]) {
      return;
    }

    const index = observers[target].indexOf(callback);
    if (index > -1) {
      observers[target].splice(index, 1);
    }
  };

  const addObserver = (target, callback) => {
    if (!observers[target]) {
      observers[target] = [];
    }

    observers[target].push(callback);

    return () => unsubscribe(target, callback);
  };

  const getObservers = (target) => observers[target] || [];

  return new Proxy(window.history, {
    get: (target, prop, receiver) => {
      if (typeof prop !== "string") {
        return target[prop];
      }

      if (target[prop] && typeof target[prop] !== "function") {
        return target[prop];
      }

      if (prop.startsWith("on")) {
        const func = prop.slice(2);
        return (callback) => addObserver(func, callback);
      }

      return (...args) => {
        const callbacks = getObservers(prop);
        target[prop](...args);
        callbacks.forEach((cb) => cb(...args));
      };
    },
  });
}
