import './styles.css';
import '../components/Artist'
import Artist from '../components/Artist';
import artists from '../artists.json'

function Main() {

  return (
    <div className="MainBox">

      <h1>Artistas</h1>

      {
        // Check if exists an artist in the json file
        artists.length == 0 ?
          <p>Lamentos mas de momento não existem artistas...</p>
          :

          // load all the artists in the file
          artists.map((item, i) => {
            return <>
              <hr></hr>
              <Artist
                key={i}
                nome={item.nome}
                atuacao={item.atuacao}
                imagem={item.imagem}
                estilo={item.estilo}
                descricao={item.descricao}
                link={item.link}
              ></Artist>
            </>
          })
      }

      {/* -------------------------- Contactos -------------------------- */}
      <div id="contacts">
        <h2> Contactos </h2>
        <p>Email: <a href="mailto:info@festivalvilardemouros.pt">info@festivalvilardemouros.pt</a></p>
        <p>Telefone: <a href="tel:+351 123 456 789">+351 123 456 789</a></p>
        <p>Morada: Rua do Festival, 123, 4910-123 Vilar de Mouros</p>
      </div>

    </div>

  );
}

export default Main;

