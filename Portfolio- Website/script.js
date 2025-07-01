// WRAP TEXT IN SPANS
function revealToSpan() {
    document.querySelectorAll(".reveal").forEach(function (elem) {
        var parent = document.createElement("span");
        var child = document.createElement("span");

        parent.classList.add("parent");
        child.classList.add("child");

        child.innerHTML = elem.innerHTML;

        parent.appendChild(child);
        elem.innerHTML = "";
        elem.appendChild(parent);
    });
}

// SET INITIAL STATES
function valueSetters() {
    gsap.set("#nav a", { y: "-100%", opacity: 0 });
    gsap.set("#home span .child", { y: "100%" });
    gsap.set("#home .row img", { opacity: 0 });

    document.querySelectorAll("#Visual > g").forEach(function (e) {
        var character = e.querySelector("path, polyline");
        if (!character) return;

        var length = character.getTotalLength();
        character.style.strokeDasharray = length + "px";
        character.style.strokeDashoffset = length + "px";
    });

    // Set initial y for all .row .reveal .child
    gsap.set(".row .parent .child", { y: "100%" });
}

// LOADER ANIMATION
function loaderAnimation() {
    var tl = gsap.timeline();

    tl.from("#loader .child span", {
        x: 100,
        duration: 2,
        stagger: 0.2,
        ease: "power3.inOut",
    })
    .to("#loader .parent .child", {
        y: "-100%",
        duration: 1,
        ease: "circ.inOut",
    })
    .to("#loader", {
        height: 0,
        duration: 1,
        ease: "circ.inOut",
    })
    .to("#green", {
        height: "100%",
        top: 0,
        delay: -0.8,
        duration: 1,
        ease: "circ.inOut",
    })
    .to("#green", {
        height: "0%",
        top: 0,
        delay: -0.3,
        duration: 1,
        ease: "circ.inOut",
        onComplete: function () {
            animateHomepage();
        }
    });
}

// SVG STROKE DRAW ANIMATION
function animateSvg() {
    gsap.to("#Visual path, #Visual polyline", {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power3.inOut",
        delay: 0
    });
}

// Animate Home & Global Reveals
function animateHomepage() {
    var tl = gsap.timeline();

    tl.to("#nav a", {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        ease: "expo.inOut",
    })
    .to("#home .parent .child", {
        y: 0,
        stagger: 0.1,
        duration: 1.5,
        ease: "expo.inOut",
    })
    .to("#home .row img", {
        opacity: 1,
        delay: -0.5,
        ease: "expo.inOut",
        onComplete: function () {
            animateSvg();
            animateReveals(); // 👈 Global reveals animation
        }
    });
}

// Animate All .row .reveal Texts
function animateReveals() {
    gsap.to(".row .parent .child", {
        y: 0,
        stagger: 0.1,
        duration: 1.5,
        ease: "expo.inOut",
    });
}

// Locomotive Scroll Init
function locoInitialize(){
    const scroll = new LocomotiveScroll({
        el: document.querySelector('#main'),
        smooth: true
    });
}

// Custom Cursor & Hover Effects
function setupHoverEffects() {
    const allCnt = document.querySelectorAll(".cnt");
    const cursorChildren = document.querySelectorAll("#cursor > div");
    const page4 = document.getElementById("page4");

    allCnt.forEach((cnt, i) => {
        const index = parseInt(cnt.dataset.index);
        const img = cnt.querySelector("img");

        cnt.addEventListener("mousemove", (e) => {
            const cursorDiv = cursorChildren[index];
            if (cursorDiv) {
                cursorDiv.style.opacity = "1";
                cursorDiv.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            }

            if (img) {
                img.style.filter = "grayscale(100%)";
            }

            const bgColor = cnt.getAttribute("data-color");
            if (bgColor) {
                page4.style.backgroundColor = bgColor;
            }
        });

        cnt.addEventListener("mouseleave", () => {
            const cursorDiv = cursorChildren[index];
            if (cursorDiv) {
                cursorDiv.style.opacity = "0";
            }

            if (img) {
                img.style.filter = "none";
            }

            page4.style.backgroundColor = ""; // reset
        });
    });
}

// RUN EVERYTHING
revealToSpan();
valueSetters();
loaderAnimation();
locoInitialize();
setupHoverEffects();
