function Seguro(marca, anio, tipo) {
  this.marca = marca;
  this.anio = anio;
  this.tipo = tipo;
}
Seguro.prototype.cotizarSeguro = function () {
  let cantidad;
  const base = 2000;

  switch (this.marca) {
    case '1':
      cantidad = base * 1.15;
      break;
    case '2':
      cantidad = base * 1.05;
      break;
    case '3':
      cantidad = base * 1.35;
      break;
  }

  const diferencia = new Date().getFullYear() - this.anio;

  cantidad -= (diferencia * 3 * cantidad) / 100;

  if (this.tipo === 'basico') {
    cantidad *= 1.3;
  } else {
    cantidad *= 1.5;
  }

  return cantidad;
};

function Interfaz() {}

Interfaz.prototype.mostrarMensaje = function (mensaje, tipo) {
  const div = document.createElement('div');

  if (tipo === 'error') {
    div.classList.add('mensaje', 'error');
  } else {
    div.classList.add('mensaje', 'correcto');
  }
  div.classList.add('mt-10');
  div.innerHTML = `${mensaje}`;
  formulario.insertBefore(div, document.querySelector('#resultado')); // Nuevo Nodo y referencia... // Si la referencia no existe se añadira al final

  setTimeout(() => {
    document.querySelector('.mensaje').remove();
  }, 3000);
};

Interfaz.prototype.mostrarResultado = function (seguro, total) {
  const resultado = document.querySelector('#resultado');
  let marca;
  switch (seguro.marca) {
    case '1':
      marca = 'Americano';
      break;
    case '2':
      marca = 'Asiatico';
      break;
    case '3':
      marca = 'Europeo';
      break;
  }

  const div = document.createElement('div');
  div.classList.add('mt-10');

  div.innerHTML = `
          <p class='header'>Tu Resumen: </p>
          <p class="font-bold">Marca: <span class="font-normal"> ${marca} </span> </p>
          <p class="font-bold">Año: <span class="font-normal"> ${seguro.anio} </span> </p>
          <p class="font-bold">Tipo: <span class="font-normal"> ${seguro.tipo} </span> </p>
          <p class="font-bold"> Total: <span class="font-normal"> $ ${total} </span> </p>
     `;

  const spinner = document.querySelector('#cargando');
  spinner.style.display = 'block';
  setTimeout(() => {
    spinner.style.display = 'none';
    resultado.appendChild(div);
  }, 3000);
};

Interfaz.prototype.llenarOpciones = function () {
  const max = new Date().getFullYear(),
    min = max - 20;

  const selectAnios = document.querySelector('#year');
  for (let i = max; i > min; i--) {
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option);
  }
};

const interfaz = new Interfaz();

document.addEventListener('DOMContentLoaded', () => {
  interfaz.llenarOpciones();
});

const formulario = document.querySelector('#cotizar-seguro');

formulario.addEventListener('submit', e => {
  e.preventDefault();

  const marca = document.querySelector('#marca').value;

  const year = document.querySelector('#year').value;

  const tipo = document.querySelector('input[name="tipo"]:checked').value;

  if (marca === '' || year === '' || tipo === '') {
    interfaz.mostrarMensaje(
      'Faltan datos, revisar el formulario y prueba de nuevo',
      'error'
    );
  } else {
    const resultados = document.querySelector('#resultado div');
    if (resultados != null) {
      resultados.remove();
    }

    const seguro = new Seguro(marca, year, tipo);

    const cantidad = seguro.cotizarSeguro();

    interfaz.mostrarResultado(seguro, cantidad);
    interfaz.mostrarMensaje('Cotizando...', 'exito');
  }
});
