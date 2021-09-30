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

function createCounter({ counterSetId, counterId }) {
  const counterSet = db.counterSets.find(({ id }) => id === counterSetId);
  const counter = {
    id: counterId,
    value: 0,
  };
  counterSet.counters.push(counter);
  return counter;
}

function getCounterSet(counterSetId) {
  return db.counterSets.find(({ id }) => id === counterSetId);
}

module.exports = { createCounterSet, createCounter, getCounterSet };
