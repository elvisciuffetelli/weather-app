
window.onload = function () {

  //get geoposition
  (function getCoordinates() {
    console.log("getCoordinates runs on load");
    if (navigator.geolocation) {
     
    navigator.geolocation.getCurrentPosition(function(position) { 
    lat = position.coords.latitude;
    lon = position.coords.longitude;  
 
    console.log(lat + " " + lon);
    //AJAX function call 
    getData();
    });

    } else {
    console.log("geolocation does not exist.");
    }
    })();

    //put data in the UI
    function meteoDati(data){
      var temp_max = document.getElementById("temp-max");
      var temp_min = document.getElementById("temp-min");
      var location = document.getElementById("location");
      var imgIcon = document.createElement("img");
      var icon = document.getElementById("icon");
      var description = document.getElementById("description");
      var loader = document.getElementById("loader");
      
      loader.innerHTML = "";
      temp_max.innerHTML = `<h5>${data.main.temp_max}° max temperature</h5>`;
      temp_min.innerHTML = `<h5>${data.main.temp_min}° min temperature</h5>`;
      location.innerHTML = `<h2>${data.name}</h2>`;
      description.innerHTML = `<h3>${data.weather[0].main} (${data.weather[0].description})</h3>`;

      // display time
      var timeStamp = document.getElementById("time");
      var res;
      var mainCondition = data.weather[0].main;
      function timeShow() {
        var timeShow = timeStamp.innerHTML = new Date().toLocaleTimeString();    
        res = timeShow.slice(0, 2);
        parseInt(res);
      //Clear case day / night icon
        if (res >= 21 && res <= 06 && mainCondition === "Clear") {
          imgIcon.src = "img/004-moon.png";
          imgIcon.classList.add("icon-prop");
          icon.appendChild(imgIcon);  
        } else if (res <= 21 && res >= 06 && mainCondition === "Clear") {
          imgIcon.src = "img/016-sun.png";
          imgIcon.classList.add("icon-prop");
          icon.appendChild(imgIcon); 
        }    
      }
      setInterval(timeShow, 1000);
    
      
      switch (mainCondition) {    
        case "Rain":
          imgIcon.src = "img/010-raining.png";
          imgIcon.classList.add("icon-prop");
          icon.appendChild(imgIcon); 
            break;
        case "Clouds":
          imgIcon.src = "img/015-cloud.png";
          imgIcon.classList.add("icon-prop");
          icon.appendChild(imgIcon);
            break;
        case "Thunderstorms":
          imgIcon.src = "img/005-storm-1.png";
          imgIcon.classList.add("icon-prop");
          icon.appendChild(imgIcon);
            break;
        case "Snow":
          imgIcon.src = "img/015-cloud.png";
          imgIcon.classList.add("icon-prop");
          icon.appendChild(imgIcon);
            break;
        default: 
          alert("No data");     
      }
         
    }

    //Ajax call
    function getData() {
      fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`)
       .then(res => {
         console.log(res);
         return res.json();    
       })
       .then(data => {
         console.log(data);
         meteoDati(data);
       })
       .catch(err => console.log(err));
     };
    
}




  