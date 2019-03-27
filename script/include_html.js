require("fs");

function includeHTML(page, id) {
  fetch(page)
    .then(data => data.text())
    .then(html => document.getElementById(id).innerHTML = html)
    .catch(error => {
      console.log(error);
    });
}
