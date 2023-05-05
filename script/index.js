const shoppingCart = [];
const inventary =  [
  {
    name: 'Computador Lenovo',
    price: 2500000,
    stock: 2,
  },
  {
    name: 'Ipad ',
    price: 900000,
    stock: 10,
  },
  {
    name: 'Iphone 13plus',
    price: 5000000,
    stock: 0
  },
  {
    name: 'Iphone 12plus',
    price: 3000000,
    stock: 4
  }
];

function showShoppingCart() {
  if (shoppingCart.length === 0) {
    return alert('No tiene productos agregados en su carro de compras.');
  }

  let i = 0;
  let itemSelected = '';
  for (const item of shoppingCart) {
    if ((i + 1) !==  inventary.length) {
      itemSelected +=  `${i + 1} ${item.name} - Precio: ${item.price} - Cantidad: ${item.quantity} - Valor total: ${item.price * item.quantity}\n`;
    } else {
      itemSelected +=  `${i + 1} ${item.name} - Precio: ${item.price} - Cantidad: ${item.quantity} - Valor total: ${item.price * item.quantity}`;
    }

    i++;
  }

  return alert(`Hola, los productos que has seleccionado son los siguientes: \n${itemSelected}`);
}

function getFromInventary(index) {
  const productSelect = inventary[index - 1];
  if (!productSelect || productSelect.stock === 0) {
    return alert('Este producto no está en nuestro inventario o está en stock.');
  }

  productSelect.stock -= 1;
  return productSelect;
}

function getAnotherOptions() {
  const lengthInventary = inventary.length;
  const option = ['Mostrar carro de compras', 'Comprar', 'Cerrar'];
  let anotherOptions = '';
  for (let index = 0; index < option.length; index += 1) {
    const item = option[index];
    if (index !== option.length - 1) {
      anotherOptions += `${lengthInventary +  index + 1}. ${item}\n`;
    } else {
      anotherOptions += `${lengthInventary +  index + 1}. ${item}`;
    }
  }

  return {
    anotherOptions,
    lastOption: lengthInventary + option.length,
  }

}

function getTotal() {
  let total = 0;
  for (const item of shoppingCart) {
    total += item.price * item.quantity;
  }

  return total;
}

function calculateValue() {
  if (shoppingCart.length === 0) {
    return alert('No tiene productos agregados en su carro de compras.');
  }

  const total = getTotal();
  let pagoInicial = prompt('Ingrese cuanto será su pago inicial', 0);
  if (typeof pagoInicial !== 'number' || pagoInicial < 0) {
    pagoInicial = 0;
  }

  let cuotas = prompt('Ingrese el número de cuotas en las que desea pagar el producto', 1);
  if (typeof pagoInicial !== 'number' || cuotas <= 0) {
    cuotas = 1;
  }

  if (pagoInicial > total) {
    return alert(`El pago inicial es mayor que el valor de su cuenta: ${total}`);
  } else if (pagoInicial === total) {
    return alert('El pago es igual que el total de su cuenta, será pagado en una cuota');
  }

  console.log(total, pagoInicial, cuotas);
  const precioPorCuota = (total - pagoInicial) / cuotas;
  return alert('El pago será en ' + cuotas + ' cuota/s con valor de ' + precioPorCuota );
}

function calculate(index) {
  const product = getFromInventary(index);
  if (product) {
    const itemFromShoppingCart = shoppingCart.find((value) => value.name === product.name);
    if (itemFromShoppingCart) {
      itemFromShoppingCart['quantity'] += 1;
    } else {
      shoppingCart.push({
        name: product.name,
        price: product.price,
        quantity: 1
      });
    }
  }
}

function showPrompt() {
  let nameProducts = '';
  const otherOptions = getAnotherOptions();
  for (let index = 0; index < inventary.length; index += 1) {
    const item = inventary[index];
    nameProducts += `${index + 1}. ${item.name} - Valor ${item.price}\n`;
  }

  const message = `Articulos en venta.\n${nameProducts}${otherOptions.anotherOptions}`;
  let option = prompt(message, );
  while (option != otherOptions.lastOption) {

    if (!option) {
      option = otherOptions.lastOption;
    } else {
      
      if (option <= inventary.length) {
        calculate(option);
      }

      switch (option) {
        case `5`:
          showShoppingCart();
          break;
        case `6`:
          calculateValue();
          break;
        default:
          break;
      }

      option = prompt(message, 3);
    }
  };
}

showPrompt();