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


fetch('http://localhost:5678/api/works')
    .then(data => data.json())
    .then(dataListWorks => {
        for(let dataWorks of dataListWorks){
            let works = new Works(dataWorks);
            
            const myContainer = document.createElement("figure");
            document.getElementsByClassName('gallery')[0].append(myContainer);
            const myImage = document.createElement('img');
            myContainer.appendChild(myImage);
            let img = myImage;
            img.src = `${works.imageUrl}`;
            img.crossOrigin = "anonymous";
            const myFigcaption = document.createElement("figcaption");
            myContainer.appendChild(myFigcaption);
            const myFigcaptionContent = document.createTextNode(`${works.title}`)
            myFigcaption.appendChild(myFigcaptionContent);
                        
        };        
    });

    fetch('http://localhost:5678/api/categories')
    .then(data => data.json())
    .then(dataListWorks => {
        for(let dataWorks of dataListWorks){
            let categories = new Categories(dataWorks);
    
        };    
    });
