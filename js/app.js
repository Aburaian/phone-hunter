const searchButton = () => {
    document.getElementById("phone-area").innerHTML = ""
    document.getElementById("details-container").innerHTML = ""
    const searchPhone = document.getElementById("search-phone").value
    document.getElementById("search-phone").value = ""
    const error = document.getElementById("error")
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchPhone}`
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data.data == null);
            if (data.data == 0 || searchPhone == "") {
                error.innerText = "No Phone Found"
                phoneArea.innerText = ""

            } else {
                displayPhone(data.data)
                error.innerText = "";

            }
        })

}
const displayPhone = (phones) => {
    const phoneData20 = phones.slice(0, 20)
    const phoneArea = document.getElementById("phone-area")
    phoneArea.textContent = ""
    phoneData20.forEach(phone => {
        console.log(phone)
        const div = document.createElement("div")
        div.classList.add("col-lg-4")
        div.classList.add("col-sm-12")
        div.classList.add("my-4")
        div.innerHTML = `
            <div class = "card p-3" style = "width: 25rem;" =>
                    <img src = "${phone.image}" class = "img-thumnail" alt = ".." >
                    <div class = "card-body" >
                        <h3 class = "card-title" > Name: ${phone.phone_name} </h3>
                        <h5 class = "card-text" > Brand: ${phone.brand} </h5>  
                        <button onclick = "phoneDetails('${phone.slug}')" class = "btn btn-primary px-4 py-2"> Details </button>  
                    </div>  
            </div>
        `
        phoneArea.appendChild(div)
    });
}
const phoneDetails = (slugId) => {
    // console.log(details)
    const url = ` https://openapi.programming-hero.com/api/phone/${slugId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data))
}

const displayDetails = (details) => {
    console.log(details)
    const detailsContainer = document.getElementById("details-container")
    detailsContainer.textContent = ""
    const div = document.createElement('div')
    div.classList.add("my-4")
    div.innerHTML = `
             <img src = "${details.image}"
             class = "img-thumnail"
             alt = "..">
            <h2 class = "my-2"> ${details.name} </h2>
            <h3>${details.releaseDate}</h3>
            <h3 class = "my-2">MainFeatures: </h3>
            <ul class = "my-2">
                <li><span class="h6">ChipSet:</span>  ${details.mainFeatures.chipSet}</li>
                <li><span class ="h6">DisplaySize:</span>  ${details.mainFeatures.displaySize}</li>
                <li><span class ="h6">Memory:</span>  ${details.mainFeatures.memory}</li>
                <li><span class ="h6">Storage:</span> ${details.mainFeatures.storage}</li>
                <h4 class = "my-2"> Sensors: </h4>
                <ul>
                    <li> ${details.mainFeatures.sensors[0]}</li> 
                    <li> ${details.mainFeatures.sensors[1]} </li> 
                    <li> ${details.mainFeatures.sensors[2]} </li>
                    <li> ${details.mainFeatures.sensors[3]} </li> 
                    <li> ${details.mainFeatures.sensors[4]} </li> 
                    <li> ${details.mainFeatures.sensors[5]} </li> 
                    <li> ${details.mainFeatures.sensors[6]} </li> 
                </ul>
            </ul>
            <h3 class = "my-2" > Others: </h3>
            <ul>
                <li><span class ="h6">Bluetooth:</span> ${details.others.Bluetooth} </li> 
                <li><span class ="h6">GPS:</span> ${details.others.GPS} </li> 
                <li><span class ="h6">NFC:</span> ${details.others.NFC} </li>
                <li><span class ="h6">Radio:</span> ${details.others.Radio} </li> 
                <li><span class ="h6">USB:</span> ${details.others.USB} </li> 
                <li><span class ="h6">WLAN:</span> ${details.others.WLAN} </li>
            </ul> 
    `
    detailsContainer.appendChild(div)
}