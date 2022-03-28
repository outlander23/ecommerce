import React from "react";

const Navbar = () => {
  return (
    <nav className="flex main-desktop-nav">
      <ul className="nav-ul container">
        <li>Home</li>
        <li class="dropdown">
          <button class="dropbtn">Shop</button>
          <div class="dropdown-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </li>
        <li>Login</li>
        <li>Register</li>
        <li>Contract Us</li>
      </ul>
    </nav>
  );
};

export default Navbar;
