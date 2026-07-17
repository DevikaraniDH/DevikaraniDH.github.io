// Dark / Light Mode Toggle

const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if(document.body.classList.contains("dark")){
            themeToggle.textContent = "☀️";
        }
        else{
            themeToggle.textContent = "🌙";
        }

    });

}



// Mobile Menu

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");


if(hamburger){

    hamburger.addEventListener("click",()=>{

        navMenu.classList.toggle("active");

    });

}



// Scroll Reveal Animation

const cards = document.querySelectorAll(
".project-card, .skill-card, .learning-card, .hackathon-card, .achievement-item"
);


const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

},{
    threshold:0.2
});



cards.forEach(card=>{

    card.style.opacity="0";
    card.style.transform="translateY(40px)";
    card.style.transition="0.6s ease";

    observer.observe(card);

});



// Smooth Scrolling

document.querySelectorAll("a[href^='#']").forEach(link=>{

    link.addEventListener("click",function(e){

        const target=document.querySelector(
            this.getAttribute("href")
        );

        if(target){

            e.preventDefault();

            target.scrollIntoView({
                behavior:"smooth"
            });

        }

    });

});
