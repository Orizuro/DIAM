import './styles.css';
import FormVoluntario from "./FormVoluntario";
import {useNavigate} from "react-router-dom";

function Main(){

    const scheduleData = [
        { date: "21 de Agosto", time: "20:00", artist: "Amália Hoje" },
        { date: "21 de Agosto", time: "21:00", artist: "Delfins" },
        { date: "21 de Agosto", time: "22:00", artist: "GNR" },
        { date: "21 de Agosto", time: "23:00", artist: "The Legendary Tigerman" },
        { date: "21 de Agosto", time: "00:00", artist: "Fogo Frio" },
        { date: "22 de Agosto", time: "20:00", artist: "The Cult" },
        { date: "22 de Agosto", time: "21:00", artist: "Xutos & Pontapés" },
        { date: "22 de Agosto", time: "22:00", artist: "Soulfly" },
        { date: "22 de Agosto", time: "23:00", artist: "Moonspell" },
        { date: "22 de Agosto", time: "00:00", artist: "Ramp" },
        { date: "23 de Agosto", time: "20:00", artist: "Die Antwoord" },
        { date: "23 de Agosto", time: "21:00", artist: "Ornatos Violeta" },
        { date: "23 de Agosto", time: "22:00", artist: "Crystal Fighters" },
        { date: "23 de Agosto", time: "23:00", artist: "Capitão Fausto" },
        { date: "23 de Agosto", time: "00:00", artist: "Sulfur Giant" },
        { date: "24 de Agosto", time: "20:00", artist: "The Darkness" },
        { date: "24 de Agosto", time: "21:00", artist: "The Libertines" },
        { date: "24 de Agosto", time: "22:00", artist: "The Waterboys" },
        { date: "24 de Agosto", time: "23:00", artist: "David Fonseca" },
        { date: "24 de Agosto", time: "00:00", artist: "Vapors of Morphine" },
    ];

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/voluntario');
    };

    return(
        <div className="MainBox">

            {/* ------------------------ Página Incial ------------------------ */}

            <div id="Home">
                <div id="nav_bar">
                    <ul>
                        <li><a href="#Home" onClick={(e) => {
                            e.preventDefault();
                            scrollToSection("Home");
                        }}>Página Inicial</a></li>
                        <li><a href="#about" onClick={(e) => {
                            e.preventDefault();
                            scrollToSection("about");
                        }}>Sobre</a></li>
                        <li><a href="#lineUp" onClick={(e) => {
                            e.preventDefault();
                            scrollToSection("lineUp");
                        }}>Cartaz</a></li>
                        <li><a onClick={handleButtonClick}>Voluntariado</a></li>
                        <li><a href="#latestNews" onClick={(e) => {
                            e.preventDefault();
                            scrollToSection("latestNews");
                        }}>Últimas Notícias</a></li>
                        <li><a href="#contacts" onClick={(e) => {
                            e.preventDefault();
                            scrollToSection("contacts");
                        }}>Contactos</a></li>
                        {/*<li><a href="#complaints" onClick={(e) => { e.preventDefault(); scrollToSection("complaints"); }}>Reclamações</a></li>*/}
                    </ul>
                </div>
            </div>
            <br/>
            <div id="lineUp">
                <h2> Programação da 46ª Edição do Festival </h2>
                <section id="programacao">
                    <div className="table-container">
                        <table>
                            <thead>
                            <tr>
                                <th>Data</th>
                                <th>Horário</th>
                                <th>Artista</th>
                            </tr>
                            </thead>
                            <tbody>
                            {scheduleData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.date}</td>
                                    <td>{item.time}</td>
                                    <td>{item.artist}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>






        </div>

    );
}

export default Main;

