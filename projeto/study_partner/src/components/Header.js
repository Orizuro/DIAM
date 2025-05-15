//import { Link } from 'react-router-dom';
import ISCTE_logo from '../images/ISCTE_logo.jpg';

function Header() {

  return (
      <div className="Header">
          <img
              src={ISCTE_logo}
              alt="ISCTE"
              className="header-logo"
          />
      </div>
  );

}

export default Header;
