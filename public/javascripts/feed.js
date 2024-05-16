var like = document.querySelectorAll(".like")

like
.forEach((elem)=>{
    var lclick = true
    elem
    .addEventListener("click", (data)=>{
        if (lclick === true){
            elem.classList.remove("like", "ri-heart-line", "text-[24px]")
            elem.classList.add('like', 'ri-heart-fill', 'text-red-600', 'text-[24px]')
            lclick = false
        }
        else{
            elem.classList.remove('like', 'ri-heart-fill', 'text-red-600', 'text-[24px]')
            elem.classList.add("like", "ri-heart-line", "text-[24px]")
            lclick = true    
        };

        fetch(`/likes/${data.target.dataset.postid}`)
        .then(raw => raw.json())
        .then(function(response){
            elem.parentElement.parentElement.parentElement.querySelector(".likesCounts").textContent = `${response.postLikes.length} Likes`
        })
    })

})


var savePost = document.querySelectorAll(".savePost")

savePost
.forEach((elem)=>{
var sclick = true
    elem
    .addEventListener("click", (dets)=>{

        if(sclick === true){
            elem.classList.remove('savePost', 'ri-bookmark-line', 'text-[24px]')
            elem.classList.add('savePost', 'ri-bookmark-fill', 'text-white', 'text-[24px]')
            sclick = false
        }
        else{
            elem.classList.remove('savePost', 'ri-bookmark-fill', 'text-white', 'text-[24px]')
            elem.classList.add('savePost', 'ri-bookmark-line', 'text-[24px]')
            sclick = true
        };

        var id = dets.target.dataset.saveid

        fetch(`/save/${id}`)

    })

})

