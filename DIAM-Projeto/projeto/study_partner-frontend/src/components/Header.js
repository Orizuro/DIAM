import { Link } from 'react-router-dom';
import './Header.css';


function Header() {

  return (
      <div className="Header">
          <nav className="navbar ">
              <ul className="nav-links">
                  <li><Link to="/" className="nav-link">Pagina Inicial</Link></li>
                  <li><Link to="/about" className="nav-link">Sobre</Link></li>
                  <li><Link to="/rules" className="nav-link">Regras de Comunidade</Link></li>
                  <li><Link to="/sessoes-de-estudo" className="nav-link">Sessões de Estudo</Link></li>
              </ul>
          </nav>
          <img
              src={"/images/ISCTE_logo.jpg"}
              alt="ISCTE"
              className="header-logo"
          />

      </div>
  );

}

export default Header;
