import {
  createCounterSet,
  createCounter,
  getCounterSet,
  updateCounter,
} from "@server/services";

test("create counter set returns a counter set", () => {
  const counterSet = createCounterSet();
  expect(counterSet.id).toEqual(expect.any(String));
  expect(counterSet.counters).toEqual([]);
});

test("create counter set does not return the same id", () => {
  const sets = new Set();

  for (let i = 0; i < 100; ++i) {
    sets.add(createCounterSet().id);
  }

  expect(sets.size).toBe(100);
});

test("create set in counter set", () => {
  const counterSetId = createCounterSet().id;
  createCounter({ counterSetId, counterId: "993399" });
  const counterSet = getCounterSet(counterSetId);
  expect(counterSet.counters).toEqual([
    {
      id: "993399",
      value: 0,
      unsignedOperationsAcks: [],
    },
  ]);
});

test("counter gets incremented", () => {
  const counterSetId = createCounterSet().id;
  const counterId = "4a78a5c071";
  createCounter({ counterSetId, counterId });
  updateCounter({
    counterSetId,
    counterId,
    operations: [{ type: "inc", ack: "4a78a" }],
  });

  let counterSet = getCounterSet(counterSetId);
  expect(counterSet.counters).toEqual([
    {
      id: counterId,
      value: 1,
      unsignedOperationsAcks: ["4a78a"],
    },
  ]);

  updateCounter({
    counterSetId,
    counterId,
    operations: [{ type: "inc", ack: "8a5c" }],
  });
  counterSet = getCounterSet(counterSetId);
  expect(counterSet.counters).toEqual([
    {
      id: counterId,
      value: 2,
      unsignedOperationsAcks: ["4a78a", "8a5c"],
    },
  ]);
});

test("counter gets decremented", () => {
  const counterSetId = createCounterSet().id;
  const counterId = "4a78a5c071";
  createCounter({ counterSetId, counterId });
  updateCounter({
    counterSetId,
    counterId,
    operations: [{ type: "dec", ack: "4a78a" }],
  });

  let counterSet = getCounterSet(counterSetId);
  expect(counterSet.counters).toEqual([
    {
      id: counterId,
      value: -1,
      unsignedOperationsAcks: ["4a78a"],
    },
  ]);

  updateCounter({
    counterSetId,
    counterId,
    operations: [{ type: "dec", ack: "8a5c" }],
  });
  counterSet = getCounterSet(counterSetId);
  expect(counterSet.counters).toEqual([
    {
      id: counterId,
      value: -2,
      unsignedOperationsAcks: ["4a78a", "8a5c"],
    },
  ]);
});
