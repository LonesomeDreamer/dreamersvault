const body = document.querySelector("body");
const mainNavBar = document.querySelector("#mainNavBar");
const home = document.querySelector("#homeLink");
const footer = document.querySelector("#footer");
const dropdownMenus = document.querySelectorAll(".dropdown-menu");
const topicLinks = document.querySelectorAll(".topic-link");
const dropdownButtons = document.querySelectorAll(".dropdown-list-button");
const mMenuWrapper = document.querySelector("#m-menu-wrapper");
const mMenuBurger = document.querySelector("#m-menu-burger");
const menus = document.querySelectorAll(".topic.dropdown-menu");

/*let a = document.querySelector("html");
let b = document.querySelector("body");
let c = document.querySelector("#mainWindow");
c.innerHTML = "HTML: " + window.getComputedStyle(a).height + "BODY: " + window.getComputedStyle(b).height;

window.addEventListener("resize", event => {
  c.innerHTML = new Date() + "RESIZED HTML: " + window.getComputedStyle(a).height + "BODY: " + window.getComputedStyle(b).height;
  //body.minHeight = screen.height;
})*/

/*window.addEventListener("resize", event => {
  body.style.minHeight = screen.height + "px";
  console.log("HEIGHT", window.getComputedStyle(document.querySelector("body")).minHeight);
  console.log("SCREEN", screen.availHeight);
  //body.minHeight = screen.height;
})*/

mMenuBurger.addEventListener("click", event => {
  if (mMenuWrapper.style.visibility == "visible") {
    mMenuWrapper.style.visibility = "hidden";
    mMenuWrapper.style.height = "0px";
    document.querySelector("#fog").style.display = "none";
    mMenuBurger.style.backgroundColor = "#000000";
  } else {
    mMenuWrapper.style.visibility = "visible";
    mMenuWrapper.style.height = "auto";
    document.querySelector("#fog").style.display = "block";
    mMenuBurger.style.backgroundColor = "#222222";
  }
});

dropdownMenus.forEach(menu => {
  const link = menu.querySelector(".topic-link");
  link.addEventListener("touchstart", (event) => {
    const list = link.parentNode.querySelector(".dropdown-list");
    const btn = link.querySelector(".dropdown-list-button");
    if (!btn.contains(event.target)) {
      btn.className = "dropdown-list-button down";
      btn.querySelector("svg").style.transform = "none";
      btn.parentNode.style.color = "#FF0000";
      btn.querySelector("path").style.fill = "#FF0000";
      list.style.visibility = "hidden";
      list.style.height = "0px";
    } else {
      event.preventDefault();
      if (/\bdown\b/.test(btn.className)) {
        btn.className = btn.className.replace(/\bdown\b/, "up");
        btn.querySelector("svg").style.transform = "rotate(180deg)";
        btn.parentNode.style.color = "#FF0000";
        btn.querySelector("path").style.fill = "#FF0000";
        list.style.visibility = "visible";
        list.style.height = "auto";
      } else {
        btn.className = btn.className.replace(/\bup\b/, "down");
        btn.querySelector("svg").style.transform = "none";
        btn.parentNode.style.color = "#FFFFFF";
        btn.querySelector("path").style.fill = "#FFFFFF";
        list.style.visibility = "hidden";
        list.style.height = "0px";
      }
    }
  });
});

window.addEventListener("touchstart", (event) => {
  if (!mMenuBurger.contains(event.target) && !mMenuWrapper.contains(event.target)) {
    menus.forEach(menu => {
      menu.querySelector(".topic-link").style.color = "#FFFFFF";
      menu.querySelector("path").style.fill = "#FFFFFF";
      menu.querySelector("svg").style.transform = "none";
      const list = menu.querySelector(".dropdown-list");
      list.style.visibility = "hidden";
      list.style.height = "0px";
      menu.querySelector(".dropdown-list-button").className = "dropdown-list-button down";
    });
  } else if (mMenuWrapper.contains(event.target)) {
    let inactiveMenus = Array.from(menus).filter(menu=> !menu.contains(event.target));
    inactiveMenus.forEach(menu => {
      menu.querySelector(".topic-link").style.color = "#FFFFFF";
      menu.querySelector("path").style.fill = "#FFFFFF";
      const list = menu.querySelector(".dropdown-list");
      list.style.visibility = "hidden";
      list.style.height = "0px";
      menu.querySelector(".dropdown-list-button").className = "dropdown-list-button down";
    });
  }
});

window.addEventListener("click", (event) => {
  let width = parseInt(window.getComputedStyle(body).width);
  if ((width < 601) && !mMenuBurger.contains(event.target) && !mMenuWrapper.contains(event.target)) {
    mMenuBurger.style.backgroundColor = "#000000";
    mMenuWrapper.style.visibility = "hidden";
    mMenuWrapper.style.height = "0px";
    document.querySelector("#fog").style.display = "none";
  }
});
