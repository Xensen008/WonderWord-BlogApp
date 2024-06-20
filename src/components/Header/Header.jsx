import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("/");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (slug) => {
    navigate(slug);
    setActiveItem(slug);
    setIsMenuOpen(false);
  };

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "Saved",
      slug: "/saved-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-2 lg:py-2 shadow bg-gray-900 text-white z-50">
      <Container>
        <nav className="flex justify-between items-center lg:justify-between">
          <div className="lg:mr-4 text-2xl">
            <Link to="/">
              <Logo/>
            </Link>
          </div>
          <div className="lg:hidden z-50 text-2xl">
            <button className="mt-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          <ul className={`fixed right-0 top-0 h-full w-48 bg-gray-900 text-white transition-transform duration-200 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0 lg:static lg:flex lg:flex-row lg:space-x-4 lg:justify-end lg:w-3/4 pt-8 z-40`}>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigation(item.slug)}
                    className={`inline-block px-6 py-3 text-lg duration-200 hover:bg-blue-500 rounded-full ${
                      item.slug === activeItem ? "bg-blue-500" : ""
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;