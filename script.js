onload = startingWebsite

function startingWebsite() {
  subtitle();
  hideEverySecret();
  defineAge();
}

function subtitle() {
  allSubtitles = [
    "Sabia que esse subtitulo é aleatório?",
    "Se jogar thiagola92 no google, talvez encontra muita coisa sobre mim",
    "Eu tento ser sincero o máximo que dá..."
  ]

  randomSubtitle = (Math.random()*100) % allSubtitles.length;
  randomSubtitle = parseInt(randomSubtitle);

  subtitle = document.getElementById("subtitle");
  subtitle.innerHTML = allSubtitles[randomSubtitle];
}

function hideEverySecret() {
  allSecrets = document.getElementsByClassName("secret");
  for(var i = 0; i < allSecrets.length; i++) {
    allSecrets[i].addEventListener("mouseover", showSecret);
    allSecrets[i].addEventListener("mouseout", hideSecret);
  }
}

function showSecret(event) {
  secret = event.target;
  secret.style["background-color"] = "white";
}

function hideSecret(event) {
  secret = event.target;
  secret.style["background-color"] = "black";
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
