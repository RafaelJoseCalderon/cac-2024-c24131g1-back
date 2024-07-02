const damas = document.querySelector("#damas-contenedor");
const ninios = document.querySelector("#ninios-contenedor");
const caballero = document.querySelector("#caballeros-contenedor");


const caja = (producto) => {
    return `
        <div class="box">
            <img src="img/products/${producto.imagen}" alt="...">
            <div class="divider"></div>
            <p>Producto: ${producto.nombre}</p>
            <p>${producto.precio}$ pesos</p>
        </div>
    `;
}


fetch('/api/products/on-sales')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    })
    .then(products => {
        products.forEach(p => {
            if (p.id_categoria == 2) damas.innerHTML += caja(p);
            if (p.id_categoria === 1) ninios.innerHTML += caja(p);
            if (p.id_categoria == 3) caballero.innerHTML += caja(p);
        });
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });