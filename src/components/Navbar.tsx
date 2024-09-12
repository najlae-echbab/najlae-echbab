import { useState } from "react";
import zalig from "../../public/img/custom/zalij.png";
import { Link } from "react-router-dom";
import logo from "../../public/img/custom/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className=" w-full top-0 relative">
        <div className="flex items-center justify-between">
          <img
            src={zalig}
            alt="Logo"
            className="hidden md:block h-full w-[5%] absolute left-0"
          />
        <div className="flex flex-wrap items-center justify-between mx-auto p-4 w-full md:w-[88%]">
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center rounded-lg md:hidden hover:bg-gray-100 focus:outline-none"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen ? "true" : "false"}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          
          <Link to="/" className="flex items-center space-x-3">
            <img
              src={logo}
              alt="Piessa Logo"
              className="h-16 w-auto" // Ajustez les dimensions selon vos besoins
            />
          </Link>

          <div
            className={`${
              isMenuOpen ? "max-h-screen" : "max-h-0"
            } overflow-hidden transition-max-height duration-500 ease-in-out w-full mx-auto md:block md:w-auto md:max-h-none md:overflow-visible`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 rounded md:bg-transparent md:p-0 "
                  aria-current="page"
                >
                  Accueil
                </Link>
              </li>
              <li>
              <Link
                  to={"/About"}
                  className="block py-2 px-3 rounded md:bg-transparent md:p-0"
                  aria-current="page"
                >
                  A propos
                </Link>
              </li>
              <li>
                <a
                  href="#skills"
                  className="block py-2 px-3 rounded md:bg-transparent md:p-0"
                  aria-current="page"
                >
                  Services
                </a>
              </li>
              <li>
                <Link
                  to={"/blogs"}
                  className="block py-2 px-3 rounded md:bg-transparent md:p-0"
                  aria-current="page"
                >
                  Blogs
                </Link>
              </li>
              <li>
              <Link
                  to={"/contact"}
                  className="block py-2 px-3 rounded md:bg-transparent md:p-0"
                  aria-current="page"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <img
          src={zalig}
          alt="Logo"
          className="hidden md:block h-full w-[5%] absolute right-0"
        />
      </div>
    </nav>
  );
};

export default Navbar;
