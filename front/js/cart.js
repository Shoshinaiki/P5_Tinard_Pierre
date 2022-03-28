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
    articleNode.classList.add("cart__item")
    articleNode.setAttribute("data-id", product.id); // attribut id
    articleNode.setAttribute("data-color", product.color); // attribut  
    parentNode.appendChild(articleNode)

    const divImgNode = document.createElement("div")
    divImgNode.classList.add("cart__item__img")
    parentNode.appendChild(divImgNode)
    const imgNode = document.createElement("img"); // création img
    imgNode.setAttribute("src", product.info.imageUrl); // attribut src
    imgNode.setAttribute("alt", product.info.altTxt); // attribut alt
    divImgNode.appendChild(imgNode)
  }
}

async function main(){
  let panier = JSON.parse(localStorage.getItem("cart"));
  displayProduct(panier);
}

main();