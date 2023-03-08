/*document.querySelector('form input[type="button"]').addEventListener("click", function(){
    let valid = true;
    for(let input of document.querySelectorAll("form input, form text")) {
        valid = valid && input.reportValidity();
        if(!valid) {
            break;
          }
        }
        if(valid) {
          alert('Connexion');
        }
});*/
let btnConnect = document.getElementById('login-btn-connect');
btnConnect.addEventListener("click", connectUser);


  function connectUser() {
    localStorage.setItem('token', '');
    let user = {
      email: document.getElementById('login-email').value,
      password: document.getElementById('login-password').value
    };
      
      fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
      })
      .then(function(response){
        return response.json()
      })
    
      .then(function(data) {
        console.log(data);
        if (typeof data.token !== 'undefined') {
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('token', data.token);
        if (localStorage.getItem('token') !== '') {
          window.location.href = "index.html";
        } else {
          alert('not ok');
        }    
      } else {
        alert('identifiants incorrects')
      }
      });
  };