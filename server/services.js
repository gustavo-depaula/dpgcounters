const crypto = require("crypto");

const db = {
  counterSets: [],
};

function createCounterSet() {
  const counterSet = {
    id: crypto.randomBytes(5).toString("hex"),
    counters: [],
  };
  db.counterSets.push(counterSet);

  return counterSet;
}

function getCounterSet(counterSetId) {
  return db.counterSets.find(({ id }) => id === counterSetId);
}

function createCounter({ counterSetId, counterId }) {
  const counterSet = getCounterSet(counterSetId);
  const counter = {
    id: counterId,
    value: 0,
    unsignedOperationsAcks: [],
  };
  counterSet.counters.push(counter);
  return counter;
}

function updateCounter({ counterSetId, counterId, operations }) {
  const counterSet = getCounterSet(counterSetId);
  const counter = counterSet.counters.find(({ id }) => id === counterId);

  const newCounter = operations.reduce((counter, operation) => {
    if (operation.type === "inc") {
      counter.value++;
    }
    if (operation.type === "dec") {
      counter.value--;
    }

    counter.unsignedOperationsAcks.push(operation.ack);

    return counter;
  }, counter);

  counterSet.counters = counterSet.counters.map((counter) => {
    if (counter.id === counterSetId) {
      return newCounter;
    }
    return counter;
  });
}

module.exports = {
  createCounterSet,
  createCounter,
  getCounterSet,
  updateCounter,
};
