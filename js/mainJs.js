//elements
let navBar = document.querySelector("nav");
let allQuestion = document.querySelectorAll(".frequntly-question .all-questions .questions");
let openIconForSmallScrean = document.getElementById("open-men");
let openIconForSmallScreanUL = document.querySelector("nav ul");

//openIconForSmallScrean
openIconForSmallScrean.onclick = function(){
    openIconForSmallScreanUL.classList.toggle("display-blok-ul");
};
document.onclick = function(e){
    if(e.target.classList[0] !== "open-men"){
        openIconForSmallScreanUL.classList.remove("display-blok-ul");
    }
};
//change nav bar style whine scroll
window.onscroll = function(){
    if(window.scrollY >= 100){
        navBar.style = "background-color: #6c63ff";
    }
    else{
        navBar.style = "background-color: transparent";
    }
};

//display answer for frequntly question 
for(let i = 0 ; i < allQuestion.length ; i++){
    allQuestion[i].addEventListener("click" , function(){
        this.classList.toggle("display-blok");
        if(this.classList.contains("display-blok")){
            document.querySelector(`.${this.classList[1]} i`).classList.remove("fa-plus");
            document.querySelector(`.${this.classList[1]} i`).classList.add("fa-minus");
        }
        else{
            document.querySelector(`.${this.classList[1]} i`).classList.add("fa-plus");
            document.querySelector(`.${this.classList[1]} i`).classList.remove("fa-minus");
        }
        
    });
}