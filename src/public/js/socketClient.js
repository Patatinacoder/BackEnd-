const socket = io();

socket.on('productAdded', (data) => {
    const productList = document.getElementById('product-list');

    productList.innerHTML = '';

    data.products.forEach((product) => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <p>${product.title}</p>
            <p>${product.description}</p>
        `;
        productList.appendChild(productDiv);
    });
});
