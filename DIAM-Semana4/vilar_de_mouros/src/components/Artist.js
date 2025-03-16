export default function Artist() {
  return (
    <>
      <p>Nome: {nome}</p>
      <img src={imagem}/>
      <p>Estilo musical: {estilo}</p>
      <p>{descricao}</p>
    </>
  );
}
