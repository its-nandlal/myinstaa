let searchIcon = document.getElementById("search")
let sectionS = document.getElementById("sectionS")
let SearchInput = document.getElementById("SearchInput")
let serachU = document.querySelector(".serachU")

let sclick = false;

searchIcon
.addEventListener("click",showSSection)

function showSSection (){
    if(sclick === false){
        gsap.to(sectionS,{
            height: "84vh",
            ease: Power2,
        })
        sclick = true
    }

    else{
        gsap.to(sectionS,{
            height: "0px",
            ease: Power4,
        })
        
        sclick = false
    }


}

var cluter = ""
SearchInput
.addEventListener("input", ()=>{
    var cluter = ""
    axios.get(`/username/${SearchInput.value}`)
    .then(function(data){
        
        data.data.forEach((elem)=>{
            
            cluter +=`
            <div class="mt-2 mx-auto w-[97%] px-3 py-2 bg-[#ffffff2f] backdrop-blur-2xl rounded-full">

            <div class="flex items-center justify-between">
    
              <div class="flex items-center gap-2">
                
              <div class="w-10 h-10 bg-white rounded-full overflow-hidden shrink-0">
                <img class="w-full h-full object-cover" src="/images/uploads/dp/${elem.dp}" alt="">
              </div>
    
              <div class="w-[70%] overflow-hidden text-ellipsis">
                <span class="block overflow-hidden text-nowrap text-ellipsis">${elem.username}</span>
              </div>
    
            </div>
    
               <div class="w-[1.4rem] h-[1.4rem] flex items-center justify-center rounded-full bg-[#0000008f] backdrop-blur-md" >
                <svg fill="currentColor" height="14" role="img" viewBox="0 0 24 24" width="14"><title>Close</title><polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"></polyline><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" x1="20.649" x2="3.354" y1="20.649" y2="3.354"></line></svg>
                </div>
    
    
            </div>
    
    
    
          </div>
            `

            serachU.innerHTML = cluter
        })
    })


})


