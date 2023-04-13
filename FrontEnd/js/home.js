let tabSet = [];
let figure;
let image;
let figcaption;
let figcaptionContent;

function sortCategories(categoryId) {
    let btns = document.querySelectorAll(".btn-filters")
    for(let i = 0; i < btns.length; i++) {
    btns[i].classList.remove("btn-active");
    }
    btns[categoryId].classList.add("btn-active");
    for (let i = 1; i < tabSet.length; i++) {
    let elements = document.querySelectorAll("figure[categoryId='"+i.toString()+"']")
    if (i == categoryId || categoryId == 0) {
        elements.forEach(element => {
            element.style.display = 'block';
        });
    } else {
        elements.forEach(element => {
            element.style.display = 'none';
        });
    }
}}


class Works{
    constructor(dataWorks){
        dataWorks && Object.assign(this, dataWorks);
    }
};

class WorksManager{
    constructor(listWorks){
        this.listWorks = listWorks;
    }
}

function refreshListProjects() {

fetch('http://localhost:5678/api/works')
    .then(data => data.json())
    .then(dataListWorks => {
        const gallery = document.getElementById('gallery');
        gallery.innerHTML = "";
        for(let dataWorks of dataListWorks){
            let works = new Works(dataWorks);
            
            figure = document.createElement("figure");
            figure.setAttribute("class", works.category.name);
            figure.setAttribute("id", `${works.id}`);
            figure.setAttribute("categoryId", `${works.categoryId}`);
            gallery.append(figure);
            image = document.createElement('img');
            figure.appendChild(image);
            let img = image;
            img.src = `${works.imageUrl}`;
            img.crossOrigin = "anonymous";
            figcaption = document.createElement("figcaption");
            figure.appendChild(figcaption);
            figcaptionContent = document.createTextNode(`${works.title}`)
            figcaption.appendChild(figcaptionContent);
            if (typeof tabSet[works.categoryId] === "undefined"){
                tabSet[works.categoryId] = new Set();
            } 
            tabSet[works.categoryId].add(works.id)
        };

    });
}
refreshListProjects();

    class Categories{
        constructor(dataCategories){
            dataCategories && Object.assign(this, dataCategories);
        }
    };
    
    class CategoriesManager{
        constructor(listCategories){
            this.listCategories = listCategories;
        }
    }

    fetch('http://localhost:5678/api/categories')
    .then(data => data.json())
    .then(dataListCategories => {
        const buttonAll = document.createElement('button');
        buttonAll.setAttribute("id", 0);
        buttonAll.setAttribute("class", "btn-filters btn-active");
        buttonAll.onclick = function() {sortCategories(0)};
        document.getElementsByClassName('filters')[0].append(buttonAll);
        const buttonAllValue = document.createTextNode('Tous');
        buttonAll.appendChild(buttonAllValue);

        for(let dataCategories of dataListCategories){
            let categories = new Categories(dataCategories);
            button = document.createElement('button');
            document.getElementsByClassName('filters')[0].append(button);
            button.setAttribute("id", categories.id);
            button.setAttribute("class", "btn-filters");
            button.onclick = function() {sortCategories(categories.id)};
            const buttonValue = document.createTextNode(categories.name);
            button.appendChild(buttonValue);  
    }
})

window.addEventListener('load', function() {
    if (localStorage.getItem('token') !== '') {
        let editMode = document.getElementById('edit-mode');
        editMode.style.display = 'flex';
        let editProjects = document.getElementById("edit-projects");
        editProjects.style.display = 'flex';
        let logLink = document.getElementById('log-link');
        logLink.innerText = 'logout';
        let btnFilters = document.getElementById('filters');
        btnFilters.style.display = 'none';
        logLink.onclick = function() {
            localStorage.setItem('token', '');
            window.location.href = "index.html";
        }
    }
    else {
        let logLink = document.getElementById('log-link');
        logLink.innerText = 'login';
    }
});