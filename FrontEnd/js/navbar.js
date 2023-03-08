let aProjects = document.createElement("a");
let aContact = document.createElement("a");
let aLogin = document.createElement("a");
let ulist = document.getElementById("nav-bar");
let liProjects = document.createElement("li");
let liContact = document.createElement("li");
let liLogin = document.createElement("li");
let logoInsta = document.getElementById("logo-insta");

aProjects.textContent = "projets";
aProjects.setAttribute('href', "index.html");

aContact.textContent = "contact";
aContact.setAttribute('href', "index.html#contact");

aLogin.textContent = "login";
aLogin.setAttribute('href', "login.html");

liProjects.appendChild(aProjects);
ulist.appendChild(liProjects);

liContact.appendChild(aContact);
ulist.appendChild(liContact);

liLogin.appendChild(aLogin);
ulist.appendChild(liLogin);

ulist.appendChild(logoInsta);
liLogin.after(logoInsta);

const navLink = document.querySelectorAll("#nav-bar a");
const windowPathname = window.location.pathname;

navLink.forEach(navLink => {
    if (navLink.href.includes(windowPathname)) {
        navLink.classList.add('active');
    }
    if (navLink.href.includes("index")) {
        navLink.classList.remove('active');
    }
})
