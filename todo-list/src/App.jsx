import { useState } from "react";
import "./App.css";
import leftArrow from "./assets/left-arrow.svg";
import rightArrow from "./assets/right-arrow.svg";
import MyCarousel from "./MyCarousel";

export default function App() {
  const [task, setTask] = useState(""); // use in component so that only that corresponding component re-render, other this parent will re-render on each change
  const [desc, setDesc] = useState("");
  const [inputErr, setInputErr] = useState("");
  const [descErr, setDescErr] = useState("");
  const [cards, setCards] = useState([]);
  const [number, setNumber] = useState(0);
  // console.log(cards);

  const [isOpen, setIsOpen] = useState(false);

  function handleNewTask() {
    setIsOpen(true);
  }
  function handleRemove() {
    setIsOpen(false);
  }

  function handleInput(e) {
    // it is a synthetic event, different from DOM event (actual event)
    setTask(e.target.value);
  }
  function handleDesc(e) {
    setDesc(e.target.value);
  }
  function handleAdd() {
    setDescErr("");
    setInputErr("");
    if (!task || !desc) {
      if (!task) {
        setInputErr("*input can't be empty");
      }
      if (!desc) {
        setDescErr("*desc can't be empty");
      }
    } else {
      setCards([...cards, [task, desc]]); // use array of object (most common) > less conflicting
      handleRemove();
      setTask("");
      setDesc("");
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      handleAdd();
    }
  }
  // !e.shiftKey helps avoid triggering when Shift+Enter is used (especially useful in textarea if you want multi-line input).

  return (
    <>
      <div className="App flex flex-col bg-amber-50 min-h-dvh">
        <header className="w-full flex items-center relative p-4">
          <img
            className="w-10 absolute"
            src="https://static.vecteezy.com/system/resources/previews/003/529/153/non_2x/business-to-do-list-flat-icon-modern-style-vector.jpg"
            alt="brand-logo"
          />
          <h3 className="text-2xl font-bold text-center w-full">Todo List</h3>
        </header>
        <main className="flex justify-center flex-col gap-4 ">
          <div className="w-full px-4 h-[200px] bg-[#f3f3f3]--x flex justify-center items-center">
            <MyCarousel />
          </div>
          <section className="flex flex-col items-center justify-center w-[97%] m-auto max-w-full h-full bg-[#e3e3e3] p-4 gap-4">
            <h2 className="text-2xl">Todo</h2>
            <button
              onClick={handleNewTask}
              className="border-2 rounded-md px-2 py-1 cursor-pointer"
            >
              Add task
            </button>
            <ul className="cards bg-white p-5 rounded w-[90%] h-fit flex flex-wrap gap-5 justify-center">
              {cards.map((card, index) => (
                <li
                  key={index}
                  className="TodoCard bg-yellow-50 shadow border-2 rounded-xs w-[300px] h-[150px]"
                >
                  <div className=" flex-col justify-between items-center w-full p-2">
                    <div className="title flex justify-between">
                      <span className="text-lg">{card[0]}</span>
                      <input type="checkbox" />
                    </div>
                    <span className="block border-1 rounded-sm w-[100%] h-[100px] p-1">
                      {card[1]}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {isOpen ? (
            <div
              onClick={handleRemove}
              className="w-screen h-screen fixed top-0 left-0 bg-[#00000050] flex justify-center items-center"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="newTaskWindow h-fit"
              >
                <div className="newTask w-[400px] bg-amber-200 flex flex-col gap-2 p-3 m-10 shadow-xl rounded-xl">
                  <span className="text-2xl text-center">new task</span>
                  <label htmlFor="">
                    <input
                      onChange={handleInput}
                      onKeyDown={handleKeyDown}
                      value={task} // adding the value attribute of input as task
                      type="text"
                      placeholder="Enter new task"
                      className="border-1 rounded pl-2 w-full h-8"
                    />
                    <span className="text-red-500">{inputErr}</span>
                  </label>
                  <label htmlFor="">
                    <textarea
                      onChange={handleDesc}
                      onKeyDown={handleKeyDown}
                      value={desc}
                      placeholder="Enter Description"
                      className="border-1 rounded p-2 w-full h-[110px]"
                    ></textarea>
                    <span className="text-red-500">{descErr}</span>
                  </label>
                  <div className="buttons flex gap-2">
                    <button
                      onClick={handleAdd}
                      className="border-1 px-3 py-0.5 rounded cursor-pointer bg-amber-400 hover:bg-amber-500"
                    >
                      Add
                    </button>
                    <button
                      onClick={handleRemove}
                      className="border-1 px-3 py-0.5 rounded cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </main>
      </div>
    </>
  );
}
// add button using custom component
// destructuring
// {...props}

export function Button({ className, children, ...props }) {
  // this is destructuring
  return;
  <button
    {...props} // this is also destructuring all the values that were in the props object
    className={`${className} p-4, flex-2/12, m-4, flex justify-center`}
  >
    {children}
  </button>;
}

// const val1 = handleSubmit(123); // I called the function to val1, and it gets the returned value
// const val2 = () => handleSubmit(123); // i assigned the arrow function to val2

// in event listener we just pass the name of function, we don't call the function
// if i want to pass some value in the function as argument then use arrary function
// ex:
// onClick = {handleSubmit}
// onClick = {handleSubmit(123)} // don't do this thing, it will call the function execution, it will not wait of the click event
// onClick = {() => handleSubmit(123)} // to pass the data

// object.entries(obj) > convert to 2d array
// object.key(obj) > give all keys
// object.value(obj) > give all values
// Array.isArray(arr) > true/false

// setTodoData(prev => [...prev, newData]);
// upadting using callback function

// useEffect
// component mounted > first time jab component ui pe aaya
// shallow check, shallow compare > like shallow copy, it only check till level 1

// function timerFn(){

// }

// component react life cycle
// mount > clean up > unmout >> re-mount
