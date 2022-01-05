// write your code here
document.addEventListener("DOMContentLoaded", () =>{
fetchRamen()
const ramenForm = document.getElementById("new-ramen")
ramenForm.addEventListener("submit", newRamen)
});

function fetchRamen(){
    fetch("http://localhost:3000/ramens")
        .then(response => response.json())
        .then(data => data.forEach(ramen => {
            ramenDisplay(ramen)
            }
        ))
};

function ramenDisplay(el){
    const ramenMenu = document.getElementById("ramen-menu")
    
    const menuImg = document.createElement('img')
        menuImg.src = el.image
        ramenMenu.append(menuImg)
        menuImg.addEventListener("click", (e) =>{
            e.preventDefault()

            const detailImage = document.querySelector(".detail-image")
                detailImage.src = el.image
                detailImage.alt = el.name
            
            const ramenName = document.querySelector(".name")
                ramenName.innerText = el.name
            
            const ramenRestaurant = document.querySelector(".restaurant")
                ramenRestaurant.innerText = el.restaurant

            const ramenRating = document.getElementById("rating-display")
                ramenRating.innerText = el.rating

            const ramenComment = document.getElementById("comment-display")
                ramenComment.innerText = el.comment
    })
};

function newRamen(e){
    e.preventDefault()

    const newName = document.getElementById("new-name")
    const newRestaurant = document.getElementById("new-restaurant")
    const newImage = document.getElementById("new-image")
    const newRating = document.getElementById("new-rating")
    const newComment = document.getElementById("new-comment")

    let ramenObj = {
        name:newName.value,
        restaurant:newRestaurant.value,
        image:newImage.value,
        rating:newRating.value,
        comment:newComment.value
    }
    
    ramenDisplay(ramenObj)

    fetch("http://localhost:3000/ramens", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(ramenObj)
    })
        .then(response => response.json())
        .then(data => console.log(data))
}