import { useEffect, useState } from "react";
import { Carousel } from "@material-tailwind/react";
import tick from "./assets/tick.svg";
import "./App.css";

export default function App() {
  const savedCards = JSON.parse(localStorage.getItem("cards-data")) || [];
  console.log(savedCards);

  const [task, setTask] = useState(""); // use in component so that only that corresponding component re-render, other this parent will re-render on each change
  const [desc, setDesc] = useState("");
  const [inputErr, setInputErr] = useState("");
  const [descErr, setDescErr] = useState("");
  const [cards, setCards] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  // function handleSavedCards() {
  //   setCards(savedCards);
  //   console.log("handleSavedCards fucntion run");
  //   // Uncaught error: Too many re-renders. React limits the number of renders to prevent an infinite loop. kyuki ye function bar-bar run ho rha hai
  //   // jese hi setCards(savedCards) chalenga app vaps re-render hoga, fir setCards(savedCards) chalega and vaps re-render hoga and so-on it will make
  //   // an infinite loop so use useEffect to run it only once
  // }

  useEffect(function handleSavedCards() {
    setCards(savedCards);
    console.log("handleSavedCards fucntion run");
  }, []);

  function handleNewTask() {
    setIsOpen(true);
  }
  function handleRemove() {
    setIsOpen(false);
    setTask("");
    setDesc("");
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

  function handleCompleted(index) {
    
    setCards(cards.filter(card => card !== cards[index] ));
  }

  useEffect(() => {
    localStorage.setItem("cards-data", JSON.stringify(cards));
  }, [cards]);

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
        <main className="flex justify-center flex-col gap-4">
          <div className="w-[95%] h-[200px] bg-[#f3f3f3] flex justify-center items-center m-auto rounded-xl">
            <CarouselDefault />
          </div>
          <section className="flex flex-col items-center justify-center w-[95%] m-auto max-w-full h-full bg-[#e3e3e3] p-4 gap-4 rounded-xl">
            <h2 className="text-2xl">Todo</h2>
            <button
              onClick={handleNewTask}
              className="shadow-md bg-green-300 rounded-md px-4 py-2 leading-none cursor-pointer"
            >
              Add task
            </button>
            <ul className="cards bg-white p-5 rounded w-[90%] h-fit flex flex-wrap gap-5 justify-center">
              {cards.length !== 0 ? ( // don't use [] === [](always false) or [] !== [](always true) Because arrays are reference types, and two separate empty arrays ([] and []) are not the same in memory — even if they look the same.
                cards.map((card, index) => (
                  <li
                    key={index}
                    className="TodoCard bg-yellow-50 shadow-sm border-2 rounded-md w-[300px] h-[165px]"
                  >
                    <div className="flex items-start flex-col justify-between w-full p-2 rounded-md start gap-1">
                      <div className="title flex justify-between w-full ">
                        <span className="text-lg overflow-hidden whitespace-nowrap text-ellipsis leading-none">
                          {card[0]}
                        </span>
                        <input type="checkbox" />
                      </div>
                      <span className="block border-2 rounded-sm w-[100%] h-[100px] p-1 overflow-auto">
                        {card[1]}
                      </span>
                      <button
                        onClick={() => handleCompleted(index)}
                        className=" border-2 leading-none rounded"
                      >
                        <img className="w-5" src={tick} alt="tick" />
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <span>no task to display</span>
              )}
            </ul>
          </section>

          {isOpen ? (
            <div
              onClick={handleRemove}
              className="w-screen h-screen fixed top-0 left-0 bg-[#00000050] flex justify-center items-center"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="newTaskWindow h-fit relative z-60"
              >
                <div className="newTask w-[400px] bg-amber-200 flex flex-col gap-2 p-3 shadow-xl rounded-xl relative z-60">
                  <span className="text-2xl text-center">new task</span>
                  <label htmlFor="">
                    <input
                      onChange={handleInput}
                      onKeyDown={handleKeyDown}
                      value={task} // adding the value attribute of input as task
                      type="text"
                      placeholder="Enter new task"
                      className="border-2 border-black rounded pl-2 w-full h-8 bg-amber-200"
                    />
                    <span className="text-red-500">{inputErr}</span>
                  </label>
                  <label htmlFor="">
                    <textarea
                      onChange={handleDesc}
                      onKeyDown={handleKeyDown}
                      value={desc}
                      placeholder="Enter Description"
                      className="border-2 border-black rounded p-2 w-full h-[110px] bg-amber-200"
                    ></textarea>
                    <span className="text-red-500">{descErr}</span>
                  </label>
                  <div className="buttons flex gap-2">
                    <button
                      onClick={handleAdd}
                      className="border-2 px-3 py-0.5 rounded cursor-pointer bg-blue-500 hover:bg-blue-600 border-blue-600 text-white flex justify-center items-center leading-none"
                    >
                      Add
                    </button>
                    <button
                      onClick={handleRemove}
                      className="border-2 px-3 py-0.5 rounded cursor-pointer bg-red-100 border-red-200"
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

export function CarouselDefault() {
  return (
    <Carousel className="rounded-xl">
      <img
        src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
        alt="image 1"
        className="h-full w-full object-cover"
      />
      <img
        src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
        alt="image 2"
        className="h-full w-full object-cover"
      />
      <img
        src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
        alt="image 3"
        className="h-full w-full object-cover"
      />
    </Carousel>
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

// const val1 = handleSubmit(123); // I called the function and val1 gets the returned value
// const val2 = () => handleSubmit(123); // i assigned the arrow function to val2

// in event listener we just pass the name of function, we don't call the function
// if i want to pass some value in the function as argument then use arrow function
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
