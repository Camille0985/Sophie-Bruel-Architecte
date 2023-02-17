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


let tabSet = [];
let myContainer;
let myImage;
let myFigcaption;
let myFigcaptionContent;


fetch('http://localhost:5678/api/works')
    .then(data => data.json())
    .then(dataListWorks => {
        for(let dataWorks of dataListWorks){
            let works = new Works(dataWorks);
            
            myContainer = document.createElement("figure");
            myContainer.setAttribute("id", `${works.id}`);
            document.getElementsByClassName('gallery')[0].append(myContainer);
            myImage = document.createElement('img');
            myContainer.appendChild(myImage);
            let img = myImage;
            img.src = `${works.imageUrl}`;
            img.crossOrigin = "anonymous";
            myFigcaption = document.createElement("figcaption");
            myContainer.appendChild(myFigcaption);
            myFigcaptionContent = document.createTextNode(`${works.title}`)
            myFigcaption.appendChild(myFigcaptionContent);
            if (typeof tabSet[works.categoryId] === "undefined"){
                tabSet[works.categoryId] = new Set();
            } 
            tabSet[works.categoryId].add(works.id)
            console.log(myContainer.id);
        };
        
        console.log(tabSet);        
    });


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
    let tabSet2 = [];
    let myFilters;

    fetch('http://localhost:5678/api/categories')
    .then(data => data.json())
    .then(dataListCategories => {
        const allWorks = document.createElement('button');
        document.getElementsByClassName('filters')[0].append(allWorks);
        const allWorksName = document.createTextNode('Tous');
        allWorks.appendChild(allWorksName);
        for(let dataCategories of dataListCategories){
            let categories = new Categories(dataCategories);
            myFilters = document.createElement('button');
            document.getElementsByClassName('filters')[0].append(myFilters);
            const myFiltersName = document.createTextNode(categories.name);
            myFilters.appendChild(myFiltersName);

        };



    })

