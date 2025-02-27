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

// A function to check if the comment is isValid
// returns a boolean
function isCommentValid() {
  commentElement = document.getElementById("comment")
  successTextElement = document.getElementById("comment-text")

  comment = commentElement.value.toLowerCase()

  isValid = true

  // If there's no comment
  if (!comment) {
    commentElement.innerText = ""
    return false
  }

  insultosPoucoConhecidos.forEach(element => {
    if (comment.includes(element)) {
      console.info(`Found ${element} in comment`)

      // clear the textArea
      commentElement.value = ""

      successTextElement.innerText = ""
      isValid = false
      return
    }
  });

  if (isValid)
    successTextElement.innerText = "Comentário aceite"

  return isValid
}

// A function to check if it can submit
function canSubmit() {

  // Only submists the form if is valid
  if (isCommentValid()) {
    console.log("The comment is valid!")
    document.volunteerForm.submit()
  }

}

//img = document.getElementById("date-img");
function hideImg() {
  document.getElementById("date-img").style.visibility = "hidden" 
  document.getElementById("hide-btn").style.display = "block"
}

function unhideImg() {
  document.getElementById("date-img").style.visibility = "visible" 
  document.getElementById("hide-btn").style.display = "none"
}
