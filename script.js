//console.log("Loading script.js");

onload = startingWebsite

function startingWebsite() {
  //console.log("Starting website");

  defineAge();
}

function defineAge() {
  today = new Date();
  birthdayDate = new Date();

  birthdayDate.setFullYear(1992, 10, 9); // 12
  ageNumber = today.getFullYear() - birthdayDate.getFullYear();

  if(today.getMonth() <= birthdayDate.getMonth() || today.getDate() <= birthdayDate.getDate)
    ageNumber--;

  birthday = document.getElementById("birthday");
  birthday.innerHTML = birthdayDate.getDate() + "/" + (birthdayDate.getMonth()+1) + "/" + birthdayDate.getFullYear();

  age = document.getElementById("age");
  age.innerHTML = ageNumber + " anos";
}
