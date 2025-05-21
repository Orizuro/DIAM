import { Link } from "react-router-dom";
import "./styles/Header.css";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import Login from "./login";

function Header() {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  useEffect(() => {
    setShowDropdown(false); // close dropdown when user changes
  }, [currentUser]);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);
  const closeDropdown = () => setShowDropdown(false);

  return (
    <div className="Header">

      {isAuthenticated && currentUser ? (
        <div className="user-dropdown" onMouseLeave={closeDropdown}>
          <button onClick={toggleDropdown} className="user-button">
            Olá, {currentUser.username} ▼
          </button>
          {showDropdown && (
            <div className="dropdown-menu">
              <Link to="/perfil" className="dropdown-item">Perfil</Link>
              <Link to="/studysessions" className="dropdown-item">Minhas sessões de estudo</Link>

              <button className="dropdown-item logout-item" onClick={logout}>Logout</button>
            </div>
          )}
        </div>
      ) : (
        <button className="login-button" onClick={() => setShowModal(true)}>Login</button>
      )}
      <nav className="navbar">
        <ul className="nav-links">
          <li><Link to="/" className="nav-link">Página Inicial</Link></li>
          <li><Link to="/about" className="nav-link">Sobre</Link></li>
          <li><Link to="/rules" className="nav-link">Regras de Comunidade</Link></li>
          <li><Link to="/studysessions" className="nav-link">Sessões de Estudo</Link></li>
        </ul>
      </nav>
      <img
        src={"/images/ISCTE_logo.jpg"}
        alt="ISCTE"
        className="header-logo"
      />

      {showModal && <Login onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default Header;
