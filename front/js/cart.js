async function fetchApi(id) {
  /* fonction d'appel des id produits */
  return fetch(`http://localhost:3000/api/products/${id}`)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function displayProduct(panier) {
  /* fonction de création des éléments du panier */
  for (product of panier) {
    product.info = await fetchApi(product.id);
    const parentNode = document.getElementById("cart__items"); // création du noeud parent

    const articleNode = document.createElement("article"); // création article
    articleNode.classList.add("cart__item");
    articleNode.setAttribute("data-id", product.id); // attribut id
    articleNode.setAttribute("data-color", product.color); // attribut

    const divImg = document.createElement("div"); // création div
    divImg.classList.add("cart__item__img"); // attribut img
    articleNode.appendChild(divImg);

    const img = document.createElement("img"); // création img
    img.setAttribute("src", product.info.imageUrl); // attribut src
    img.setAttribute("alt", product.info.altTxt); // attribut alt
    divImg.appendChild(img);

    const divContent = document.createElement("div");
    divContent.classList.add("cart__item__content");
    articleNode.appendChild(divContent);

    const divDescription = document.createElement("div");
    divDescription.classList.add("cart__item__content__description");
    const h2 = document.createElement("h2");
    h2.innerText = product.info.name;
    divDescription.appendChild(h2);
    const descriptionp = document.createElement("p");
    descriptionp.innerText = product.color;
    divDescription.appendChild(descriptionp);
    divContent.appendChild(divDescription);

    const divSettings = document.createElement("div");
    divSettings.classList.add("cart__item__content__settings");
    const divQuantity = document.createElement("div");
    divQuantity.classList.add("cart__item__content__settings__quantity");
    divSettings.appendChild(divQuantity);
    const quantityp = document.createElement("p");
    quantityp.innerText = `Qté :`;
    divQuantity.appendChild(quantityp);
    const inputQuantity = document.createElement("input");
    inputQuantity.classList.add("itemQuantity");
    inputQuantity.setAttribute("min", 1);
    inputQuantity.setAttribute("max", 100);
    inputQuantity.setAttribute("value", product.quantity);
    inputQuantity.setAttribute("type", "number");
    inputQuantity.setAttribute("name", "itemQuantity");
    divQuantity.appendChild(inputQuantity);
    divContent.appendChild(divSettings);

    const divDelete = document.createElement("div");
    divDelete.classList.add("cart__item__content__settings__delete");
    divSettings.appendChild(divDelete);
    const deletep = document.createElement("p");
    deletep.classList.add("deleteItem");
    deletep.innerText = `Supprimer`;
    divDelete.appendChild(deletep);

    parentNode.appendChild(articleNode);
  }
  listenDelete();
  listenQuantity();
  listenOrder();
}

async function displayQuantityAndPrice(panier) {
  /* fonction écoute de quantitée et de prix */
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
  /* fonction écoute de suppression d'article */
  let deleteArray = document.querySelectorAll("p.deleteItem");
  deleteArray.forEach(function (elm) {
    /* vérifier les éléments au click du bouton */ elm.addEventListener(
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
  /* fonction écoute de quantitée */
  let quantityArray = document.querySelectorAll("input.itemQuantity"); //tu cibles tous input de quantité (ça te donne un tableau)
  quantityArray.forEach(function (elm) { //tu fais une boucle sur le tableau (pour chaque input du tableau des input de quantité)
    /* vérifier les éléments au click du bouton */ elm.addEventListener(  //tu écoutes le changement de l'input (ATTENTION ce n'est pas au click)
      "input",
      function (e) {
        let panier = JSON.parse(localStorage.getItem("cart"));  //tu récupères ton panier du localStorage
        let articleId = elm.closest("article").getAttribute("data-id"); //tu cibles l'article le plus près de l'élément cliqué et tu prends l'id via ses attributs
        let articleColor = elm.closest("article").getAttribute("data-color");  //tu cibles l'article le plus près de l'élément cliqué et tu prends la couleur via ses attributs
        let index = panier.findIndex(   //tu cherches la position de l'élément identique dans le panier
          (produit) =>
            produit.id === articleId && produit.color === articleColor
        );
        if(e.target.value <= 0) { //si la quantité saisie est inférieure ou égale à 0
          e.target.value = panier[index].quantity; //la valeur de l'input garde la quantité de l'article mis dans le panier du local storage
          return window.alert("la quantité ne peut être inférieur à 1, cliquez sur supprimer si vous voulez le retirer du panier."); //une alerte précise la directive au client
        } else { //sinon 
          panier[index].quantity = parseInt(e.target.value); //tu dis que la nouvelle quantité est égale à la qté saisie dans l'input  
          localStorage.setItem("cart", JSON.stringify(panier)); //tu renvois le panier modifié
        };
        displayQuantityAndPrice(panier); //tu exécutes la fonction pour recalculer les totaux prix et qté
      }
    );
  });
}

//création de 3 constantes pour définir les Regex
const alphaRegex        = /^[a-zA-Zçñàéèêëïîôüù][a-zA-Zçñàéèêëïîôüù\- '\\.]{0,25}$/;//ici la regex autorisant uniquement les caractères alphabétiques (prénom + nom + ville);
const alphaNumberRegex  = /^[0-9a-zA-Zçñàéèêëïîôüù][0-9a-zA-Zçñàéèêëïîôüù '-\.]{2,}$/;//ici la regex autorisant uniquement les caractères alphanumériques (adresse postale);
const emailRegex        = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //ici la regex autorisant uniquement le format email (email);

//création de 5 constantes pour les inputs du formulaire
const firstName     = document.getElementById("firstName"); //cible l'input prénom
const lastName      = document.getElementById("lastName");  //cible l'input nom
const address       = document.getElementById("address");   //cible l'input addresse
const city          = document.getElementById("city");      //cible l'input ville
const email         = document.getElementById("email");     //cible l'input email

function checkInput() { //fonction qui va faire la vérification des inputs du formulaire lors de la saisie des infos par l'utilisateur
  firstName.addEventListener("input", function (event) { //écoute de l'input prénom (firstName), type de l'écoute ("input"), action qui doit être faite (function) 
    if (alphaRegex.test(event.target.value) === false) { //condition si la regex lorsqu'on la test sur la valeur de l'input qui est en train d'être modifié renvoie faux
      document.getElementById("firstNameErrorMsg").innerText = "Merci d'entrer un prénom valide."; //alors on modifie le contenu du p d'erreur pour dire que ça n'est pas bon
    } else { //sinon c'est que le regex renvoie vrai
      document.getElementById("firstNameErrorMsg").innerText = ""; //alors le p d'erreur est vide (ça évite que le message d'erreur reste)
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

function checkForm() { //fonction qui vérifie que tous les input sont ok
  if (alphaRegex.test(firstName.value) == true //si le prénom est bon
      && alphaRegex.test(lastName.value) == true // et le nom est bon
      && alphaRegex.test(city.value) == true // et la ville est bonne
      && alphaNumberRegex.test(address.value) == true // et l'adresse
      && emailRegex.test(email.value) == true) { //et l'email est ok
        return true; // alors tu renvoies vrai (le formulaire est bien rempli)
  } else { //sinon
        return false; // tu renvoies faux (le formulaire est mal rempli)
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

     /* email.addEventListener("listenOrder", function () {
      let regex1 = Prenom chaine.match(regex);
      let regex2 = Nom
      let regex3 = Addresse
      let regex4 = Ville
      let regex5 = Email
      validEmail(this);
    }); */
    
    const validEmail = function (inputEmail) {
      let testEmail = emailRegexp.test(inputEmail.value);
      let emailMsg = document.getElementById("emailErrorMsg");
    
      if (testEmail == true) {
        emailMsg.innerText = "Email valide";
        emailMsg.style.color = "#3FFF00";
        return true;
      } else {
        emailMsg.innerText = "Ex de mail accepté : ja_ja-5.@ka.mele.on ";
        emailMsg.style.color = "red";
        return false;
      }
    };

    const order = { 
      contact: contact,
      products: produit,
    };
    console.log(order);
    const options = {
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
    
function main() {
  let panier = JSON.parse(localStorage.getItem("cart"));
  displayProduct(panier);
  displayQuantityAndPrice(panier);
  checkInput();
}

main();
