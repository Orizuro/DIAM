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
  comment = document.getElementById("comment").value.toLowerCase()
  commetElement = document.getElementById("comment-text")

  isValid = true 

  if(!comment) {
      commetElement.innerText = ""
      return
  }

  insultosPoucoConhecidos.forEach(element => {
   if(comment.includes(element)) {
      console.log(`found ${element} in comment`)
      commetElement.innerText = ""
      isValid = false
      return
    }
  });

  if(isValid)
    commetElement.innerText = "Comentário aceite"
} 
