const loadPhone = async(searchedTxt = 13, isShowALl) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchedTxt}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    showPhones(phones, isShowALl);

}

const showPhones = (phones, isShowALl) =>{
    // console.log(phones);
    const showAllContainer = document.getElementById("show_allContainer");

    if(phones.length > 12){
        showAllContainer.classList.remove("hidden");
    }
    else{
        showAllContainer.classList.add("hidden");
    }

    // console.log("IS show all", isShowALl);
    if(!isShowALl){
        phones = phones.slice(0, 15);
    }
    
   

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
                <img src="${phone.image}" class="h-auto w-auto" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${phone.phone_name}</h2>
                <h3 class = "text-2xl text-cyan-900 font-semibold">${phone.brand}</h3>
                <p class = "text-slate font-extralight text-xl">${phone.slug}</p>
                <button onclick = "shwoDetails('${phone.slug}')" class="btn px-10 bg-blue-500 hover:bg-blue-600 text-white tracking-widest mt-10 rounded-md">Show Details</button>
            </div>
        `;

        //Append this new created div on his parent div
        phoneContainer.appendChild(phoneCard);
    });

    loadingSpinner(false);
}

const shwoDetails = async(id) =>{
    // console.log("Cliciked show derails", id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    // console.log(data);
    const phone = data.data;
    showModalDetails(phone);
}

const showModalDetails = (phone) => {
    // console.log(phone);
    const phonedetailsContainer = document.getElementById("phoneDetailsContainer");
    phonedetailsContainer.innerHTML = `
    
            <div class = "mx-auto text-start">
                <figure class="px-10 pt-10 pb-6 mb-6 rounded-md bg-green-100">
                    <img src="${phone.image}" class="h-auto mx-auto w-auto" />
                </figure>
                <h3 class="font-bold text-2xl text-slate mb-5"> ${phone.name} </h3>

                <p class= "text-slate-600  text-lg"> It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</p>

                <h3 class ="text-slate text-xl font-bold mt-5">Display Size: <span class="text-slate-500 font-normal"> ${phone.mainFeatures.storage} </span></h3>

                <h3 class ="text-slate text-xl font-bold mt-5">Storage: <span class="text-slate-500 font-normal"> ${phone.mainFeatures.displaySize} </span></h3>

                <h3 class ="text-slate text-xl font-bold mt-5">Chipset: <span class="text-slate-500 font-normal"> ${phone.mainFeatures.chipSet} </span></h3>

                <h3 class ="text-slate text-xl font-bold mt-5">Memory: <span class="text-slate-500 font-normal"> ${phone.mainFeatures.memory} </span></h3>

                <h3 class ="text-slate text-xl font-bold mt-5">Slug: <span class="text-slate-500 font-normal"> ${phone.slug} </span></h3>

                
                <h3 class ="text-slate text-xl font-bold mt-5">Release data: <span class="text-slate-500 font-normal"> ${phone.releaseDate} </span></h3>

                <h3 class ="text-slate text-xl font-bold mt-5">Brand: <span class="text-slate-500 font-normal"> ${phone.brand} </span></h3>

                <h3 class ="text-slate text-xl font-bold mt-5">GPS: <span class="text-slate-500 font-normal"> ${phone.others.GPS} </span></h3>

                <div class = "text-end">
                    <button class="btn bg-rose-600 hover:bg-rose-700 text-white px-10 rounded-md">Close</button>
                </div>

            </div>
    
    `;

    showDetailsModal.showModal()
}

const searchHandle = (isShowALl) =>{
    // console.log("Searched");
    loadingSpinner(true);
    const searcField = document.getElementById("searcField");
    const searchedTxt = searcField.value;
    // console.log(searchedTxt);
    loadPhone(searchedTxt, isShowALl);


    searcField.value = '';
}


const loadingSpinner = (isLoading) =>{
    const spiner = document.getElementById('loading_Spinner');
    if(isLoading){
        spiner.classList.remove("hidden");
    }
    else{
        spiner.classList.add("hidden");
    }
}




const handleShowAll = (isShowALl) =>{
    searchHandle(true);
}



loadPhone();
// const searHandleTwo = () =>{
//     const searchFieldTwo = document.getElementById("searcFieldTwo");
//     const searchfieldtext = searchFieldTwo.value;
//     loadPhone(searchfieldtext);

//     searchFieldTwo.value = "";

// }
