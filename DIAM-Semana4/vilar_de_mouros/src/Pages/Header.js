// Objective: Create the header of the page

import fotoHeaderBig from '../Images/fotoHeaderBig.jpg';
import fotoHeaderSmall from '../Images/fotoHeaderSmall.png';
import { useState } from "react"; // para poder usar o estado

function Header() {

    const [isHidden, setIsHidden] = useState(false);     // Inicialmente, a imagem pequena não está oculta

    const hideImg = () => setIsHidden(true);    // Função que oculta a imagem pequena quando o rato passa em cima dela
    const unhideImg = () => setIsHidden(false);    // Função que mostra a imagem pequena depois de clicarmos no botão

    return (
        <div className="Header">

            <div
                id="over"
                style={{
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                }}
            >
            <div>
                <img
                    src={fotoHeaderBig}
                    className="fotoHeaderBig"
                    alt="fotoHeaderBig"
                    style={{ width: "100%" }}
                />
            </div>

            {/* Se a foto pequena estiver visível */}
            {!isHidden && (
                <div style={{ position: "absolute", display: "flex" }}>
                    <img
                        src={fotoHeaderSmall}
                        className="fotoHeaderSmall"
                        alt="fotoHeaderSmall"
                        onMouseOver={hideImg}   // Quando o rato passa por cima da foto pequena e ela deixa de estar visível
                        style={{ cursor: "pointer" }} // Fancy eheheh, só mostar que o botão é reativo
                    />
                </div>
            )}
                    
            {/* Se a foto pequena estiver oculta, aparece o botão */}
            {isHidden && (
                <button
                        id="hide-btn"
                        type="button"
                        onClick={unhideImg} // Quando se clica no botão e a foto pequena reaparece
                        style={{
                            marginTop: "10px",
                            padding: "8px 12px",
                            fontSize: "16px",
                            cursor: "pointer",  // Só mostar que o botão é reativo
                        }}
                    >
                    Mostrar imagem
                </button>
            )}
            </div>

            <div>
                <h2 className="mainHeading"> Bem-vindo ao festival de música mais antigo do país! </h2>
            </div>

        </div>
   );  

}

export default Header;
