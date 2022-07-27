
const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}
function checkEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, `Please provide a valid email`);
  }
}

function checkPasswords(input1) {
    if (input1.value == "") {
      showError(input1, "Passwords don't match");
    }else{
      showSuccess(input1)
    }
  }
  
function getFieldId(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
function onLogin(){

  let newUser = {
      email: email.value,
      password: password.value,
    };

    let users = [];

let userInStringForm = localStorage.getItem("users");
users = JSON.parse(userInStringForm) || [];

var userChk = users.find(function (cheak) {
  return cheak.email.toLowerCase() === newUser.email.toLowerCase() && cheak.password.toLowerCase() ===newUser.password.toLowerCase() 
});
console.log(userChk);

if (userChk) {
  localStorage.setItem("user", JSON.stringify(userChk));
  window.location.href = "./home.html";
} else {
  showError(email, `worng email`);
  showError(password, `worng password`);
}
}
form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkEmail(email);
  checkPasswords(password)
  onLogin()
});

function onLogout() {
  localStorage.removeItem("user");
  setTimeout(() => {
      location.href = "./login.html";
  }, 1000);
}

function toGetUser(){
 let user1 = localStorage.getItem("user")
 user1 = JSON.parse(user1)
 document.getElementById('box').innerHTML= "Wellcome : " + user1.email
}

