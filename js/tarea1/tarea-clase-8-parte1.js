
/*# Tarea clase 8. Primera tarea clase 6

A las 2 tareas de la clase 6, ponerles las validaciones que consideren
necesarias. (Usando RegExp, Objetos, forEach, poner estilos, mostrar los errores en interfaz de usuario y escribir pruebas)

TIP: Las edades no pueden tener decimales.
*/
//Tarea 1

document.querySelector('#ingresar-datos').onclick = function (event) {
	const $cantidadMiembrosFamilia = document.querySelector('#cantidad-miembros').value;
	reiniciarEdadFormulario();

	const resultado = validarElNumeroIntegrantes();
	if (resultado === 0) {
		crearIntegrantes($cantidadMiembrosFamilia);
	}

	event.preventDefault();
};

document.querySelector('#calcular').onclick = function (event) {
	let edades = obtenerLasEdadesMiembros();

	let resultado = validarEdadesIntegrantes();
	if (resultado === 0) {
		mostrarEdades('mayor', obtenerNumeroMayor(edades));
		mostrarEdades('menor', obtenerNumeroMenor(edades));
		mostrarEdades('promedio', obtenerPromedio(edades));
		mostrarResultados();
	} else {
		ocultarResultado();
	}

	event.preventDefault();
};

document.querySelector('#reiniciar').onclick = function (event) {
	reiniciarEdadFormulario();
	event.preventDefault();
};

function crearIntegrantes(numeroDeMiembros) {
	if (numeroDeMiembros > 0) {
		mostrarBotonCalculo();
	} else {
		reiniciarEdadFormulario();
	}
	for (let i = 1; i <= numeroDeMiembros; i++) {
		crearIntegrante(i);
	}
}
function crearIntegrante(numero) {
	const $div = document.createElement('div');
	$div.className = 'miembro';

	const $nuevoInput = document.createElement('input');
	$nuevoInput.type = 'number';
	$nuevoInput.className = 'edades-miembros';
	const $nuevoLabel = document.createElement('label');
	$nuevoLabel.textContent = `Edad integrante: #${numero}`;
	$nuevoLabel.className = 'texto-edades';

	$div.appendChild($nuevoLabel);
	$div.appendChild($nuevoInput);

	const $insertarDiv = document.querySelector('#edades');
	$insertarDiv.appendChild($div);
}

function obtenerLasEdadesMiembros() {
	const $edadesMiembros = document.querySelectorAll('.edades-miembros');
	let edades = [];
	for (let i = 0; i < $edadesMiembros.length; i++) {
		if ($edadesMiembros[i].value === '') {
			continue;
		} else {
			edades.push(Number($edadesMiembros[i].value));
		}
	}
	return edades;
}
function reiniciarEdadFormulario() {
	borrarIntegrantes();
	ocultarBotonCalculo();
	ocultarResultado();
	borrarTexto();
	eliminarAvisoErrores();
}

function borrarIntegrantes() {
	const $borrarInput = document.querySelectorAll('.edades-miembros');
	const $borrarLabel = document.querySelectorAll('.texto-edades');
	const $borrarDiv = document.querySelectorAll('.miembro');
	for (let i = 0; i < $borrarInput.length; i++) {
		$borrarInput[i].remove();
	}
	for (let i = 0; i < $borrarInput.length; i++) {
		$borrarLabel[i].remove();
	}
	for (let i = 0; i < $borrarDiv.length; i++) {
		$borrarDiv[i].remove();
	}
}

function borrarTexto() {
	const $numeroMayor = document.querySelector('#edad-mayor');
	const $numeroMenor = document.querySelector('#edad-menor');
	const $numeroPromedio = document.querySelector('#edad-promedio');
	$numeroMayor.textContent = '';
	$numeroMenor.textContent = '';
	$numeroPromedio.textContent = '';
}
function ocultarBotonCalculo() {
	const $ocultarBotonCalculo = document.querySelector('#calcular');
	$ocultarBotonCalculo.className = 'oculto';
}
function mostrarBotonCalculo() {
	let $mostrarBotonCalculo = document.querySelector('#calcular');
	$mostrarBotonCalculo.className = '';
}
function mostrarResultados() {
	const $mostrarResultado = document.querySelector('#resultado');
	$mostrarResultado.className = '';
}
function ocultarResultado() {
	const $ocultarResultado = document.querySelector('#resultado');
	$ocultarResultado.className = 'oculto';
}
function mostrarEdades(id, edad) {
	const $mostrarEdad = document.querySelector(`#edad-${id}`);
	$mostrarEdad.textContent = edad;
}

function obtenerNumeroMayor(numeros) {
	let numeroMayor = numeros[0];
	for (let i = 1; i < numeros.length; i++) {
		if (numeros[i] > numeroMayor) {
			numeroMayor = numeros[i];
		}
	}

	return numeroMayor;
}
function obtenerNumeroMenor(numeros) {
	let numeroMenor = numeros[0];
	for (let i = 1; i < numeros.length; i++) {
		if (numeros[i] < numeroMenor) {
			numeroMenor = numeros[i];
		}
	}
	return numeroMenor;
}
function obtenerPromedio(numeros) {
	let sumaTotal = 0;
	for (let i = 0; i < numeros.length; i++) {
		sumaTotal = sumaTotal + numeros[i];
	}
	return sumaTotal / numeros.length;
}

function eliminarAvisoErrores() {
	const $notificacionError = document.querySelectorAll('.lista-error');
	const $errores = document.querySelector('#errores');
	if (($errores.hasChildNodes = true)) {
		$notificacionError.forEach(function () {
			const $errorEliminar = document.querySelector('#errores');
			$errorEliminar.removeChild($errorEliminar.lastChild);
		});
	}
}
