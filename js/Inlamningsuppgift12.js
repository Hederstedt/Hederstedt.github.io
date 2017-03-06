btnNewWay.addEventListener("click", newWay);
let lista = document.getElementById("Listan")
let li = document.createElement('li')
let li2 = document.createElement('li')
let li3 = document.createElement('li')
let li4 = document.createElement('li')
let li5 = document.createElement('li')
let apiData = [];
function newWay() {
    fetch('https://forverkliga.se/JavaScript/api/simple.php?world=all')
  .then(
    function (response) {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
        }

        response.json()
            .then(function (json) {
            apiData = json;
            let totalpop = 0;
            let totalpopEuro = 0;
            let totalpopAsia = 0;
            let totalpopOceania = 0;
            let totalpopNa = 0;
            let totalpopSa = 0;
            let totalpopAfrica = 0;
            let femaleZimbabwe = 0;
            let lowestpop = 100000000;
            let lowestpopName = "";
            let continentpop = [];
            let continentNamen = "";
            apiData.forEach(element => {
                totalpop += parseInt(element.population);
                if (element.continent == "Europe") {
                        totalpopEuro += parseInt(element.population)
                    }
                    if (element.name == "Zimbabwe") {
                        let num = parseInt(element.population * element.pFemale);
                        femaleZimbabwe = num;
                    }
                if(element.population <= lowestpop){
                lowestpop = parseInt(element.population);
                lowestpopName = element.name;    
                }
                switch(element.continent){
                    case "Europe":
                        totalpopEuro += parseInt(element.population);
                        break;
                    case "Oceania":
                        totalpopOceania += parseInt(element.population);
                        break;                 
                    case "Asia":
                        totalpopAsia += parseInt(element.population);
                        break;                       
                    case "South America":
                        totalpopSa += parseInt(element.population);
                        break;                       
                    case "Africa":
                        totalpopAfrica += parseInt(element.population);
                        break;                       
                    case "North America":
                        totalpopNa += parseInt(element.population);
                        break;
                }
                                                                   
            });
            li.appendChild(document.createTextNode("svar:    " + totalpop));
            li2.appendChild(document.createTextNode("svar: " + totalpopEuro));
             li3.appendChild(document.createTextNode("svar: " + femaleZimbabwe));
             li4.appendChild(document.createTextNode("svar: " + lowestpopName + " så här många är dom " + lowestpop));
            continentpop.push([totalpopEuro, "Europe"], [totalpopNa, "North America"], [totalpopOceania, "Oceania"], [totalpopSa, "South America"], [totalpopAfrica, "Africa"], [totalpopAsia, " Asia "]);
            continentpop.sort(function (a, b) { return b[0] - a[0] });
            li5.appendChild(document.createTextNode("svar: " + continentpop[0]));
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
