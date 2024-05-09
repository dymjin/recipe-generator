// console.log(window.location.href)
const submit = document.getElementById("submit");
const title = document.getElementById("title");
const desc = document.getElementById("desc");
// const params = new URL(window.location.href).searchParams;

function setStorage(item, src) {
  if (localStorage.getItem(item)) {
    localStorage.setItem(item, src);
  } else {
    localStorage.setItem("test", "");
  }
}

// const whatsappLink = encodeURI("https://wa.me/?text=urlencodedtext");

window.onload = () => {
  // title.value = params.get("recipeTitle");
  setStorage("test", params.get("recipeTitle"));
  setStorage("recipe_link", new URL(window.location.href));
  // console.log(JSON.stringify(new URL(window.location.href)));
};
const whatsappLink = document.querySelector(".share");

[title, desc].forEach((input) =>
  input.addEventListener("input", () => {
    const msg = encodeURIComponent(
      `_*${title.value}*_\n\n*Description*\n${desc.value}`
    );
    whatsappLink.href = `https://wa.me/?text=${msg}`;
  })
);
