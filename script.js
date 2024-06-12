const wrapper = document.querySelector(".wrapper"),
inputpart = wrapper.querySelector(".input-part"),
infotxt = inputpart.querySelector(".info-txt"),
inputfield = inputpart.querySelector(".input"),
locationBtn = inputpart.querySelector(".button"),
wIcon = Document.querySelector(".weather-part img")
arrowBack = document.querySelector("header i")
let api;

inputfield.addEventListener("keyup", e => {
    if(e.key == "Enter" && inputfield.value != ""){
        requestApi(inputfield.value)
    }
})

locationBtn.addEventListener("click", ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }else{
        console.log("Tarayıcınız geolocation'ı desteklemiyor...")
    }
})

function onSuccess(position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid={API key}`;
    fetchData()
}

function onError(error){
    infotxt.innerText = error.message
    infotxt.classList.add("error")
}

function requestApi(city){
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid={c789fd688a17c6caf351c480620e43e0}`;
    fetchData()
}

function fetchData(){
    infotxt.innerText = "Sonuçlar Getiriliyor..."
    infotxt.classList.add("pending")
    fetch(api).then(Response => Response.json()).then(result => weatherDetails(result))
}

function weatherDetails(info){
    if(info.cod =="404"){
        infotxt.classList.replace("pending" ,"error")
        infotxt.innerText = `${inputField.value} şehri bulunamadı...`
    }else{
        const city = info.name
        const country = info.sys.country
        const {description, id} = info.weather[0]
        const {feeels_like, humididy, temp} = info.main

        if(id==800){
            wIcon.src ="icons/clear.svg"
        }else if(id => 200 && id <= 232){
            wIcon.src = "icons/storm.svg"
        }else if(id => 600 && id <= 622){
            wIcon.src = "icons/snow.svg"
        }else if(id => 701 && id <= 781){
            wIcon.src = "icons/haze.svg"
        }else if(id => 801 && id <= 804){
            wIcon.src = "icons/cloud.svg"
        }else if(id => 300 && id <= 321 || (id => 500 && id <= 531)){
            wIcon.src = "icons/rain.svg"
        }

        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp)
        wrapper.querySelector(".weather").innerText = description
        wrapper.querySelector(".location").innerText = `${city}, ${country}`
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feeels_like)
        wrapper.querySelector(".humididy span").innerText = `${humididy}%`


        infotxt.classList.remove("pending" ,"error")
        wrapper.classList.add("active")
       
    }

 
}

arrowBack.addEventListener("click", () => {
    wrapper.classList,remove("active")
})
