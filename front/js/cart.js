async function fetchApi(id) {
  // fonction d'appel d'un produit avec une fonction réutilisable 
  return fetch(`http://localhost:3000/api/products/${id}`) // appel à l'API du produit recherché
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .catch(function (error) {
      console.log(error); 
    });
}

async function displayProduct(panier) { // fonction de création des éléments du panier 
  for (product of panier) { 
    product.info = await fetchApi(product.id);
    const parentNode = document.getElementById("cart__items"); 

    const articleNode = document.createElement("article"); // création article 
    articleNode.classList.add("cart__item");
    articleNode.setAttribute("data-id", product.id); 
    articleNode.setAttribute("data-color", product.color); 

    const divImg = document.createElement("div"); // création div 
    divImg.classList.add("cart__item__img"); 
    articleNode.appendChild(divImg);

    const img = document.createElement("img"); // création img 
    img.setAttribute("src", product.info.imageUrl); 
    img.setAttribute("alt", product.info.altTxt); 
    divImg.appendChild(img);

    const divContent = document.createElement("div"); // création d'une div  
    divContent.classList.add("cart__item__content");
    articleNode.appendChild(divContent);

    const divDescription = document.createElement("div"); // création div 
    divDescription.classList.add("cart__item__content__description");
    const h2 = document.createElement("h2");
    h2.innerText = product.info.name;
    divDescription.appendChild(h2);
    const descriptionp = document.createElement("p");
    descriptionp.innerText = product.color;
    divDescription.appendChild(descriptionp);
    divContent.appendChild(divDescription);

    const divSettings = document.createElement("div"); // création div  
    divSettings.classList.add("cart__item__content__settings");
    const divQuantity = document.createElement("div");
    divQuantity.classList.add("cart__item__content__settings__quantity");
    divSettings.appendChild(divQuantity);
    const quantityp = document.createElement("p");
    quantityp.innerText = `Qté :`;
    divQuantity.appendChild(quantityp);

    const inputQuantity = document.createElement("input"); // création input  
    inputQuantity.classList.add("itemQuantity");
    inputQuantity.setAttribute("min", 1);
    inputQuantity.setAttribute("max", 100);
    inputQuantity.setAttribute("value", product.quantity);
    inputQuantity.setAttribute("type", "number");
    inputQuantity.setAttribute("name", "itemQuantity");
    divQuantity.appendChild(inputQuantity);
    divContent.appendChild(divSettings);

    const divDelete = document.createElement("div"); // création div 
    divDelete.classList.add("cart__item__content__settings__delete");
    divSettings.appendChild(divDelete);
    const deletep = document.createElement("p");
    deletep.classList.add("deleteItem");
    deletep.innerText = `Supprimer`;
    divDelete.appendChild(deletep);

    parentNode.appendChild(articleNode); // article enfant de parentNode  
  }
  listenDelete(); // exécution de la fonction 
  listenQuantity(); // exécution de la fonction 
  listenOrder(); // exécution de la fonction 
}

async function displayQuantityAndPrice(panier) {
  // fonction écoute de quantitée et de prix 
  let prix = 0;
  let quantity = 0;
  for (produit of panier) {
    produit.info = await fetchApi(produit.id);
    prix += parseInt(produit.info.price) * parseInt(produit.quantity);
    quantity += parseInt(produit.quantity);
  }
  document.getElementById("totalQuantity").innerText = quantity;
  document.getElementById("totalPrice").innerText = prix;
}

function listenDelete() {
  // fonction écoute de suppression d'article 
  let deleteArray = document.querySelectorAll("p.deleteItem");
  deleteArray.forEach(function (elm) {
      elm.addEventListener(
      "click",
      function () {
        let panier = JSON.parse(localStorage.getItem("cart"));
        let articleId = elm.closest("article").getAttribute("data-id");
        let articleColor = elm.closest("article").getAttribute("data-color");
        let index = panier.findIndex(
          (cart) => cart.id === articleId && cart.color === articleColor
        );
        panier.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(panier));
        elm.closest("article").remove();
        displayQuantityAndPrice(panier);
      }
    );
  });
}

function listenQuantity() {
  // fonction écoute de quantitée 
  let quantityArray = document.querySelectorAll("input.itemQuantity"); 
  quantityArray.forEach(function (elm) { 
  elm.addEventListener(  
      "input",
      function (e) {
        let panier = JSON.parse(localStorage.getItem("cart"));  
        let articleId = elm.closest("article").getAttribute("data-id"); 
        let articleColor = elm.closest("article").getAttribute("data-color"); 
        let index = panier.findIndex(  
          (produit) =>
            produit.id === articleId && produit.color === articleColor
        );
        if(e.target.value <= 0) { 
          e.target.value = panier[index].quantity; 
          return window.alert("la quantité ne peut être inférieur à 1, cliquez sur supprimer si vous voulez le retirer du panier."); 
        } else {
          panier[index].quantity = parseInt(e.target.value); 
          localStorage.setItem("cart", JSON.stringify(panier)); 
        };
        displayQuantityAndPrice(panier); 
      }
    );
  });
}

// création de 3 constantes pour définir les Regex
const alphaRegex        = /^[a-zA-Zçñàéèêëïîôüù][a-zA-Zçñàéèêëïîôüù\- '\\.]{0,25}$/;
const alphaNumberRegex  = /^[0-9a-zA-Zçñàéèêëïîôüù][0-9a-zA-Zçñàéèêëïîôüù '-\.]{2,}$/;
const emailRegex        = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

// création de 5 constantes pour les inputs du formulaire
const firstName     = document.getElementById("firstName"); 
const lastName      = document.getElementById("lastName");  
const address       = document.getElementById("address");   
const city          = document.getElementById("city");      
const email         = document.getElementById("email");     

function checkInput() { // fonction de vérification des inputs du formulaire lors de la saisie des infos par l'utilisateur
  firstName.addEventListener("input", function (event) { 
    if (alphaRegex.test(event.target.value) === false) { 
      document.getElementById("firstNameErrorMsg").innerText = "Merci d'entrer un prénom valide."; 
    } else { 
      document.getElementById("firstNameErrorMsg").innerText = ""; 
    };
  });
  lastName.addEventListener("input", function (event) {
    if (alphaRegex.test(event.target.value) == false) {
        document.getElementById("lastNameErrorMsg").innerText = "Merci d'entrer un nom valide.";
    } else {
        document.getElementById("lastNameErrorMsg").innerText = "";
    };
  });
  address.addEventListener("input", function (event) {
      if (alphaNumberRegex.test(event.target.value) == false) {
          document.getElementById("addressErrorMsg").innerText = "Merci d'entrer une adresse valide.";
      } else {
          document.getElementById("addressErrorMsg").innerText = "";
      };
  });
  city.addEventListener("input", function (event) {
      if (alphaRegex.test(event.target.value) == false) {
          document.getElementById("cityErrorMsg").innerText = "Merci d'entrer une ville valide.";
      } else {
          document.getElementById("cityErrorMsg").innerText = "";
      };
  });
  email.addEventListener("input", function (event) {
      if (emailRegex.test(event.target.value) == false) {
          document.getElementById("emailErrorMsg").innerText = "Merci d'entrer un e-mail valide";
      } else {
          document.getElementById("emailErrorMsg").innerText = "";
      };
  });
};

function checkForm() { // fonction qui vérifie que tous les input sont ok
  if (alphaRegex.test(firstName.value) == true
      && alphaRegex.test(lastName.value) == true
      && alphaRegex.test(city.value) == true 
      && alphaNumberRegex.test(address.value) == true 
      && emailRegex.test(email.value) == true) { 
        return true; 
  } else { 
        return false; 
  };
};

function listenOrder() {
  /* fonction écoute de commande */
  let order = document.getElementById("order");
  order.addEventListener("click", function (event) {
    event.preventDefault();
    const contact = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value,
    };
    let panier = JSON.parse(localStorage.getItem("cart"));
    let produit = [];
    for (product of panier) {
      produit.push(product.id);
    }

    const order = {  // création de l'objet contenant les infos du client et l'id des produits commandés
      contact: contact, 
      products: produit,
    };

    const options = { // "définition" de la réquête 
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    }; 
    fetch("http://localhost:3000/api/products/order", options) // Envoie de la requête
      .then(function (res) {
        return res.json(); 
      })
      .then(function(resData) {
        window.location.href = "../html/confirmation.html?orderId=" + resData.orderId;
        localStorage.clear();
      } )
      .catch(function (err) {
        alert("Il y a eu un problème avec l'opération fetch: " + err.message);
      });
  } ) 
} 
    
function main() { // fonction principale qui appelle des fonctions pour qu'elles s'exécutent 
  let panier = JSON.parse(localStorage.getItem("cart"));
  displayProduct(panier);
  displayQuantityAndPrice(panier);
  checkInput();
}

main(); // exécution de la fonction principale 
