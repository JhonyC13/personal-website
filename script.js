const btn = document.querySelector(".expand-btn");
const nav = document.querySelector("nav");

if(btn && nav){
  btn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}
