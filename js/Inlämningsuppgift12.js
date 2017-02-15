// Write your Javascript code
btnNewWay.addEventListener("click", newWay);
let lista = document.getElementById("Listan")
let li = document.createElement('li')
let li2 = document.createElement('li')
let li3 = document.createElement('li')
let li4 = document.createElement('li')
let li5 = document.createElement('li')
function newWay() {
    fetch('http://forverkliga.se/JavaScript/api/simple.php?world=all')
  .then(
    function (response) {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
        }

        response.json()
            .then(function (json) {
                let totalpop = 0;
                let totalpopEuro = 0;
                let totalpopAsia = 0;
                let totalpopOceania = 0;
                let totalpopNa = 0;
                let totalpopSa = 0;
                let totalpopAfrica = 0;
                let femaleZimbabwe = 0;
                let lowestpop = [];
                let continentpop = [];
                let div = document.getElementById("divOutPut")
                let txt = "";
                for (let x in json) {
                    totalpop += parseInt(`${json[x].population}`)
                    if (`${json[x].continent}` == "Europe") {
                        totalpopEuro += parseInt(`${json[x].population}`)
                    }
                    if (`${json[x].continent}` == "Oceania") {
                        totalpopOceania += parseInt(`${json[x].population}`);
                    }
                    if (`${json[x].continent}` == "Asia") {
                        totalpopAsia += parseInt(`${json[x].population}`);
                    }
                    if (`${json[x].continent}` == "South America") {
                        totalpopSa += parseInt(`${json[x].population}`);
                    }
                    if (`${json[x].continent}` == "Africa") {
                        totalpopAfrica += parseInt(`${json[x].population}`);
                    }
                    if (`${json[x].continent}` == "North America") {
                        totalpopNa += parseInt(`${json[x].population}`);
                    }
                    if (`${json[x].name}` == "Zimbabwe") {
                        let num = parseInt(`${json[x].population}` * `${json[x].pFemale}`);
                        femaleZimbabwe = num;
                    }
                    lowestpop.push(`${json[x].population}`, `${json[x].name}`)

                }
                continentpop.push([totalpopEuro, "Europe"], [totalpopNa, "North America"], [totalpopOceania, "Oceania"],
                                    [totalpopSa, "South America"], [totalpopAfrica, "Africa"], [totalpopAsia, "Asia"]);
                lowestpop.sort(function (a, b) { return a[0] - b[0] });
                continentpop.sort(function (a, b) { return b[0] - a[0] });
                li.appendChild(document.createTextNode("Hur många människor finns det i hela världen? svar: " + totalpop));
                li2.appendChild(document.createTextNode("Hur många människor finns i Europa?  svar: " + totalpopEuro));
                li3.appendChild(document.createTextNode("Hur många kvinnor finns det i Zimbabwe?  svar: " + femaleZimbabwe));
                li4.appendChild(document.createTextNode("Vilket land har minst befolkning?  svar: " + lowestpop[0]));
                li5.appendChild(document.createTextNode("Vilken kontinent har högst befolkning?  svar: " + continentpop[0]));
                lista.appendChild(li);
                lista.appendChild(li2);
                lista.appendChild(li3);
                lista.appendChild(li4);
                lista.appendChild(li5);
            });
        document.getElementById('btnNewWay').disabled = true;       
    }
     
  )
  .catch(function (err) {
      console.log('Fetch Error :-S', err);
  });
}
