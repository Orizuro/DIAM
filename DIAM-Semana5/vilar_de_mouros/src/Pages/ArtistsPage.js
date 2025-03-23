import './styles.css';
import '../components/Artist'
import Artist from '../components/Artist';
import artists from '../artists.json'

function ArtistsPage() {

  return (
    <div className="MainBox">

      <h1>
        {
          artists.length === 0
            ? "Lamentos mas de momento não há artistas..."
            : "Lista de artistas"
        }
      </h1>

      {
        // Check if exists an artist in the json file
        artists.length !== 0 &&

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
              isBand={item.isBand}
            ></Artist>
          </>
        })
      }

    </div>

  );
}

export default ArtistsPage;

