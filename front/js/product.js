var url = new URL(document.location.href);

var search_params = new URLSearchParams(url.search); 

if(search_params.has('id')) {
  var id = search_params.get('id');
  console.log(id);
} 

fetch(`http://localhost:3000/api/products/${id}`)
  .then(product => product.json())
  .then(product => {
    console.log(product)
    // affichage des couleurs
    const select = document.getElementById("colors")
    for(color of product.colors) {
      const newoption = document.createElement("option")
      newoption.setAttribute("value", color)
      newoption.innerText = color
      select.appendChild(newoption)
    }
    // affichage du prix
    document.getElementById("price").innerText = product.price
    // affichage du nom
    document.getElementById("title").innerText = product.name
    // affichage de la description
    document.getElementById("description").innerText = product.description
    // affichage de l'image
    const divimg = document.querySelector(".item__img")
    const img = document.createElement("img")
    img.setAttribute("src", product.imageUrl)
    img.setAttribute("alt", product.altTxt) 
    divimg.appendChild(img) 
    })

