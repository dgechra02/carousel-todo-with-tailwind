import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import leftArrow from "./assets/left-arrow.svg"

function App() {
  const numbers = [1, 2, 3, 4];

  const [isOpen, setIsOpen] = useState(false);

  function handleAdd() {
    setIsOpen(true);
    console.log("isOpen : ", true);
  }
  function handleRemove() {
    setIsOpen(false);
  }

  const card = (
    <li className="TodoCard bg-yellow-50 shadow border-2 rounded-xs w-[300px] h-[150px]">
      <div className=" flex-col justify-between items-center w-full p-2">
        <div className="title flex justify-between">
          <span className="text-lg">Item 1</span>
          <input type="checkbox" />
        </div>
        <textarea className="border-1 rounded-sm w-[100%] h-[100px] p-1">
          Sample Description
        </textarea>
      </div>
    </li>
  );

  const arr = numbers.map((number) => card);

  return (
    <>
      <div className="App flex flex-col">
        <header className="w-full flex items-center relative p-4">
          <img
            className="w-10 absolute"
            src="https://static.vecteezy.com/system/resources/previews/003/529/153/non_2x/business-to-do-list-flat-icon-modern-style-vector.jpg"
            alt="brand-logo"
          />
          <h3 className="text-2xl font-bold text-center w-full">Todo List</h3>
        </header>
        <main className="flex justify-center flex-col ">
          <div className="w-full aspect-6/1 bg-[#f3f3f3] flex justify-center items-center">
            <div>
              <button><img className="w-30 h-30" src={leftArrow} alt="left arrow" /></button>
              <div>
                carousel
                <img src="" alt="" />
              </div>
              {/* <button><img className="w-30 h-30" src="../assets/left-arrow-backup-2-svgrepo-com.svg" alt="right arrow" /></button> */}
              <button></button>
            </div>
          </div>
          <section className="flex flex-col items-center justify-center w-full max-w-full bg-[#e3e3e3] p-4 gap-4">
            <h2 className="text-2xl">Todo</h2>
            <button onClick={handleAdd} className="border-2 rounded-md px-2 py-1 cursor-pointer">
              Add item
            </button>
            <ul className="cards bg-white p-5 rounded w-[90%] h-fit flex flex-wrap gap-5 justify-center">
              {arr}
            </ul>
          </section>

          {isOpen ? (
          <div onClick={handleRemove} className="w-screen h-screen fixed top-0 left-0 bg-gray-200 flex justify-center items-center">
            <div className="newTaskWindow" >
              <div className="newTask w-[400px] h-[250px] bg-amber-200 flex flex-col gap-2 p-3 m-10 shadow-xl rounded-xl">
                <span className="text-2xl text-center">new task</span>
                <input
                  type="text"
                  placeholder="Enter new task"
                  className="border-1 rounded pl-2 w-full h-8"
                />
                <textarea
                  placeholder="Enter Description"
                  className="border-1 rounded p-2 w-full h-[110px]"
                ></textarea>
                <div className="buttons flex gap-2">
                  <button
                    onClick={handleAdd}
                    className="border-1 px-3 py-0.5 rounded cursor-pointer bg-amber-400 hover:bg-amber-500"
                  >
                    Add
                  </button>
                  <button className="border-1 px-3 py-0.5 rounded cursor-pointer">
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

export default App;
