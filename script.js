console.log("Loading script.js");

onload = startingWebsite

function startingWebsite() {
  console.log("Starting website");

  document.getElementById("secret").addEventListener("mouseover", showSecret);
  document.getElementById("secret").addEventListener("mouseout", hideSecret);
}

function showSecret() {
  console.log("Showing secret");
  
}

function hideSecret() {
  console.log("Hiding secret");

}
