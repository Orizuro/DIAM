import React from 'react';
import './styles/HomePage.css';

function HomePage() {
    return (
        <div className="HomePage">
            <div className="MainImage">
                <img className="BackgroundImage" src="/images/Background_image.jpeg" alt="background_image" />
                <div className="ImageOverlay"></div>
                <div className="Overlay">
                    <div className="Logo">
                        <img src="/images/StudyPartner_logo.png" alt="logo" />
                    </div>
                    <div className="OverlayText">
                        <h1 className="main-title">Faz match com o teu estudo ;)</h1>
                        <h2 className="subtitle">O caminho para o teu sucesso começa agora, junta-te, partilha e aprende!</h2>
                        <h1 className="highlight">Conectamos mentes, multiplicamos resultados!</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default HomePage;