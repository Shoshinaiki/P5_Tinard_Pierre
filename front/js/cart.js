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
    

    const divImgNode = document.createElement("div"); // création div
    divImgNode.classList.add("cart__item__img"); // attribut img
    articleNode.appendChild(divImgNode)

    const imgNode = document.createElement("img"); // création img
    imgNode.setAttribute("src", product.info.imageUrl); // attribut src
    imgNode.setAttribute("alt", product.info.altTxt); // attribut alt
    divImgNode.appendChild(imgNode)

    const divItemContentNode = document.createElement("div");
    divItemContentNode.classList.add("cart__item__content");
    articleNode.appendChild(divItemContentNode)
    
    const divItemContentDescriptionNode = document.createElement("div");
    divItemContentDescriptionNode.classList.add("cart__item__content__description");
    divItemContentNode.appendChild(divItemContentDescriptionNode)
    const divItemContentDescriptionh2Node = document.createElement("h2");
    divItemContentDescriptionh2Node.innerText = product.info.name;
    divItemContentDescriptionNode.appendChild(divItemContentDescriptionh2Node);
    const divItemContentDescriptionpNode = document.createElement("p");
    divItemContentDescriptionpNode.innerText = product.color;
    divItemContentNode.appendChild(divItemContentDescriptionpNode);
   

    const divItemContentSettingsNode = document.createElement("div");
    divItemContentNode.classList.add("cart__item__content__settings");
    const divItemContentQuantityNode = document.createElement("div");
    divItemContentQuantityNode.classList.add("cart__item__content__quantity");
    const divItemContentQuantityPNode = document.createElement("p");
    divItemContentQuantityPNode.innerText = `Qté : ${product.quantity}`;
    divItemContentSettingsNode.appendChild(divItemContentQuantityPNode)

    const inputItemContentQuantityNode = document.createElement("input");
    inputItemContentQuantityNode.classList.add("itemQuantity");
    inputItemContentQuantityNode.innerText = `name: ${product.info}`;
    inputItemContentQuantityNode.innerText = `min="1" max="100" value="42": ${product.info}`;
    divItemContentSettingsNode.appendChild(inputItemContentQuantityNode)

    const divItemContentSettingsDeleteNode = document.createElement("div");
    divItemContentSettingsDeleteNode.classList.add("cart__item__content__settings__delete");
    const divItemContentSettingsDeletepNode = document.createElement("p");
    divItemContentSettingsDeleteNode.setAttribute("deleteItem", product.info);
    divItemContentSettingsDeletepNode.innerText = `Supprimer: $(product.info)`;
    divItemContentSettingsNode.appendChild(divItemContentSettingsDeleteNode)
     
    parentNode.appendChild(articleNode)

    
  }
}

async function main(){
  let panier = JSON.parse(localStorage.getItem("cart"));
  displayProduct(panier);
}

main();