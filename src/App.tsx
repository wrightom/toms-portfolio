import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    
      <p>Hello, World!</p>
      <br/>
      <button onClick={() => setCount(count + 1)}>The count is {count}</button>
    </>
  );
}

export default App;
