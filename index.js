
const root = document.querySelector('.row');
const search = document.querySelector('.search');
const loader = document.querySelector('.lds-roller')
const api = "https://api.spaceflightnewsapi.net/v3/articles";
let data = [];

async function fetchApi(url){
    try{
        let response = await fetch(url);
        if(response.status === 200){
        data = await response.json();
        renderData(data)
        console.log(data);
    }
    }catch(error){
        console.log(error);
    }
}
fetchApi(api)

function renderData(e){
    loader.style= "display: none"

    root.textContent=''; 
    if(e.length){
        const fragment = document.createDocumentFragment();
        e.forEach((element) => {
            const card = document.createElement('div');
            card.className = 'card col-lg-3'
            card.innerHTML = `
            <img class='card-img' src=${element.imageUrl} alt=${element.title}>
            <h3 class='card-title'>${element.title.slice(0,30)}</h3>
            <p class='card-text'>${element.summary.slice(0,50)}...</p>
            <p class='card-text2'>${element.summary}</p>
            <button class='readBtn'>reade more</button>
            `;
            fragment.appendChild(card)
        });
        root.appendChild(fragment)
    }
}

search.addEventListener('input',(e)=>{
    let serchData = data.filter((element)=>
    element.title.toLowerCase().includes(search.value.toLowerCase())
    )
    renderData(serchData)
})


root.addEventListener('click',(e) =>{
    if(e.target.closest(".readBtn"))
    e.target.previousElementSibling.previousElementSibling.style='display:none';
    e.target.previousElementSibling.style='display:block';

})