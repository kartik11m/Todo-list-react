import React from 'react'

const Navbar = ({darkMode , setDarkMode}) => {
  return (
    <nav className={darkMode ?'dark flex justify-around bg-gray-900 text-white py-2' : 'flex justify-around bg-amber-300 text-white py-2'}>
        <div className="logo">
            <span className='font-bold text-xl '>To-do</span>
        </div>
      <ul className="flex gap-8 mx-9">
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        {/* <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li> */}
      </ul>
      <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-2 py-1 rounded border"
        >
          {darkMode ? <i className="ri-sun-fill text-lg"></i> : <i className="ri-contrast-2-line text-lg"></i>}
      </button>
    </nav>
  )
}

export default Navbar