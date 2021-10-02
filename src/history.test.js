import { makeHistory } from "./history";

it("calls underlying history functions", () => {
  const methods = ["back", "forward", "go", "pushState", "replaceState"];
  const historySpys = methods.map((m) =>
    jest.spyOn(window.history, m).mockImplementation(() => jest.fn())
  );
  const history = makeHistory();
  methods.forEach((m) => history[m]());
  historySpys.forEach((spy) => expect(spy).toHaveBeenCalledTimes(1));
});

it("attach observers to underlying history functions", () => {
  jest.spyOn(window.history, "pushState").mockImplementation(() => jest.fn());
  const history = makeHistory();
  const callback = jest.fn();
  const stopObserving = history.onpushState((...values) => callback(values));
  const values = [{}, "title", "/url"];
  history.pushState(...values);
  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenCalledWith(values);

  stopObserving();

  history.pushState(...values);
  history.pushState(...values);
  history.pushState(...values);

  expect(callback).toHaveBeenCalledTimes(1);
});
