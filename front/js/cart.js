async function fetchApi(id){
  return fetch(`http://localhost:3000/api/products/${id}`)
  .then(function(res){
      if(res.ok){
      return res.json();
      }
  })
  .catch(function(error){
      console.log(error);
  })
}

async function displayProduct(panier){
  for (product of panier) {
    product.info = await fetchApi(product.id); 
    const parentNode = document.getElementById("cart__items"); // création du noeud parent

    const articleNode  = document.createElement("article"); // création article  
    articleNode.classList.add("cart__item");
    articleNode.setAttribute("data-id", product.id); // attribut id
    articleNode.setAttribute("data-color", product.color); // attribut  
    

    const divImgNode = document.createElement("divImg"); // création div
    divImgNode.classList.add("cart__item__img"); // attribut img
    articleNode.appendChild(divImgNode)

    const imgNode = document.createElement("img"); // création img
    imgNode.setAttribute("src", product.info.imageUrl); // attribut src
    imgNode.setAttribute("alt", product.info.altTxt); // attribut alt
    divImgNode.appendChild(imgNode)

    const divItemContentNode = document.createElement("divContent");
    divItemContentNode.classList.add("cart__item__content");
    
    const divItemContentDescriptionNode = document.createElement("divDescription");
    divItemContentDescriptionNode.classList.add("cart__item__content__description");
    divItemContentDescriptionNode.setAttribute("Nom du produit").innerText = product.name;
    divItemContentDescriptionNode.setAttribute("Vert", product.color);
    divItemContentDescriptionNode.appendChild(divItemContentNode)

    const divItemContentsettingsNode = document.createElement("divSettings");
    divItemContentsettingsNode.classList.add("cart__item__content__settings");

    const divItemContentQuantityNode = document.createElement("divQuantity");
    divItemContentQuantityNode.classList.add("cart__item__content__quantity");
    divItemContentQuantityNode.setAttribute("Qté : ", product.quantity);
    divItemContentQuantityNode.setAttribute("number", inputType, product.info);
    divItemContentSettingsNode.appendChild(divItemContentQuantityNode)

    const divItemContentSettingsDelete = document.createElement("divDelete");
    divItemContentSettingsDeleteNode.classList.add("cart__item__content__settings__delete");
    divItemContentSettingsDeleteNode.setAttribute("deleteItem", product.info);
    divItemContentsettingsNode.appendChild(divItemContentSettingsDeleteNode)
     
    parentNode.appendChild(articleNode)

    
  }
}

async function main(){
  let panier = JSON.parse(localStorage.getItem("cart"));
  displayProduct(panier);
}

main();