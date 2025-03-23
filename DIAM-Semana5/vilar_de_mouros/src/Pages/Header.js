import { Link } from 'react-router-dom';
import fotoHeaderBig from '../Images/fotoHeaderBig.jpg';
import fotoHeaderSmall from '../Images/fotoHeaderSmall.png';

function Header() {

  return (
    <>
      <div className="Header">
        <div
          id="over"
          style={{
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}>
          <div>
            <img
              src={fotoHeaderBig}
              className="fotoHeaderBig"
              alt="fotoHeaderBig"
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ position: "absolute", display: "flex" }}>
            <img
              src={fotoHeaderSmall}
              className="fotoHeaderSmall"
              alt="fotoHeaderSmall"
            />
          </div>
        </div>

        <div>
          <h2 className="mainHeading"> Bem-vindo ao festival de música mais antigo do país! </h2>
        </div>

      </div>

      <div id="nav_bar">
        <ul>
          <li>
            <Link to="/">Página Inicial</Link>
          </li>

          <li>
            <Link to="/voluntario">Voluntariado</Link>
          </li>
        </ul>
      </div>
    </>
  );

}

export default Header;
