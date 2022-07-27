const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
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

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
  return true;
}

// function checkRequired(inputArray) {
//   inputArray.forEach(function (input) {
//     if (input.value === "") {
//       console.log(input.id);
//       showError(input, `${getFieldId(input)} is required`);
//     } else {
//       showSuccess(input);
//       return true;
//     }
//   }
//   );
// }
function checkRequired (input) {
  if (input.value === "") {
    console.log(input.id);
    showError(input, `${getFieldId(input)} is required`);
  } else {
    showSuccess(input);
    return true;
  }
}

function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords don't match");
    return false;
  }else{
    return true;
  }
}

function getFieldId(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function onSingup() {
  let newUser = {
    name: username.value,
    email: email.value,
    password: password.value,
    confirm_password: password2.value,
  };

  let users = [];

  let userInStringForm = localStorage.getItem("users");
  users = JSON.parse(userInStringForm) || [];

  var userChk = users.findIndex(function (val) {
    return val.email.toLowerCase() === newUser.email.toLowerCase();
  });
  console.log(userChk);

 
  if (userChk == -1) {
    users.push(newUser);                                           
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "./html/login.html";
  } else {
    console.log("älready in use");
    showError(email, "This Email Is Already In Use");
  }
}

form.addEventListener("submit", function (e) {                        
  e.preventDefault();
  checkEmail(email);
  if (checkRequired(username),checkRequired(email),checkRequired(password),checkRequired(password2)===true){
    if(checkPasswordsMatch(password,password2) === true){
      onSingup()
    }
  }else{
   alert(123)
  }
})