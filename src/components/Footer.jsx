import React from "react";

function Footer({darkMode , setDarkMode}) {
  const year = new Date().getFullYear();
  return (
    <footer className={darkMode ? "text-center bg-gray-600 text-white py-2" : "text-center bg-gray-200 py-2"}>
      <p>Copyright ⓒ {year}</p>
    </footer>
  );
}

export default Footer;