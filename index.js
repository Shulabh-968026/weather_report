window.addEventListener('load',()=>{
    let long;
    let lat;
    let timezone=document.querySelector(".location-timezone");
    let temperature_degree=document.querySelector(".temperature-degree");
    let temperature_description=document.querySelector(".temperature-description");
    let icon=document.getElementById("icon");

    function tempConvertor(temp){
        return temp-273.15;
    }

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long=position.coords.longitude
            lat=position.coords.latitude
            const metric="Celsius";
            const API_key="5f0fb963222fc6102624e9993a9e66c1"
            const api=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=${metric}&appid=${API_key}`;
            fetch(api).then(response=>response.json())
        .then(data=>{
            timezone.innerHTML=data.timezone;
            temperature_degree.innerHTML=tempConvertor(data.current.temp).toFixed(2);
            temperature_description.innerHTML=data.current.weather[0].description.toUpperCase();
            icon.src="http://openweathermap.org/img/wn/"+data.current.weather[0].icon+".png";
            icon.title=data.current.weather[0].main
            icon.alt=data.current.weather[0].main;
            console.log(data)
        })
        });
        
    }
})