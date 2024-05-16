let menu = document.getElementById("menu");
let menuSection = document.getElementById("menuSection");
let mclick = false;
menu
.addEventListener("click", showMenu)

function showMenu (){

    if(mclick === false){
        gsap.to(menuSection,{
            height: "fit-content",
            ease: "power1.in",
            duration:2.5,
        })
        mclick = true
    }

    else{
        gsap.to(menuSection,{
            height: "0px",
            ease: "power1.in",
            duration:2.5,
        })
        mclick = false
    }

};

gsap.to(".svae",{
    opacity: 0
})

var psvg  = document.querySelectorAll(".psvg")
psvg
.forEach((elem)=>{

    elem
    .addEventListener("click", ()=>{
    
        gsap.to(".psvg", {
            color: "white"
        })
    
        gsap.to(elem, {
            color: "blue"
        })
    
    
    })

})


var posts = document.getElementById("posts")
posts
.addEventListener("click",(dets)=>{

   gsap.to(".svae",{
        opacity: 0
    })

})



var savePost = document.getElementById("savePost")
var svae = document.querySelector(".svae")
var op = true
savePost
.addEventListener("click",(dets)=>{

    gsap.to(".svae",{
        opacity: 1
    })


axios.get(`/userSave/${dets.target.dataset.users}`)
.then(function(e){
    var culter = ""
        e.data.savePost.forEach((elem)=>{
        culter += `
        <div class="w-[7.64rem] h-[7.64rem] bg-zinc-400">
                <img class="w-full h-full object-cover bg-center" src="/images/uploads/posts/${elem.postImage}" alt="">
            </div>
        `
        svae.innerHTML = culter;
    })
})

})


