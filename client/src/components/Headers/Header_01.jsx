import React from "react";
import logo from "../../icons/logo.png";
import Navbar from "../Navbars/Navbar_01";
const Header = () => {
  return (
    <header className="">
      <div className="header-item mb-5">
        <div className="pl-10">
          <img
            className="w-full h-full"
            src="https://gtahalalmeat.com/public/storage/img/skUIEbM7yqY98ppkwZvqIaGmj.png"
            // src={logo}
          />
        </div>
        <div className="flex gap-3 justify-around items-end w-full">
          <div className="flex gap-3 justify-end items-end">
            <div className="phone-icon ">
              <span className="icofont-ui-cell-phone" />
            </div>
            <div className="header-phone-text">
              <p>Phone:</p>
              <p>0123456789</p>
            </div>
          </div>
          <div className="header-advance-search">
            <form className="flex">
              <input
                type="text"
                className=" outline-none  "
                name="search"
                placeholder="Search your product"
              />
              <button className="search-btn">
                <i className="icofont-ui-search"></i>
              </button>
            </form>
          </div>

          <div className="header-shopping">
            <a className="flex gap-3">
              <div className="cart-icon">
                <i class="icofont-ui-cart"></i>
              </div>

              <div className="shopping-text">
                <p className="">Shopping Cart</p>
                <p className="">0 items - $0</p>
              </div>
            </a>
          </div>
        </div>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
