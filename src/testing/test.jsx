import {useRef,useState, useEffect } from "react";

/*
export default function App() {
  const [lines, setLaines] = useState([]);
  console.log(lines)

  function addLine() {
    setLaines([...lines, []]);
  }
  function addChild(lineIndex) {
    const updatedLines = [...lines];
    updatedLines[lineIndex].push({});
    setLaines(updatedLines);
  }

  return (
    <>
      <button onClick={addLine}>Add Line</button>
      <div>
        {lines.map((children, index) => (
          <div key={index}>
            <p>Line {index}</p>
            <button onClick={() => addChild(index)}>Add Child</button>
            <div>
              {children.map((child, childIndex) => (
                <p key={childIndex}>Child {childIndex}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
  */
/*
export default function App() {
  const [lines, setLines] = useState([]);
  console.log(lines)

  function addLine() {
    setLines([...lines, 0]);
  }

  function increase(index) {
    const newLines = [...lines];
    newLines[index]++;
    setLines(newLines);
  }
  function decrease(index) {
    const newLines = [...lines];
    newLines[index]--;
    setLines(newLines);
  }
  function changeValue(index, value) {
    const newLines = [...lines];
    newLines[index] = Number(value);
    setLines(newLines);
  }
  return (
    <div style={{ padding: "20px" }}>
      <button onClick={addLine}>Add Line</button>

      {lines.map((value, index) => (
        <div key={index}>
          <input
            type="number"
            value={value}
            onChange={(e) => changeValue(index, e.target.value)}
          />
          <button onClick={() => increase(index)}>+</button>
          <button onClick={() => decrease(index)}>-</button>
        </div>
      ))}
    </div>
    
  );
}
*/
/*
export default function App() {
  const [selectedValue, setSelectedValue] = useState("");

  function handleChange(e) {
    setSelectedValue(e.target.value);
  }

  return (
    <div>
      <select onChange={handleChange}>
        <option value="">Choose one</option>
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="orange">Orange</option>
      </select>

      <p>Selected: {selectedValue}</p>
    </div>
  );
}
*/

export default function App() {
  const counterRef = useRef(0);
  const [renderCount, setRenderCount] = useState(0);

  function increaseRef() {
    counterRef.current++;
    console.log(counterRef.current);
  }
  
  useEffect(() => {
    console.log('rendercount: '+renderCount);
  });//Runs on every render


  return (
    <div>
      <button onClick={increaseRef}>
        Increase Ref
      </button>

      <button onClick={() => {
        console.log('rendercount: '+renderCount);
        setRenderCount(renderCount + 1);
        //console.log('rendercount: '+renderCount);
      }}>
        Re-render
      </button>

      <p>Ref value: {counterRef.current}</p>

      <div className="testBox">aaaaaaaaaaaa</div>
    </div>
  );
}