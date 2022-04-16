const url = new URL(document.location.href);

const search_params = new URLSearchParams(url.search);

const id = search_params.get("id");


fetch(`http://localhost:3000/api/products/${id}`)
  .then((product) => product.json())
  .then((product) => {
    // affichage des couleurs
    const select = document.getElementById("colors");
    for (color of product.colors) {
      const newoption = document.createElement("option");
      newoption.setAttribute("value", color);
      newoption.innerText = color;
      select.appendChild(newoption);
    }
    // affichage du prix
    document.getElementById("price").innerText = product.price;
    // affichage du nom
    document.getElementById("title").innerText = product.name;
    // affichage de la description
    document.getElementById("description").innerText = product.description;
    // affichage de l'image
    const divimg = document.querySelector(".item__img");
    const img = document.createElement("img");
    img.setAttribute("src", product.imageUrl);
    img.setAttribute("alt", product.altTxt);
    divimg.appendChild(img);
  });
// ajouter des produits dans le panier
const addToCart = document.getElementById("addToCart");
addToCart.addEventListener("click", function () {
  const itemQuantity = document.getElementById("quantity").value;
  const itemColor = document.getElementById("colors").value;
  if (itemColor === "" ) {
    return window.alert("veuillez indiquer une des couleurs disponibles")
  }
  if (itemQuantity > 100 || itemQuantity < 1) {
    return window.alert("veuillez indiquer une quantité de 1 à 100");
  }
  
    
  // recup Id du produit, sa couleur, sa quantité
  let produit = {
    id: id,
    color: itemColor,
    quantity: itemQuantity,
  };
  // vérifier si existe cart dans le localStorage
  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([produit]));
  } else {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (
      !cart.find((item) => item.color == produit.color && item.id == produit.id)
    ) {
      cart.push(produit);
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      let index = cart.findIndex(
        (item) => item.color == produit.color && item.id == produit.id
      );
      cart[index].quantity =
        parseInt(cart[index].quantity) + parseInt(produit.quantity);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
});
