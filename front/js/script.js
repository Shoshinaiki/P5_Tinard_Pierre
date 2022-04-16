fetch("http://localhost:3000/api/products")
  .then(products => products.json())
  .then(products => {
    let htmlProduct = ""
    products.forEach(product => {
      const { _id, imageUrl, altText, name, description } = product;
      htmlProduct += `<a href="./product.html?id=${_id}">
        <article>
          <img src="${imageUrl}" alt="${altText}">
          <h3 class="productName">${name}</h3>
          <p class="productDescription">${description}</p>
        </article>
      </a>
`})
    document.getElementById("items").innerHTML = htmlProduct;

  })
