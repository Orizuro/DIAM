import './styles.css';
import FormVoluntario from "./FormVoluntario";

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
            </div>
            <br/>
                
            {/* ------------------------ Voluntariado ------------------------- */}

            <div id="volunteersForm">
                <h2> Formulário de Candidatura a Voluntário </h2>
                <FormVoluntario/>
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
            
        </div>

    );
}

export default Main;

