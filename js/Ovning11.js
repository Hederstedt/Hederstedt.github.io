// Write your Javascript code
btnOldWay.addEventListener("click", oldWay);
btnNewWay.addEventListener("click", newWay);
function oldWay() {
    let div = document.getElementById("divOutPut")
    let ajax = new XMLHttpRequest();
    ajax.open('get', 'http://forverkliga.se/JavaScript/api/simple.php?world=all');
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            console.log(`Old Way: ${ajax.responseText}`)
            let json = ajax.responseText;
            let jsonobj = JSON.parse(json);
            for (let x in jsonobj) {               
                div.innerHTML += "Continent: " + `${jsonobj[x].continent}` + " Country: " + `${jsonobj[x].name}` + " Population: " + `${jsonobj[x].population}`+ "</br>";
                //let jsoncontent = document.createTextNode(x)
            //div.appendChild(jsoncontent)
            //  { country: 'sverige'}  obj.country
            }
        }
    }
    ajax.send();
}
function newWay() {
    fetch('http://forverkliga.se/JavaScript/api/simple.php?world=all')
  .then(
    function (response) {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
        }

        // Examine the text in the response  
        response.json().then(function (json) {
            console.log(json);
            for (let x in json) {
                let div = document.getElementById("divOutPut")
                //let jsoncontent = document.createTextNode(data)
                //div.appendChild(jsoncontent)
                div.innerHTML += "Continent: " + `${json[x].continent}` + " Country: " + `${json[x].name}` + " Population: " + `${jsonobj[x].population}` + "</br>";
            }
        });
    }
  )
  .catch(function (err) {
      console.log('Fetch Error :-S', err);
  });
}
