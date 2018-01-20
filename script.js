allSubtitles = [
  "Sabia que esse subtitulo é aleatório?",
  "Se jogar thiagola92 no google, talvez encontra muita coisa sobre mim",
  "Eu tento ser sincero o máximo que dá..."
]

onload = startingWebsite

function startingWebsite() {
  subtitle();
  defineAge();
  hideEverySecret();
}

function subtitle() {
  randomSubtitle = (Math.random()*100) % allSubtitles.length;
  randomSubtitle = parseInt(randomSubtitle);

  subtitle = document.getElementById("subtitle");
  subtitle.innerHTML = allSubtitles[randomSubtitle];
}

function defineAge() {
  dayBorn = 9;
  monthBorn = 11;
  yearBorn = 1992;

  dateBorn = new Date();
  dateBorn.setFullYear(yearBorn, monthBorn - 1, dayBorn); // months go from 0 to 11, decrease 1 from your birthday

  age = calculateAge(dateBorn);
  ageElement = document.getElementById("age");
  ageTextNode = document.createTextNode(age);

  ageElement.appendChild(ageTextNode);
}

function calculateAge(dateBorn) {
  today = new Date();

  maxAge = today.getFullYear() - dateBorn.getFullYear();

  if(today.getMonth() < dateBorn.getMonth())
    return maxAge - 1;

  if(today.getMonth() == dateBorn.getMonth() && today.getDate() < dateBorn.getDate())
    return maxAge - 1;

  return maxAge;
}

function hideEverySecret() {
  allSecrets = document.getElementsByClassName("secret");
  for(var i = 0; i < allSecrets.length; ++i) {
    allSecrets[i].addEventListener("mouseover", showSecret);
    allSecrets[i].addEventListener("mouseout", hideSecret);
  }
}

function showSecret(event) {
  secret = event.target;
  secret.style["color"] = "black";
}

function hideSecret(event) {
  secret = event.target;
  secret.style["color"] = "white";
}
