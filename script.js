//console.log("Loading script.js");

onload = startingWebsite

function startingWebsite() {
  //console.log("Starting website");

  allSecrets = document.getElementsByClassName("secret");
  for(var i = 0; i < allSecrets.length; i++) {
    allSecrets[i].addEventListener("mouseover", showSecret);
    allSecrets[i].addEventListener("mouseout", hideSecret);
  }
}

function showSecret(event) {
  //console.log("Showing secret");
  secret = event.target;
  secret.style["background-color"] = "white";
}

function hideSecret(event) {
  //console.log("Hiding secret");
  secret = event.target;
  secret.style["background-color"] = "black";
}
