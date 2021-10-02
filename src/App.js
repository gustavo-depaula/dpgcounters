import { useState } from "react";
import { useHistory, useLocation } from "./history";
import "./App.css";

function Counter({ counter, updateCounter }) {
  const makeOperation = (type) => () =>
    updateCounter({ counterId: counter.id, type });

  return (
    <div className="flex w-full justify-between max-w-sm mx-auto text-xl">
      <span>Marbles</span>

      <div className="text-center">
        <button onClick={makeOperation("dec")}>-</button>
        <span className="mx-4">{counter.value}</span>
        <button onClick={makeOperation("inc")}>+</button>
      </div>
    </div>
  );
}

function useCounterSet() {
  const [counterSet, setCounterSet] = useState({
    id: "",
    counters: [
      {
        id: "3434",
        value: 0,
        unsignedOperationsAcks: [],
      },
    ],
  });

  const [mutations, setMutations] = useState([]);

  const updateCounter = ({ type, counterId }) => {
    setMutations((ms) => [...ms, { type, counterId, ack: "asdf" }]);
  };

  const countersById = {};
  counterSet.counters.forEach((counter) => {
    countersById[counter.id] = { ...counter };
  });

  mutations.forEach(({ type, counterId }) => {
    if (type === "inc") {
      countersById[counterId].value++;
    }

    if (type === "dec") {
      countersById[counterId].value--;
    }
  });

  const counters = Object.values(countersById);
  console.log({ mutations, countersById });

  return {
    counters,
    updateCounter,
  };
}

function App() {
  const { counters, updateCounter } = useCounterSet();
  const history = useHistory();
  const location = useLocation();
  const route = location.pathname;
  const isInInitialPage = route === "/";

  return (
    <div className="App container mx-auto">
      <h1 className="text-4xl mt-8 mb-32">dpgcounters</h1>

      {isInInitialPage && (
        <>
          <button onClick={() => history.pushState({}, "Title", "/url")}>
            change route
          </button>
        </>
      )}

      {!isInInitialPage && (
        <>
          {counters.map((counter) => (
            <Counter
              key={counter.id}
              counter={counter}
              updateCounter={updateCounter}
            ></Counter>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
