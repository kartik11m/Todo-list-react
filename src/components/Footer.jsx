import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="text-center bg-gray-200">
      <p>Copyright ⓒ {year}</p>
    </footer>
  );
}

export default Footer;