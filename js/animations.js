//scroll animations
//each rule: [selector , animation , delay step between siblings (seconds) , siblings per row]
let animationRules = [
    //nav
    ["nav .continer > a" , "from-left"],
    ["nav ul li" , "from-top" , 0.1],
    //header (home)
    ["header .left h1" , "from-left"],
    ["header .left p" , "from-left" , 0 , 1 , 0.2],
    ["header .left .start" , "pop" , 0 , 1 , 0.4],
    ["header .rigth img" , "from-right"],
    //categories (home)
    [".categories .left h1" , "from-top"],
    [".categories .left p" , "from-left" , 0 , 1 , 0.15],
    [".categories .left a" , "pop" , 0 , 1 , 0.3],
    [".categories .rigth .box" , "zoom-in" , 0.12 , 2],
    //courses (home + courses page)
    [".course .continer > h1" , "from-top"],
    [".all-courses .box" , "flip-up" , 0.15 , 3],
    //frequently asked questions (home)
    [".frequntly-question .continer > h1" , "from-top"],
    [".all-questions .questions:nth-child(odd)" , "from-left"],
    [".all-questions .questions:nth-child(even)" , "from-right"],
    //achievements (about)
    [".achievements .left img" , "from-left"],
    [".achievements .right > h1" , "from-right"],
    [".achievements .right > p" , "from-right" , 0 , 1 , 0.15],
    [".achievements .all-box .box" , "from-bottom" , 0.15 , 3],
    //our team (about)
    [".our-team .continer > h1" , "from-top"],
    [".our-team .team" , "from-bottom" , 0.12 , 4],
    //contact
    [".continer-info > img" , "pop"],
    [".continer-info > h1" , "from-top" , 0 , 1 , 0.1],
    [".continer-info > p" , "from-left" , 0 , 1 , 0.2],
    [".continer-info > div" , "from-left" , 0.12 , 3 , 0.3],
    [".continer-info ul li" , "zoom-in" , 0.1 , 4 , 0.5],
    ["form .name input" , "from-right" , 0.12 , 2],
    ["form > input , form > textarea" , "from-right" , 0.12 , 4 , 0.2],
    //footer
    ["footer .continer > div" , "from-bottom" , 0.15 , 4],
    ["footer .copy" , "from-bottom"],
];

let reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if("IntersectionObserver" in window){
    document.documentElement.classList.add("anim-ready");

    for(let i = 0 ; i < animationRules.length ; i++){
        let [selector , animation , step = 0 , perRow = 1 , baseDelay = 0] = animationRules[i];
        let elements = document.querySelectorAll(selector);
        for(let j = 0 ; j < elements.length ; j++){
            elements[j].dataset.anim = animation;
            elements[j].style.setProperty("--anim-delay" , `${baseDelay + (j % perRow) * step}s`);
        }
    }

    let observer = new IntersectionObserver(function(entries){
        for(let i = 0 ; i < entries.length ; i++){
            if(entries[i].isIntersecting){
                entries[i].target.classList.add("in-view");
                observer.unobserve(entries[i].target);
            }
        }
    } , {threshold: 0.15});

    document.querySelectorAll("[data-anim]").forEach(function(element){
        observer.observe(element);
    });

    //count up the achievements numbers (about)
    let numbers = document.querySelectorAll(".achievements .all-box .box h1");
    let numbersObserver = new IntersectionObserver(function(entries){
        for(let i = 0 ; i < entries.length ; i++){
            if(entries[i].isIntersecting){
                countUp(entries[i].target);
                numbersObserver.unobserve(entries[i].target);
            }
        }
    } , {threshold: 0.6});
    numbers.forEach(function(number){
        if(!reduceMotion){
            numbersObserver.observe(number);
        }
    });
}

function countUp(element){
    let text = element.textContent;
    let target = parseInt(text.replace(/\D/g , ""));
    let suffix = text.replace(/[\d,]/g , "");
    let duration = 2000;
    let start = null;
    function frame(time){
        if(start === null){
            start = time;
        }
        let progress = Math.min((time - start) / duration , 1);
        let eased = 1 - Math.pow(1 - progress , 3);
        element.textContent = Math.round(target * eased).toLocaleString("en-US") + suffix;
        if(progress < 1){
            requestAnimationFrame(frame);
        }
    }
    requestAnimationFrame(frame);
}

//scroll progress bar
let progressBar = document.createElement("div");
progressBar.className = "scroll-progress";
document.body.appendChild(progressBar);
function updateProgress(){
    let maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.transform = `scaleX(${maxScroll > 0 ? window.scrollY / maxScroll : 0})`;
}
window.addEventListener("scroll" , updateProgress , {passive: true});
updateProgress();
