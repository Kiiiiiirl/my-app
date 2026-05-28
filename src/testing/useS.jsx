import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useReducer,
  useContext,
  createContext,
  useId,
  useLayoutEffect,
} from "react";

const ThemeContext = createContext();
// MAIN APP
export default function App() {
  // useState stores data that changes
  // Syntax:
  // const [value, setValue] = useState(initialValue)

  const [count, setCount] = useState(0);

  // useRef
  // useRef stores a value WITHOUT re-rendering the component
  // Also commonly used to access HTML elements directly
  const inputRef = useRef(null);

  // useEffect
  // useEffect runs AFTER the component renders

  useEffect(() => {
    console.log("Component rendered or count changed");

    // cleanup function
    return () => {
      console.log("Cleanup before next effect");
    };
  }, [count]);

  
  // useMemo
  // useMemo memorizes a calculated value
  // Useful for expensive calculations

  const expensiveCalculation = useMemo(() => {
    console.log("Calculating...");
    return count * 1000;
  }, [count]);

  ///////////////////////////////////////////////////////////
  // useCallback
  ///////////////////////////////////////////////////////////

  // useCallback memorizes a function
  // Useful when passing functions to child components

  const increase = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  ///////////////////////////////////////////////////////////
  // useReducer
  ///////////////////////////////////////////////////////////

  // Alternative to useState for more complex logic

  function reducer(state, action) {
    switch (action.type) {
      case "increment":
        return { number: state.number + 1 };

      case "decrement":
        return { number: state.number - 1 };

      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    number: 0,
  });

  ///////////////////////////////////////////////////////////
  // useId
  ///////////////////////////////////////////////////////////

  // Generates unique IDs
  // Useful for labels and accessibility

  const id = useId();

  ///////////////////////////////////////////////////////////
  // useLayoutEffect
  ///////////////////////////////////////////////////////////

  // Similar to useEffect
  // BUT runs BEFORE the browser paints the screen

  useLayoutEffect(() => {
    console.log("useLayoutEffect ran");
  }, []);

  ///////////////////////////////////////////////////////////
  // THEME FOR useContext
  ///////////////////////////////////////////////////////////

  const theme = "dark";

  return (
    <ThemeContext.Provider value={theme}>
      <div
        style={{
          padding: "20px",
          fontFamily: "Arial",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        <h1>React Hooks Explained</h1>

        {/* useState */}
        <section>
          <h2>1. useState</h2>

          <p>Stores changing data.</p>

          <h3>Count: {count}</h3>

          <button onClick={() => setCount(count + 1)}>
            Increase
          </button>

          <button onClick={() => setCount(count - 1)}>
            Decrease
          </button>
        </section>

        {/* useEffect */}
        <section>
          <h2>2. useEffect</h2>

          <p>
            Open the console. Every time count changes,
            useEffect runs.
          </p>

          <p>
            Current count: {count}
          </p>
        </section>

        {/* useRef */}
        <section>
          <h2>3. useRef</h2>
          <p>Access HTML elements directly without getElementById.</p>

          <input ref={inputRef} placeholder="Type something"/>

          <button onClick={() => {inputRef.current.focus();}}>Focus Input</button>

          <button onClick={() => {console.log(inputRef.current.value);}}>Print Input Value </button>
        </section>

        {/* ///////////////////////////////////////////////////////// */}
        {/* useMemo */}
        {/* ///////////////////////////////////////////////////////// */}

        <section>
          <h2>4. useMemo</h2>

          <p>
            Prevents expensive calculations from running
            unnecessarily.
          </p>

          <h3>Calculated Value: {expensiveCalculation}</h3>
        </section>

        {/* ///////////////////////////////////////////////////////// */}
        {/* useCallback */}
        {/* ///////////////////////////////////////////////////////// */}

        <section>
          <h2>5. useCallback</h2>

          <p>
            Memorizes functions so React does not recreate
            them every render.
          </p>

          <button onClick={increase}>
            Increase With useCallback
          </button>
        </section>

        {/* ///////////////////////////////////////////////////////// */}
        {/* useReducer */}
        {/* ///////////////////////////////////////////////////////// */}

        <section>
          <h2>6. useReducer</h2>

          <p>
            Better for complex state logic.
          </p>

          <h3>{state.number}</h3>

          <button
            onClick={() =>
              dispatch({ type: "increment" })
            }
          >
            +
          </button>

          <button
            onClick={() =>
              dispatch({ type: "decrement" })
            }
          >
            -
          </button>
        </section>

        {/* useContext */}
        <section>
          <h2>7. useContext</h2>
          <p>Shares data across components without props.</p>

          <ChildComponent />
        </section>

        {/* ///////////////////////////////////////////////////////// */}
        {/* useId */}
        {/* ///////////////////////////////////////////////////////// */}

        <section>
          <h2>8. useId</h2>

          <p>
            Generates unique IDs automatically.
          </p>

          <label htmlFor={id}>
            Name:
          </label>

          <input id={id} />
        </section>

        {/* ///////////////////////////////////////////////////////// */}
        {/* useLayoutEffect */}
        {/* ///////////////////////////////////////////////////////// */}

        <section>
          <h2>9. useLayoutEffect</h2>

          <p>
            Runs before the screen updates.
            Usually used for measurements and animations.
          </p>
        </section>

        {/* ///////////////////////////////////////////////////////// */}
        {/* EXTRA INFO */}
        {/* ///////////////////////////////////////////////////////// */}

        <section>
          <h2>Most Common React Hooks</h2>

          <ul>
            <li>useState → store changing values</li>
            <li>useEffect → run side effects</li>
            <li>useRef → reference elements/values</li>
            <li>useContext → global shared data</li>
            <li>useMemo → memorize calculations</li>
            <li>useCallback → memorize functions</li>
            <li>useReducer → advanced state logic</li>
            <li>useId → unique IDs</li>
            <li>useLayoutEffect → runs before paint</li>
          </ul>
        </section>
      </div>
    </ThemeContext.Provider>
  );
}

///////////////////////////////////////////////////////////
// CHILD COMPONENT FOR useContext
///////////////////////////////////////////////////////////

function ChildComponent() {
  const theme = useContext(ThemeContext);

  return (
    <div>
      Current Theme From Context: {theme}
    </div>
  );
}