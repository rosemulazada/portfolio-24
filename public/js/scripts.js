// Script test
console.log("Hello, world!");

// Imports
gsap.registerPlugin(ScrollTrigger);

/**============================================
 *                  HEADER
 *=============================================**/
// CURRENT TIME
// Function to update the displayed time
function updateClock() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();

    hours = (hours < 10 ? "0" : "") + hours;
    minutes = (minutes < 10 ? "0" : "") + minutes;
    seconds = (seconds < 10 ? "0" : "") + seconds;

    // Display the updated time
    document.getElementById("currentTime").textContent =
        hours + ":" + minutes + ":" + seconds;
}

// Update the clock immediately and then every second
updateClock();
setInterval(updateClock, 1000);

/**============================================
 *               LANDING PAGE
 *=============================================**/
// Name scroll
// SRC: www.youtube.com/watch?v=AqMESJ51e3o - Tweaked to work without React
const firstText = document.querySelector(".first-text");
const secondText = document.querySelector(".second-text");
const slider = document.querySelector(".slider");

let xPercent = 0;
let direction = -1;

const animate = () => {
    if (xPercent < -100) {
        xPercent = 0;
    } else if (xPercent > 0) {
        xPercent = -100;
    }

    firstText.style.transform = `translateX(${xPercent}%)`;
    secondText.style.transform = `translateX(${xPercent}%)`;

    requestAnimationFrame(animate);

    xPercent += 0.1 * direction;
};

animate();

gsap.to(slider, {
    scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => (direction = e.direction * -1),
    },
    x: "-500px",
});

document.addEventListener("DOMContentLoaded", () => {
    // gsap.set(".img", { y: "100dvh" });
    gsap.set(".slider__container", { y: 200, opacity: 0.25 });
    gsap.set("header", { y: 25, opacity: 0 });
    // gsap.set("h1", { y: 25, x: 25, opacity: 0 });

    const tl = gsap.timeline({ delay: 1 });

    tl
        //     .to(".logo__intro", {
        //     y: "-100dvh",
        //     duration: 1.5,
        //     stagger: 0.05,
        //     ease: "power3.inOut",
        // })
        //     .to(".loader", {
        //         clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        //         duration: 1,
        //         ease: "power3.inOut",
        //     })
        .to(
            ".slider__container",
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.1,
                ease: "power3.inOut",
            },
            "-=0.1"
        )
        .to(
            ["header"],
            {
                y: 0,
                x: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.1,
                ease: "power3.inOut",
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            },
            "-=0.25"
        );
});

// CIRCULAR TEXT EFFECT
// Credit: https://www.youtube.com/watch?v=Ly1ktCTpcWo
const str = "CREATIVE FRONT END DEV  ✷ CREATIVE FRONT END DEV ✷";
const text = document.querySelector('#circular_text');

for (let i = 0; i < str.length; i++) {
    let span = document.createElement('span');
    span.innerHTML = str[i];
    text.appendChild(span);

    span.style.transform = `rotate(${7 * i}deg)`;
}