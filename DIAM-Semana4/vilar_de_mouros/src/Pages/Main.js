import './styles.css';

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
                        <li><a href="#lineUp" onClick={(e) => { e.preventDefault(); scrollToSection("lineUp"); }}>Cartaz</a></li>
                        <li><a href="#contacts" onClick={(e) => { e.preventDefault(); scrollToSection("contacts"); }}>Contactos</a></li>
                    </ul>
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

            
        </div>

    );
}

export default Main;

