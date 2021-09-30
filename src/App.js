import { useState } from "react";
import "./App.css";

function Counter() {
  return (
    <div className="flex w-full justify-between max-w-sm mx-auto text-xl">
      <span>Marbles</span>

      <div className="text-center">
        <button>-</button>
        <span className="mx-4">0</span>
        <button>+</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App container mx-auto">
      <h1 className="text-4xl mt-8 mb-32">dpgcounters</h1>
      <Counter></Counter>
    </div>
  );
}

export default App;
