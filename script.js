// console.log(window.location.href)
const submit = document.getElementById("submit");
const title = document.getElementById("title");
const params = new URL(window.location.href).searchParams;

function setStorage(item, src) {
  if (localStorage.getItem(item)) {
    localStorage.setItem(item, src);
  } else {
    localStorage.setItem("test", "");
  }
}

// title.onchange = () => {
//   setStorage("test", params.get("recipeTitle"));
// };

// title.onblur = () => {
//   setStorage("test", params.get("recipeTitle"));
// };



window.onload = () => {
  title.value = params.get("recipeTitle");
  setStorage("test", params.get("recipeTitle"));
  setStorage("recipe_link", new URL(window.location.href));
  // console.log(JSON.stringify(new URL(window.location.href)));
};
