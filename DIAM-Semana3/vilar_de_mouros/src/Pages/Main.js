import './styles.css';
import foto1edicao from '../Images/foto1edicao.jpg';
import festival2021 from '../Images/festival2021.webp';
import festival2022 from '../Images/festival2022.jpg';
import festival2023 from '../Images/festival2023.webp';
import festival2024 from '../Images/festival2024.webp';
import recinto from '../Images/recinto.jpeg';

function Main(){

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return(
        <div className="MainBox">

            {/* ------------------------ Página Incial ------------------------ */}

            <div id="Home">
                <div id="nav_bar">
                    <ul>
                        <li><a href="#Home" onClick={(e) => { e.preventDefault(); scrollToSection("Home"); }}>Página Inicial</a></li>
                        <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection("about"); }}>Sobre</a></li>
                        <li><a href="#lineUp" onClick={(e) => { e.preventDefault(); scrollToSection("lineUp"); }}>Cartaz</a></li>
                        <li><a href="#volunteersForm" onClick={(e) => { e.preventDefault(); scrollToSection("volunteersForm"); }}>Voluntariado</a></li>
                        <li><a href="#latestNews" onClick={(e) => { e.preventDefault(); scrollToSection("latestNews"); }}>Últimas Notícias</a></li>
                        <li><a href="#contacts" onClick={(e) => { e.preventDefault(); scrollToSection("contacts"); }}>Contactos</a></li>
                        {/*<li><a href="#complaints" onClick={(e) => { e.preventDefault(); scrollToSection("complaints"); }}>Reclamações</a></li>*/}
                    </ul>
                </div>
                {/* TODO - transformar estas 4 fotos num slideshow */}
                <div id="SlidShow"> 
                    <h2> Fotos de Edições Anteriores </h2>
                    <div class="slideshow-container">
                        <div class="slideElem">
                            <img
                                src={festival2024}
                                className="festival2024"
                                alt="Festival 2024"
                                style={{ height:"450px" }}
                            />
                        </div>
                        <div class="slideElem">
                            <img
                                src={festival2023}
                                className="festival2023"
                                alt="Festival 2023"
                                style={{ height:"450px" }}
                            />
                        </div>
                        <div class="slideElem">
                            <img
                                src={festival2022}
                                className="festival2022"
                                alt="Festival 2022"
                                style={{ height:"450px" }}
                            />
                        </div>
                        <div class="slideElem">
                            <img
                                src={festival2021}
                                className="festival2021"
                                alt="Festival 2021"
                                style={{ height:"450px" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <br/>
                
            {/* ---------------------------- Sobre --------------------------- */}

            <div id="about">
                <h2> Sobre o Festival de Vilar de Mouros </h2>
                <p> O Festival de Vilar de Mouros é um festival de música que se realiza anualmente em Vilar de Mouros, Caminha, Portugal.
                    Pioneiros desde o início, orgulhosamente fomos o primmeiro festival de música em Portugal e um dos mais antigos efestivais de música da Europa. </p>    
                <p> Este festival foi criado em 1971 por um grupo de amigos que queriam trazer música a Vilar de Mouros. Desde então, o festival tem crescido ao longo dos anos e hoje é um dos maiores festivais de música em Portugal. </p>
                <p> Conta com programação para todos os gostos, que inclui música de estilos como o rock, pop, eletrónica, hip-hop e música clássica.
                    O festival também tem uma área de campismo onde convidamos todos os festivaleiros a acampar durante os três dias do festival. </p>
                <p> O festival é conhecido pela sua atmosfera descontraída e pela sua localização única, junto ao rio Coura.
                    É um evento imperdível para todos os amantes de música e para todos os que querem passar um fim de semana inesquecível em Vilar de Mouros. </p>
                <div>
                    <img
                        src={foto1edicao}
                        className="foto1edicao"
                        alt="Foto tirada na 1ª edição do Festival"
                        style={{ height:"450px" }}
                    />
                </div>
            </div>
            <br/>
            
            {/* --------------------------- Cartaz --------------------------- */}
    
            <div id="lineUp">
                <h2> Programação da 46ª Edição do Festival </h2>
                {/* TODO */}            
            </div>
            <br/>

            {/* ------------------------ Voluntariado ------------------------- */}

            <div id="volunteersForm">
                <h2> Formulário de Candidatura a Voluntário </h2>
                {/* TODO */}                
            </div>
            <br/>

            {/* ---------------------- Últimas Notícias ----------------------- */}

            <div id="latestNews">
                <h2> Últimas Notícias </h2>
                    <h3 style={{textAlign:"center"}}>🎸 Bandas confirmadas para este festival </h3>
                    <p style={{textAlign:"center"}}> Para já temos os seguintes artistas confirmados: </p>
                    {/* TODO -  meter aqui a tabela que fizeste para a parte do cartaz */}  
                    <h3 style={{textAlign:"center"}}>🏕️ Área de campismo.</h3>
                    <p style={{textAlign:"center"}}> A área de campismo do festival terá capacidade para 5000 pessoas.</p>                  

                <div>
                    <img
                        src={recinto}
                        className="recinto"
                        alt="Foto tirada na 1ª edição do Festival"
                        style={{ height:"450px" }}
                    />
                    <figcaption>Mapa do Recinto da 46ª edição do Festival Vilar de Mouros</figcaption>
                </div>

                </div>  
            <br/>

            {/* -------------------------- Contactos -------------------------- */}

            <div id ="contacts">
                <h2> Contactos </h2>
                <p>Email: <a href="mailto:info@festivalvilardemouros.pt">info@festivalvilardemouros.pt</a></p>
                <p>Telefone: <a href="tel:+351 123 456 789">+351 123 456 789</a></p>
                <p>Morada: Rua do Festival, 123, 4910-123 Vilar de Mouros</p>   
            </div>
            <br/>


            {/* ------------------------- Reclamações ------------------------- */}
            {/* extra - não é necessário ter já pronto para esta entrega */} 
            {/*
            <div id ="complaints">
                <h2>Portal de Reclamações</h2>
                <p> Bem-vindo ao portal de reclamações do Festival de Vilar de Mouros. </p>
                <h3>Como fazer uma reclamação</h3>
                <p> Para fazer uma reclamação, preencha o formulário abaixo com os seus dados e a sua reclamação.</p> 
                <p>A sua reclamação será analisada pela nossa equipa que procurará dar uma resposta à sua reclamação, o mais rápido possível. </p>
            
            <br/>

                <div id="complaintsForm">
                    <h3>Formulário de Reclamação</h3>
                    <form id="submitComplaint.html" method="post">
                        ...
                    </form>

                </div>
            </div>
            <br/>
            */}

            {/* ------------------------ Outros Festivais ------------------------ */}


            <div id="links_outros_festivais">
                <ul>
                    <li><a href="https://www.rockinrio.com" target="_blank">Rock in Rio</a></li>
                    <li><a href="https://www.primaverasound.com" target="_blank">Primavera Sound</a></li>
                </ul>
            </div>

            
        </div>

    );
}

export default Main;

