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

function refreshListProjectsInModal() {

fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
        modalGallery.innerHTML = "";
        data.forEach(projects => {
            const modalFigure = document.createElement('figure');
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
            icon.onclick = function(event) {
                event.preventDefault();
                deleteProject(projects.id)
                .then(() =>{
                    modal.style.display = "none";
                })
                .catch((error) => {
                    console.error(error);
                });
            };
            modalFigure.appendChild(icon);
        }
    );
});

};

async function deleteProject(projectId) {
    const response = await fetch(`http://localhost:5678/api/works/${projectId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('token') 
            }
        });
if (!response.ok) {
    throw new Error('une erreur est survenue');
}
refreshListProjectsInModal();
refreshListProjects();
}

refreshListProjectsInModal();

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
btnDeleteGallery.textContent = "Supprimer la galerie";
editBtnsArea.appendChild(btnDeleteGallery);

const modalAddProject = document.createElement('form');
modalAddProject.setAttribute('id', 'modal-add-project');
modalContainer.appendChild(modalAddProject);

const addProjectTitle = document.createElement('h2');
addProjectTitle.textContent = "Ajout Photo";
modalAddProject.appendChild(addProjectTitle);

const divImgPreview = document.createElement('div');
divImgPreview.setAttribute('id', 'div-img-preview');
modalAddProject.appendChild(divImgPreview);

const divAddFile = document.createElement('div');
divAddFile.setAttribute('id', 'container-add-file');
modalAddProject.appendChild(divAddFile);

const divImgIcon = document.createElement('div');
divImgIcon.setAttribute('id', 'div-img-icon');
const imgIcon = document.createElement('i');
imgIcon.setAttribute('class', 'fa-sharp fa-regular fa-image');
imgIcon.setAttribute('id', 'img-icon');
divAddFile.appendChild(divImgIcon);
divImgIcon.appendChild(imgIcon);

const inputFile = document.createElement('input');
inputFile.type = 'file';
inputFile.setAttribute('id', 'input-add-file');
divAddFile.appendChild(inputFile);

const btnAddProject = document.createElement('button');
btnAddProject.textContent = "+ Ajouter Photo";
btnAddProject.setAttribute('id', 'btn-add-project');
divAddFile.appendChild(btnAddProject);

document.getElementById('btn-add-project').addEventListener('click', () => {
    document.getElementById('input-add-file').click();
});

inputFile.addEventListener('change', () => {

    divAddFile.style.display = "none";
    divImgPreview.style.display = "block";
    
    const imgPreview = document.createElement('img');
    imgPreview.setAttribute('id', 'img-preview');
    const file = inputFile.files[0];
    const url = URL.createObjectURL(file);
    imgPreview.setAttribute('src', url);
    
    divImgPreview.appendChild(imgPreview);    
});

const sizeRequired = document.createElement('div');
sizeRequired.textContent = "jpg, png : 4mo max";
sizeRequired.setAttribute('id', 'size-required')
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

const selectCategory = document.createElement('select');
selectCategory.required = true;
selectCategory.setAttribute('class', 'input-add-project');
selectCategory.setAttribute('id', 'input-select-category');
divCategoryElement.appendChild(selectCategory);

const option0 = document.createElement('option');
option0.setAttribute('id', 'disabled-option');
option0.value = '';
option0.text = '';
selectCategory.add(option0, null);

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

const hraddProject = document.createElement('hr');
hraddProject.setAttribute('id', 'hr-add-project');
modalAddProject.appendChild(hraddProject);

const btnValid = document.createElement('input');
btnValid.setAttribute('id', 'btn-valid-project');
btnValid.type = 'submit';
btnValid.value = "Valider";
btnValid.disabled = true;
modalAddProject.appendChild(btnValid);

inputFile.addEventListener('change', checkFormValidity);
inputTitle.addEventListener('input', checkFormValidity);
selectCategory.addEventListener('change', checkFormValidity);

function checkFormValidity() {
    if (inputFile.files.length > 0 && inputTitle.value.trim() !== '' && selectCategory.value !== '') {
        btnValid.disabled = false;
    } else {
        btnValid.disabled = true;
    }
}

modalAddProject.onsubmit = function(event) {
    event.preventDefault();
    addProject()
    .then(() =>{
        modal.style.display = "none";
        modalAddProject.reset();
        inputFile.value = "";
        let imgPreview = document.getElementById('img-preview');
        divImgPreview.removeChild(imgPreview);
        divAddFile.style.display ="block";
        btnAddProject.value = "";
    })
    .catch((error) => {
        console.error(error);
    });
};

async function addProject() {
let projectData = new FormData();
projectData.append('image', inputFile.files[0]);
projectData.append('title', inputTitle.value);
projectData.append('category', selectCategory.value);

const response = await fetch("http://localhost:5678/api/works",{
    method:'POST',
    headers:{
        'accept': 'application/json',
        'Authorization': 'Bearer ' + window.localStorage.getItem('token') 
    },
    body: projectData
})
if (!response.ok) {
    throw new Error('une erreur est survenue')
  }
  else {
    refreshListProjectsInModal();
    refreshListProjects();
  }
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
    modalAddProject.style.display = "flex";
    modalContent.style.display= "none";
    backAddProject.style.visibility= "visible";
}

backAddProject.addEventListener('click', function(event) {
  event.preventDefault();
  modalContent.style.display = "block";
  modalAddProject.style.display = "none";
  if (modalContent.style.display = "block") {
    backAddProject.style.visibility = "hidden";
  }
});