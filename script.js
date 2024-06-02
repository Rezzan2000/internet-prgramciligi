const wrapper = document.querySelector(".wrapper"),
inputpart = wrapper.querySelector(".input-part"),
infotxt = inputpart.querySelector(".info-txt"),
inputfield = inputpart.querySelector(".input"),
locationBtn = inputpart.querySelector(".button"),

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
    console.log(position)
}

function onError(error){
    console.log(error)
}

function requestApi(city){
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={c789fd688a17c6caf351c480620e43e0}`;
    infotxt.innerText = "Sonuçlar Getiriliyor..."
    infotxt.classList.add("pending")
    fetch(api).then(Response => Response.json()).then(result => weatherDetails(result))
}

function weatherDetails(info){
    console.log(info)
}