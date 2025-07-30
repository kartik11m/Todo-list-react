import React, { useState , useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import {
  addTodo,
  toggleTodo,
  deleteTodo,
  setFilter,
  setSearchTerm,
  selectFilteredTodos
} from './store/todosSlice'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  const dispatch = useDispatch()
  const todos = useSelector(selectFilteredTodos)
  const filter = useSelector(state => state.todos.filter)
  const searchTerm = useSelector(state => state.todos.searchTerm)
  const [newTodo, setNewTodo] = useState('')
  const [editId, setEditId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const animationRef = useRef(null);

  const handleAdd = () => {
  const trimmed = newTodo.trim();
  if (!trimmed) return;

  if (editId) {
    // Replace the old todo with new text
    dispatch(deleteTodo(editId));
    dispatch(addTodo(trimmed));
    setEditId(null); // Reset edit mode
  } else {
    dispatch(addTodo(trimmed));
  }

  setNewTodo('');


  // gsap.to('#red-box' , {
  //     x: 250,
  //     yoyo: true,
  //     rotation: 360,
  //     duration: 4,
  //     opacity:1,
  //     ease:'elastic.out(1,0.5)',
  //     onComplete: () => {
  //     // Wait 1 second before hiding
  //     gsap.delayedCall(3, () => {
  //       gsap.set('#red-box', { display: 'none' });
  //     });
  //   }
  //   })
  };


  const handleEdit = (id) => {
  const current = todos.find(t => t.id === id);
  if (current) {
    setNewTodo(current.todo);
    setEditId(id); // Mark it for editing
  }
  };



  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode}/>

      <div className={darkMode ? "p-5 bg-gray-600 min-h-screen text-white placeholder-white" : "p-5 bg-gray-200 min-h-screen"}>
        <h1 className= "font-bold text-center text-3xl" >To-do List</h1>

        {/* Add New Todo */}
        <div className="my-4 flex gap-2">
          <input
            type="text"
            className={darkMode ? "w-full px-4 py-2 rounded-xl border-2 border-white " : "w-full px-4 py-2 rounded-xl border-2"}
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
          />
          <button
            ref={animationRef}
            onClick={handleAdd}
            className={darkMode ? "px-4 py-2 bg-blue-300 text-white rounded-xl" : "px-4 py-2 bg-blue-500 text-white rounded-xl"}
          >
            Add
          </button>
        </div>

        {/* Search Bar */}
        <div className="my-4">
          <input
            type="text"
            value={searchTerm}
            onChange={e => dispatch(setSearchTerm(e.target.value))}
            placeholder="Search todos…"
            className="w-full px-4 py-2 rounded-xl border-2"
          />
        </div>

        {/* Status Filters */}
        <div className="flex gap-3 my-4 max-sm:flex-col">
          {['ALL', 'COMPLETED', 'PENDING'].map(mode => (
            <button
              key={mode}
              onClick={() => dispatch(setFilter(mode))}
              className={
                darkMode ? `px-4 py-1 rounded-xl ${
                filter === mode
                  ? 'bg-blue-300 font-bold'
                  : 'bg-gray-400'
              }`
              : `px-4 py-1 rounded-xl ${
                filter === mode
                  ? 'bg-yellow-300 font-bold'
                  : 'bg-gray-300'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Todo List */}
        <h2 className="text-2xl font-bold mb-3">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 ? (
            <div className="m-5">No Todos to display</div>
          ) : (
            todos.map(item => (
              <div
                key={item.id}
                className={darkMode ? "flex justify-between items-center bg-gray-400 p-3 my-2 rounded shadow" : "flex justify-between items-center bg-white p-3 my-2 rounded shadow"}
              >
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={() => dispatch(toggleTodo(item.id))}
                 />
                <span className={`${item.isCompleted ? "line-through dark:text-gray-400" : ""}`}>
                {item.todo}
                </span>
                <div className="flex gap-3">
                    <button onClick={() => handleEdit(item.id)}>
                      <FaEdit className={darkMode ? "text-blue-300" : "text-blue-500"} />
                    </button>
                    <button onClick={() => dispatch(deleteTodo(item.id))}>
                      <AiFillDelete className={darkMode ? "text-red-400" : "text-red-500"} />
                    </button>
                  </div>
              </div>
            ))
          )}
        </div>
        <div id="red-box" className="flex justify-center items-center w-20 py-2 bg-red-500 rounded-lg text-white  -translate-x-100 opacity-0">Created</div>
      </div>
      <Footer darkMode={darkMode} setDarkMode={setDarkMode}/>
    </>
  )
}

export default App