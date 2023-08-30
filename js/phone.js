const loadPhone = async(searchedTxt) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchedTxt}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    showPhones(phones);

}

const showPhones = phones =>{
    // console.log(phones);
    
    const phoneContainer = document.getElementById("phone_container");
    phoneContainer.textContent = "";
    phones.forEach(phone => {
        // console.log(phone);
        //Creating div
        const phoneCard = document.createElement("div");
        //add class on this div
        phoneCard.classList = `px-8 py-6 card w-auto bg-base-50 shadow-2xl`;
        //sect innerHtml
        phoneCard.innerHTML =`

            <figure class="px-10 pt-10 pb-6 rounded-md bg-green-100">
                <img src="${phone.image}" alt="Shoes" class="h-auto w-auto" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${phone.phone_name}</h2>
                <h3 class = "text-2xl text-cyan-900 font-semibold">${phone.brand}</h3>
                <p class = "text-slate-900 font-extralight text-xl">${phone.slug}</p>
            </div>
        `;

        //Append this new created div on his parent div
        phoneContainer.appendChild(phoneCard);
    });
}

const searchHandle = () =>{
    // console.log("Searched");
    const searcField = document.getElementById("searcField");
    const searchedTxt = searcField.value;
    // console.log(searchedTxt);
    loadPhone(searchedTxt);


    searcField.value = '';
}

