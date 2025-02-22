const insultosPoucoConhecidos = [
  "abécula",
  "abentesma",
  "achavascado",
  "alimária",
  "andrajoso",
  "barregã",
  "biltre",
  "cacóstomo",
  "cuarra",
  "estólido",
  "estroso",
  "estultilóquio",
  "nefelibata",
  "néscio",
  "pechenga",
  "sevandija",
  "somítico",
  "tatibitate",
  "xexé",
  "xexelento"
];

console.log(insultosPoucoConhecidos)

function isCommentValid() {
  comment = document.getElementById("comment").innerText

  if(!comment)
    return

  insultosPoucoConhecidos.forEach(element => {
   if(comment.contains(element))
    return
  });

  document.getElementById("comment-text").innerText = "Comentário aceite"
} 
