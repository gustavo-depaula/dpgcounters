import {
  createCounterSet,
  createCounter,
  getCounterSet,
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
    },
  ]);
});
