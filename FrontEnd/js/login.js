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
        }
        } else {
          let email = document.getElementById('login-email');
          let password = document.getElementById('login-password');
          if (email.value == "" || password.value == "" && email.value !== user[email.value] || password.value !== user[password.value]) {
            let errorId = document.getElementById('error-id');
            errorId.style.display = "block";
            errorId.innerHTML="Erreur d'authentification, veuillez vérifier l'email ou le mot de passe";  
                   email.focus(); 
                   password.focus(); 
                   return false;                 
          }
        }
      });
  };