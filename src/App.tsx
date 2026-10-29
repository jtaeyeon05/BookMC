import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>Hello World!: {count}</div>
      <button type="button" onClick={() => setCount((prev) => prev + 1)}>
        Increase
      </button>
    </>
  );
}

export default App;
