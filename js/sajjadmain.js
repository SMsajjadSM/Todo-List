document.querySelector(".add-task-button").addEventListener("click", () => {
  document.querySelector(".todos").style.top = "150px";
  document.querySelector(".container").style.filter = "blur(10px)";
});
document.querySelector(".btn-cancel").addEventListener("click", () => {
  document.querySelector(".todos").style.top = "-250px";
  document.querySelector(".container").style.filter = "blur(0px)";
});
