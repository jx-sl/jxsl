

const availableLangs = ["de", "pt", "en"]

function loadLangButtons(){
    availableLangs.forEach(function(lang){
        let aField = document.createElement('a');
        let linkText = document.createTextNode(lang);
        aField.appendChild(linkText);
        aField.title = lang;
        const absUrl = window.location.pathname;
        aField.href = absUrl + "?lang=" + lang;
        document.getElementById("langButtons").append(" ");
        document.getElementById("langButtons").appendChild(aField);
        document.getElementById("langButtons").append(" ");
    });
}

function setLanguage() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const lang = urlParams.get('lang');
    if (lang != undefined && availableLangs.includes(lang)) {
        loadJSON(setLangData, lang);
    }
}

function setLangData(langFileContent){
    let jsonData = JSON.parse(langFileContent);
    Object.keys(jsonData).forEach(function(key){
        let text = jsonData[key];
        document.getElementById(key).innerText = text;
    });
}

function loadJSON(callback, fileName) {
    let request = new XMLHttpRequest();
    request.overrideMimeType("application/json");
    request.open('GET', "static/lang/" + fileName + ".json", true);
    request.onreadystatechange = function () {
          if (request.readyState == 4 && request.status == "200") {
            callback(request.responseText);
          }
    };
    request.send(null);
 }

window.onload = function (){
   setLanguage();
   loadLangButtons();
}