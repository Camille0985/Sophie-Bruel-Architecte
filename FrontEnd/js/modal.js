const modalContainer = document.createElement('div');
modalContainer.setAttribute('id', 'modal-container');
document.getElementsByClassName('modal')[0].append(modalContainer);

const topIconModal = document.createElement('div');
topIconModal.setAttribute('id', 'top-icon-modal');
modalContainer.appendChild(topIconModal);

const backAddProject = document.createElement('span');
backAddProject.setAttribute('class', 'fa-solid fa-arrow-left');
backAddProject.setAttribute('id', 'back-add-project');
topIconModal.appendChild(backAddProject);

const closeModal = document.createElement('span');
closeModal.setAttribute('class', 'fa-solid fa-xmark');
closeModal.setAttribute('id', 'close-modal');
topIconModal.appendChild(closeModal);

const modalContent = document.createElement('div');
modalContent.setAttribute('id', 'modal-content');
modalContainer.appendChild(modalContent);

const modalTitle = document.createElement('h2');
modalTitle.textContent = "Galerie Photo";
modalContent.appendChild(modalTitle);

const modalGallery = document.createElement('div');
modalGallery.setAttribute('id', 'modal-gallery');
modalContent.appendChild(modalGallery);

class Projects{
    constructor(dataProjects){
        dataProjects && Object.assign(this, dataProjects);
    }
};

class ProjectsManager{
    constructor(listProjects){
        this.listProjects = listProjects;
    }
}

fetch('http://localhost:5678/api/works')
    .then(data => data.json())
    .then(dataListProjects => {
        for(let dataProjects of dataListProjects){
            let projects = new Projects(dataProjects);
            const modalFigure = document.createElement('figure');
            modalFigure.setAttribute('id', projects.id);
            modalFigure.setAttribute('class', 'modal-figure');
            modalGallery.appendChild(modalFigure);

            const image = document.createElement('img');
            image.src = projects.imageUrl;
            image.crossOrigin = "anonymous";
            image.setAttribute('class', 'modal-img')
            modalFigure.appendChild(image);
            
            const editSpan = document.createElement('span');
            editSpan.textContent = "éditer";
            modalFigure.appendChild(editSpan);

            const icon = document.createElement('button');
            icon.setAttribute('class', 'fa-solid fa-trash-can');
            //icon.type = "submit";
            icon.onclick = function(event) {
                event.preventDefault();
                deleteProject();
                return false;
            };
            modalFigure.appendChild(icon);
            function deleteProject() {
                if (image) {
                image.remove();
                fetch(`http://localhost:5678/api/works/${projects.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer ' + window.localStorage.getItem('token') 
                        }
                    }
                )
            .then (function() {
                console.log('ok');
            })
                }
            }
        };
    });

const hr = document.createElement('hr');
hr.setAttribute('id', 'hr-modal');
modalContent.appendChild(hr);

const editBtnsArea = document.createElement('div');
editBtnsArea.setAttribute('id', 'edit-btns-area');
modalContent.appendChild(editBtnsArea);

const btnAddPicture = document.createElement('button');
btnAddPicture.setAttribute('id', 'btn-add-picture');
btnAddPicture.textContent = "Ajouter une photo";
editBtnsArea.appendChild(btnAddPicture);

const btnDeleteGallery = document.createElement('button');
btnDeleteGallery.setAttribute('id', 'btn-delete-gallery');
btnDeleteGallery.textContent = "Supprimer la galerie"
editBtnsArea.appendChild(btnDeleteGallery);

const modalAddProject = document.createElement('form');
modalAddProject.setAttribute('id', 'modal-add-project');
modalContainer.appendChild(modalAddProject);

const addProjectTitle = document.createElement('h2');
addProjectTitle.textContent = "Ajout Photo";
modalAddProject.appendChild(addProjectTitle);

const divAddFile = document.createElement('div');
divAddFile.setAttribute('id', 'container-add-file');
modalAddProject.appendChild(divAddFile);

const imgIcon = document.createElement('span');
imgIcon.setAttribute('class', 'fa-sharp fa-regular fa-image');
imgIcon.setAttribute('id', 'img-icon');
divAddFile.appendChild(imgIcon);

const inputFile = document.createElement('input');
inputFile.type = 'file';
inputFile.required = true;
inputFile.setAttribute('id', 'input-add-file');
divAddFile.appendChild(inputFile);

const btnAddProject = document.createElement('button');
btnAddProject.textContent = "+ Ajouter Photo";
btnAddProject.setAttribute('id', 'btn-add-project');
divAddFile.appendChild(btnAddProject);
document.getElementById('btn-add-project').addEventListener('click', () => {
    document.getElementById('input-add-file').click();
});

const sizeRequired = document.createElement('span');
sizeRequired.textContent = "jpg, png : 4mo max";
divAddFile.appendChild(sizeRequired);

const divProjectInfo = document.createElement('div');
divProjectInfo.setAttribute('id', 'container-project-info')
modalAddProject.appendChild(divProjectInfo);

const divTitleElement = document.createElement('div');
divTitleElement.setAttribute('id', 'div-title-element');
divProjectInfo.appendChild(divTitleElement);

const labelTitle = document.createElement('label');
labelTitle.textContent = "Titre";
divTitleElement.appendChild(labelTitle);

const inputTitle = document.createElement('input');
inputTitle.type = 'text';
inputTitle.required = true;
inputTitle.setAttribute('class', 'input-add-project');
inputTitle.setAttribute('id', 'input-text-title');
divTitleElement.appendChild(inputTitle);

const divCategoryElement = document.createElement('div');
divCategoryElement.setAttribute('id', 'div-category-element');
divProjectInfo.appendChild(divCategoryElement);

const labelCategory = document.createElement('label');
labelCategory.textContent = "Catégorie";
divCategoryElement.appendChild(labelCategory);

const inputSelectCategory = document.createElement('select');
inputSelectCategory.required = true;
inputSelectCategory.setAttribute('class', 'input-add-project');
inputSelectCategory.setAttribute('id', 'input-select-category');
divCategoryElement.appendChild(inputSelectCategory);

const option0 = document.createElement('option');
option0.setAttribute('id', 'disabled-option');
option0.value = '';
option0.text = '';
inputSelectCategory.add(option0, null);

    fetch('http://localhost:5678/api/categories')
      .then(response => response.json())
      .then(data => {
        const selectCategory = document.getElementById('input-select-category');
        data.forEach(categories => {
          const option = document.createElement('option');
          option.value = categories.id;
          option.text = categories.name;
          selectCategory.appendChild(option);
        });
      })
      .catch(error => console.error(error));

const btnValid = document.createElement('input');
btnValid.setAttribute('id', 'btn-valid-project');
btnValid.type = 'submit';
btnValid.textContent = "Valider";
modalAddProject.appendChild(btnValid);
modalAddProject.onsubmit = function(event) {
    event.preventDefault();
    alert('ok');
    addProject()
    return false;
};

function addProject() {
let projectData = new FormData();
projectData.append('image', inputFile.files[0]);
projectData.append('title', inputTitle.value);
projectData.append('category', inputSelectCategory.value);

let form = document.getElementById('modal-add-project');
inputFile.addEventListener('input', checkFormValidity);
inputTitle.addEventListener('input', checkFormValidity);
inputSelectCategory.addEventListener('input', checkFormValidity);
btnValid.disabled = true;

function checkFormValidity() {
    if (form.checkValidity()) {
        btnValid.disabled = false;
    } else {
      btnValid.disabled = true;
    }
  }

fetch("http://localhost:5678/api/works",{
    method:'POST',
    headers:{
        'accept': 'application/json',
        'Authorization': 'Bearer ' + window.localStorage.getItem('token') 
    },
    body: projectData
})
.then(function(response){
    return response.json()
  })
};

let modal = document.getElementById('modal');
let btnOpenModal = document.getElementById('edit-projects');

btnOpenModal.onclick = function() {
    modal.style.display = "block";
    modalContainer.style.display = "block";
    modalContent.style.display= "block";
    modalAddProject.style.display= "none";
    backAddProject.style.visibility= "hidden";
}
closeModal.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}

btnAddPicture.onclick = function() {
    modalAddProject.style.display = "block";
    modalContent.style.display= "none";
    backAddProject.style.visibility= "visible";
}
closeModal.onclick = function() {
    modal.style.display = "none";
}
backAddProject.addEventListener('click', function(event) {
  event.preventDefault();
  modalContent.style.display = "block";
  modalAddProject.style.display = "none";
  if (modalContent.style.display = "block") {
    backAddProject.style.visibility = "hidden";
  }
});
window.onclick = function(event) {
    if (event.target == modalAddProject) {
      modal.style.display = "none";
    }
}