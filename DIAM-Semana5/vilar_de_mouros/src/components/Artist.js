import './Artists.css'

let isVideoEnable = false;

const toggleVideo = (nome) => {
  const elem = document.getElementById("youtubeVideo_" + nome);

  isVideoEnable = !isVideoEnable;

  elem.style.display = isVideoEnable ? "block" : "none"

}

export default function Artist({ nome, imagem, estilo, descricao, link, atuacao, isBand }) {
  return (
    <section className="artistContainer">
      <h3>Nome: {nome} {isBand && "(Banda)"} </h3>
      <p><b>Atuação:</b> {atuacao}</p>
      <img src={imagem} alt="" width={500} onClick={() => toggleVideo(nome)} />
      <p><b>Estilo musical:</b> {estilo}</p>
      <p>{descricao}</p>

      <iframe
        id={'youtubeVideo_' + nome}
        title="Video clip"
        width={600}
        height={400}
        src={link}
        allowFullScreen
        style={{ display: "none" }}
      >
      </iframe>

    </section>
  );
}
