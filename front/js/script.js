fetch("http://localhost:3000/api/products")
  .then(products => products.json())
  .then(products => {
    console.log(products)
    /*  <!--           <a href="./product.html?id=42">
         <article>
           <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
           <h3 class="productName">Kanap name1</h3>
           <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
         </article>
       </a> --> */
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
`


    })
    console.log(htmlProduct)
    document.getElementById("items").innerHTML = htmlProduct;

  })

