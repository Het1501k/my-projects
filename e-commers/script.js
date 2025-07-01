
gsap.from("nav", {
  y: -100,
  opacity: 0,
  duration: 1,
  ease: "power2.out"
});


gsap.from("#slidbar h1", {
  x: -100,
  opacity: 0,
  duration: 1,
  delay: 1
});
gsap.from("#slidbar p", {
  x: -100,
  opacity: 0,
  duration: 1,
  delay: 1
});
gsap.from("#slidbar button", {
  y: 50,
  opacity: 0,
  duration: 1,
  delay: 1.5
});
gsap.from("#hetvi img", {
  x: 100,
  opacity: 0,
  duration: 1,
  delay: 1.8
});


gsap.utils.toArray(["#page2", "#page3", "#page4", "#page5"]).forEach(section => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
    },
    y: 100,
    opacity: 0,
    duration: 1.2,
    ease: "power2.out"
  });
});


document.querySelectorAll(".flex-box").forEach(box => {
  box.addEventListener("mouseenter", () => {
    gsap.to(box, { scale: 1.07, duration: 0.3, ease: "power2.out" });
  });
  box.addEventListener("mouseleave", () => {
    gsap.to(box, { scale: 1, duration: 0.3, ease: "power2.out" });
  });
});

document.querySelectorAll(".flex-boxbottom button").forEach(button => {
  button.addEventListener("click", () => {
    gsap.fromTo(button, 
      { scale: 1 },
      { scale: 1.2, yoyo: true, repeat: 1, duration: 0.2, ease: "power1.inOut" }
    );
  });
});


document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});


const testimonials = document.querySelectorAll(".test2");
const nextBtn = document.getElementById("seven2");
const prevBtn = document.getElementById("seven1");

let currentIndex = 0;

function showTestimonial(index) {
  testimonials.forEach((t, i) => {
    t.style.display = i === index ? "block" : "none";
  });
}

showTestimonial(currentIndex);

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial(currentIndex);
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentIndex);
});

document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.createElement("div");
  preloader.id = "preloader";
  preloader.innerHTML = `<h2>Loading...</h2>`;
  preloader.style.cssText = `
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    z-index: 9999;
    font-size: 2rem;
    color: #e88bba;
  `;
  document.body.appendChild(preloader);

  setTimeout(() => {
    preloader.remove();
  }, 1500);
});

// Create enhanced cursor elements
const cursorInner = document.createElement("div");
const cursorOuter = document.createElement("div");

cursorInner.id = "cursor-inner";
cursorOuter.id = "cursor-outer";

// Styles
cursorInner.style.cssText = `
  position: fixed;
  top: 0; left: 0;
  width: 8px;
  height: 8px;
  background: #e88bba;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
`;

cursorOuter.style.cssText = `
  position: fixed;
  top: 0; left: 0;
  width: 30px;
  height: 30px;
  border: 2px solid #e88bba;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
  transition: transform 0.1s ease-out;
`;

document.body.appendChild(cursorInner);
document.body.appendChild(cursorOuter);


let mouseX = 0, mouseY = 0;
document.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursorInner.style.left = mouseX + "px";
  cursorInner.style.top = mouseY + "px";
});


function animateOuterCursor() {
  cursorOuter.style.left = mouseX + "px";
  cursorOuter.style.top = mouseY + "px";
  requestAnimationFrame(animateOuterCursor);
}
animateOuterCursor();


const hoverTargets = document.querySelectorAll("a, button, .flex-box");

hoverTargets.forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursorOuter.style.transform = "translate(-50%, -50%) scale(1.5)";
    cursorOuter.style.borderColor = "#ff6bb5";
  });
  el.addEventListener("mouseleave", () => {
    cursorOuter.style.transform = "translate(-50%, -50%) scale(1)";
    cursorOuter.style.borderColor = "#e88bba";
  });
});




const cart = JSON.parse(localStorage.getItem("cart")) || [];
document.querySelectorAll(".flex-boxbottom button").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const item = {
      id: index,
      name: btn.previousElementSibling.textContent,
      price: "$10"
    };
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart: " + item.name);
  });
});


document.querySelectorAll(".flex-boxtop img").forEach(img => {
  img.style.cursor = "pointer";
  img.addEventListener("click", () => {
    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    `;
    const bigImg = document.createElement("img");
    bigImg.src = img.src;
    bigImg.style.cssText = "max-width: 80vw; max-height: 80vh; border: 10px solid white; border-radius: 10px;";
    overlay.appendChild(bigImg);
    document.body.appendChild(overlay);
    overlay.addEventListener("click", () => overlay.remove());
  });
});
