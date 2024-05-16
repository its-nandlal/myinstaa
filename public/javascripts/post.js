var postImg = document.querySelector(".postImg")
let fileInput = document.querySelector("#file-input")

fileInput
.addEventListener("change",dp)

function dp (){
    var dpLink =  URL.createObjectURL(fileInput.files[0])
    return postImg.src = `${dpLink}`
}