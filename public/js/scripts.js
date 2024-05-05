// Imports
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Flip);

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

// TURN FROM COLUMN TO ROW
const state = Flip.getState("#metadata", { props: "flexDirection" });
// element.classList.toggle("row");
// Flip.from(state, {
//     duration: 1,
//     ease: "power1.inOut",
//     absolute: true,
//     onComplete: myFunc,
// });

/**============================================
 *               LANDING PAGE
 *=============================================**/
// NAME SCROLL
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

// CLIP-PATH INTRO
// gsap.set(".img", { y: "100dvh" });
gsap.set(".slider__container", { y: 200, opacity: 0.25 });
gsap.set("header", { y: 25, opacity: 0 });
gsap.set("body", { overflowY: "hidden" });

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
    )
    .to(
        "body",
        {
            overflowY: "auto",
        },
        0
    );

// CIRCULAR TEXT EFFECT
// Credit: https://www.youtube.com/watch?v=Ly1ktCTpcWo
const str = "CREATIVE FRONT END DEV  ✷ CREATIVE FRONT END DEV ✷";
const text = document.querySelector("#circular_text");

for (let i = 0; i < str.length; i++) {
    let span = document.createElement("span");
    span.innerHTML = str[i];
    text.appendChild(span);

    span.style.transform = `rotate(${7 * i}deg)`;
}

// MENU
document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.querySelector(".hamburger_menu");
    const toggleBtnBefore = document.querySelector(
        ".hamburger_menu span:first-of-type"
    );
    const toggleBtnAfter = document.querySelector(
        ".hamburger_menu span:last-of-type"
    );

    const activeIndex = document.querySelector("#active-null-state");

    // const after = window.getComputedStyle(active, "::after");
    // console.log("after", after);
    // after.setAttribute('style', 'background: blue')

    const overlay = document.querySelector(".overlay");
    const subNav = document.querySelector(".sub-nav");
    const menuItems = document.querySelectorAll(".menu-item p");
    const logoSvgPaths = document.querySelectorAll("header nav svg path");

    // gsap.set(".menu-item p", {
    //     y: 225,
    // });

    gsap.set([overlay, subNav], { opacity: 0 });
    gsap.set(menuItems, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    // tl.to(".overlay", {
    //     duration: 1.5,
    //     clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    //     ease: "power4.inOut",
    // });

    // tl.to(
    //     ".menu-item p",
    //     {
    //         duration: 1.5,
    //         y: 0,
    //         stagger: 0.2,
    //         ease: "power4.inOut",
    //     },
    //     "-=1"
    // );

    // tl.to(
    //     activeItemIndicator,
    //     {
    //         width: "100%",
    //         duration: 1,
    //         ease: "power4.inOut",
    //         delay: 0.5,
    //     },
    //     "<"
    // );

    // tl.to(
    //     ".sub-nav",
    //     {
    //         bottom: "10%",
    //         opacity: 1,
    //         duration: 0.5,
    //         delay: 0.5,
    //     },
    //     "<"
    // );

    tl.to("header", {
        height: "100%",
    })
        .to(
            toggleBtnBefore,
            {
                rotate: "45deg",
                duration: 0.5,
            },
            0
        )
        .to(
            toggleBtnAfter,
            {
                rotate: "-45deg",
                duration: 0.5,
                translateY: "-7px",
            },
            0
        )
        .to(
            overlay,
            {
                display: "flex",
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: 1.5,
                ease: "power4.inOut",
                opacity: 1,
            },
            0
        );

    menuItems.forEach((menuItem) => {
        tl.to(menuItem, {
            y: 0,
            opacity: 1,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 0.5,
            ease: "circ.out",
        });
    });

    // logoSvgPaths.forEach((path) => {
    //     tl.to(path, {
    //         fill: "#cfc6c1",
    //         duration: 0.5,
    //         ease: "circ.out",
    //     });
    // });

    // logoSvgPaths.forEach((path) => {
    //     tl.to(path, {
    //         fill: "#cfc6c1",
    //     });
    // });

    // Continue with the timeline
    tl.to(
        subNav,
        {
            display: "flex",
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1,
            ease: "power4.inOut",
            opacity: 1,
        },
        "-=1"
    ).to(
        [toggleBtnBefore, toggleBtnAfter],
        {
            background: "#eeeae7",
        },
        0
    );

    function changeId() {
        activeIndex.id = "active";
    }

    let isOpen = true;
    toggleBtn.addEventListener("click", () => {
        if (isOpen) {
            isOpen = false;

            tl.play();
        } else {
            tl.reverse();

            isOpen = true;
        }
    });
});

/**============================================
 *                  WORKS
 *=============================================**/
// Imported worksData from server-side
const filterContainer = document.querySelector(".filters");
const filterItems = document.querySelectorAll(".filter");
const allFilter = document.querySelector(".all");
const allFilterP = document.querySelector(".all-p");

filterItems.forEach((activeFilter) => {
    activeFilter.addEventListener("click", () => {
        allFilter.classList.remove("all");
        allFilterP.classList.remove("all-p");

        const activeFilterH3 = activeFilter.querySelector("h3");
        const activeFilterP = activeFilter.querySelector("p");

        activeFilter.classList.add("active");

        if (activeFilter.classList.contains("active")) {
            activeFilterP.style.color = "#fb6eff";
            const activeFilterText = activeFilterH3.innerText;
            const chars = activeFilterText.split("");

            activeFilterH3.innerHTML = "";

            chars.forEach((char, index) => {
                const span = document.createElement("span");
                span.textContent = char;
                activeFilterH3.appendChild(span);

                gsap.to(span, {
                    fontSize: "8vw",
                    fontWeight: "900",
                    marginRight: ".5em",
                    color: "#fb6eff",
                    duration: 0.5,
                    ease: "power2.out",
                    delay: index * 0.05,
                });
            });
        }

        filterItems.forEach((inactiveFilter) => {
            if (activeFilter !== inactiveFilter) {
                inactiveFilter.classList.remove("active");

                inactiveFilter.querySelector("h3").innerHTML =
                    inactiveFilter.querySelector("h3").innerText;
                inactiveFilter.querySelector("p").style.color = "";
            }
        });
    });
});

// const worksContainer = document.querySelector(".works");
// for (let work in worksData) {
//     const workItem = document.createElement('div');
//     const workItemH3 = document.createElement("h3");
//     const workItemImg = document.createElement("img");
//     workItem.classList.add('work');
//     workItem.appendChild(workItemH3);
//     workItem.appendChild(workItemImg);
//     worksContainer.appendChild(workItem)
// }

// Object.keys(worksData).forEach((workCategory) => {

// })
