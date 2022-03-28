let panier = JSON.parse(localStorage.getItem("cart"));

for (product of panier) {
        let productInfo = {} 
        function getinfo(id){
          fetch(`http://localhost:3000/api/products/${id}`).then((res) => res.json())}
        function fetchInfo(){
        productInfo = getinfo(product.id)
        }
        fetchInfo()
        console.log(productInfo)
        const parentNode = document.getElementById("cart__items"); // création du noeud parent

        const articleNode  = document.createElement("article"); // création article  
        articleNode.classList.add("cart__item")
        articleNode.setAttribute("data-id", product.id); // attribut id
        articleNode.setAttribute("data-color", product.color); // attribut  
        parentNode.appendChild(articleNode)

        const imgNode = document.createElement("img"); // création img
        /*imgNode.setAttribute("src"); // attribut src
        imgNode.setAttribute("alt"); // attribut alt

        /* const itemContentNode = document.createElement("cart__item__content"); // création item content
        ("cartitems").appenchild("cart__item__content")
        const contentDescriptionNode = document.createElement("cart__item__content__description"); // création item content description
        ("cartitems").appenchild("cart__item__content__description")
        contentDescriptionNode.setAttribute("Nom du produit"); // attribut h2 nom du produit
        contentDescriptionNode.setAttribute("Vert"); // attribut p couleur
        const itemContentSettingsNode = document.createElement("cart__item__content__settings"); // création item content settings
        ("cartitems").appenchild("cart__item__content__settings")
        const itemContentSettingsQuantityNode = document.createElement("cart__item__content__settings__quantity"); // création content settings
        ("cartitems").appenchild("cart__item__content__settings__quantity")
        itemContentSettingsQuantityNode.setAttribute("Qté : "); // attribut p quantité
        itemContentSettingsQuantityNode.setAttribute("number"); // attribut input
        itemContentSettingsQuantityNode.setAttribute("itemQuantity"); // attribut class
        itemContentSettingsQuantityNode.setAttribute("itemQuantity"); // attribut name
        itemContentSettingsQuantityNode.setAttribute((min="1") (max="100") (value="42")); // attribut p quantité
        const itemContentSettingsDeleteNode = document.createElement("cart__item__content__settings__delete"); // création item content settings delete
        ("cartitems").appenchild("cart__item__content__settings__delete")
        itemContentSettingsDeleteNode.setAttribute("deleteItem"); // attribut p supprimer */
}

     