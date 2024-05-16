let dpchang = document.getElementById("dpchang")
let dpinput = document.getElementById("dpinput")
let dpimg = document.querySelector(".dpimg")

dpchang
.addEventListener("click", inputdp)


function inputdp (){
    dpinput.click()
}

dpinput
.addEventListener("change",dp)

function dp (){
    var dpLink =  URL.createObjectURL(dpinput.files[0])
    dpimg.src = `${dpLink}`
}