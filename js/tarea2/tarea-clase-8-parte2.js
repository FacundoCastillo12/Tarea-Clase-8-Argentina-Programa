/*
TAREA:
Crear una interfaz que permita agregar ó quitar (botones agregar y quitar) inputs+labels para completar el salario anual de cada integrante de la familia que trabaje.
Al hacer click en "calcular", mostrar en un elemento pre-existente el mayor salario anual, menor salario anual, salario anual promedio y salario mensual promedio.

Punto bonus: si hay inputs vacíos, ignorarlos en el cálculo (no contarlos como 0).
*/
//Tarea 2

let contadorIntegrante = 0;

document.querySelector('#añadir-integrante').onclick = function (event) {
	contadorIntegrante++;
	añadirMiembro(contadorIntegrante);
    eliminarNotificacionErrores();
    ocultarPedidosReingresarDatos();
	quitarAvisoErrorIntegrante();
	mostrarBotonCalcular();
	event.preventDefault();
};

document.querySelector('#quitar-integrante').onclick = function (event) {
	if (contadorIntegrante <= 0) {
		añadeAvisoErrorQuitarIntegrante();
		ocultarBotonCalcular();
		ocultarResultadosSalarios();
	} else {
		contadorIntegrante--;
		eliminarMiembro(contadorIntegrante);
        eliminarNotificacionErrores();
        ocultarPedidosReingresarDatos();
	}

	event.preventDefault();
};
document.querySelector('#calcular-salario').onclick = function (event) {
	let salarios = obtenerSalarioArray();
	let resultado = validarSalariosMiembros();
	if (resultado === 0) {
		mostrarSalariosIngreso('mayor', obtenerSalarioMayor(salarios));
		mostrarSalariosIngreso('menor', obtenerSalarioMenor(salarios));
		mostrarSalariosIngreso('promedio', obtenerSalarioPromedio(salarios));
		mostrarIngresoPromedioMensual(
			calcularIngresoMensualPromedio(obtenerSalarioPromedio(salarios))
		);
		mostrarResultadosSalarios();
		ocultarPedidosReingresarDatos();
	} else {
		ocultarResultadosSalarios();
		mostrarPedidosReingresarDatos();
	}

	event.preventDefault();
};
document.querySelector('#reinciar-salario').onclick = function (event) {
	reiniciarFormularioSalario();
	event.preventDefault();
};

function añadirMiembro(integrante) {
	const $div = document.createElement('div');
	$div.className = 'div-miembros';
	const $input = document.createElement('input');
	$input.type = 'number';
	$input.className = 'integrantes-añadidos';
	const $label = document.createElement('label');
	$label.className = 'texto-miembros';
	$label.textContent = `Ingresar salario del integrante #${integrante}`;

	$div.appendChild($label);
	$div.appendChild($input);

	const $miembros = document.querySelector('#miembros');
	$miembros.appendChild($div);
}

function eliminarMiembro(integrante) {
	const $miembro = document.querySelector('#miembros');
	if (($miembro.hasChildNodes = true)) {
		eliminarHijo();
	}

	return integrante;
}
function eliminarHijo() {
	const $miembro = document.querySelector('#miembros');
	$miembro.removeChild($miembro.lastChild);
}

function reiniciarFormularioSalario() {
	borrarMiembro();
	ocultarBotonCalcular();
	quitarAvisoErrorIntegrante();
	ocultarResultadosSalarios();
	borrarResultados();
	eliminarNotificacionErrores();
    ocultarPedidosReingresarDatos();
	contadorIntegrante = 0;
}

function borrarMiembro() {
	const $borrarInput = document.querySelectorAll('.integrantes-añadidos');
	const $borrarLabel = document.querySelectorAll('.texto-miembros');
	const $borrarDiv = document.querySelectorAll('.div-miembros');
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

function mostrarSalariosIngreso(id, salario) {
	const $mostrarIngreso = document.querySelector(`#${id}-ingreso-anual`);
	$mostrarIngreso.textContent = salario;
}
function mostrarIngresoPromedioMensual(ingreso) {
	const $ingresoMensualPromedio = document.querySelector('#ingreso-promedio-mensual');
	$ingresoMensualPromedio.textContent = ingreso;
}

function obtenerSalarioArray() {
	const $salarioMiembros = document.querySelectorAll('.integrantes-añadidos');
	let salario = [];
	for (let i = 0; i < $salarioMiembros.length; i++) {
		if ($salarioMiembros[i].value === '') {
			continue;
		} else {
			salario.push(Number($salarioMiembros[i].value));
		}
	}
	return salario;
}
function borrarResultados() {
	const $salarioMayor = document.querySelector('#mayor-ingreso-anual');
	const $salarioMenor = document.querySelector('#menor-ingreso-anual');
	const $salarioPromedio = document.querySelector('#promedio-ingreso-anual');
	const $ingresoPromedioMensual = document.querySelector('#ingreso-promedio-mensual');

	$salarioMayor.textContent = '';
	$salarioMenor.textContent = '';
	$salarioPromedio.textContent = '';
	$ingresoPromedioMensual.textContent = '';
}
function quitarAvisoErrorIntegrante() {
	const $errorAvisarMiembro = document.querySelector('#error-falta-miembro');
	$errorAvisarMiembro.className = 'oculto';
}
function añadeAvisoErrorQuitarIntegrante() {
	const $errorAvisarMiembro = document.querySelector('#error-falta-miembro');
	$errorAvisarMiembro.className = '';
}
function mostrarBotonCalcular() {
	const $botonCalcular = document.querySelector('#calcular-salario');
	$botonCalcular.className = '';
}
function ocultarBotonCalcular() {
	const $botonCalcular = document.querySelector('#calcular-salario');
	$botonCalcular.className = 'oculto';
}
function mostrarResultadosSalarios() {
	const $mostrarResultados = document.querySelector('#resultados-salario');
	$mostrarResultados.className = '';
}

function ocultarResultadosSalarios() {
	const $mostrarResultados = document.querySelector('#resultados-salario');
	$mostrarResultados.className = 'oculto';
}
function mostrarPedidosReingresarDatos() {
	const $mostrarPedido = document.querySelector('#pedido-reingresar-datos');
	$mostrarPedido.className = '';
}
function ocultarPedidosReingresarDatos() {
	const $ocultarPedido = document.querySelector('#pedido-reingresar-datos');
	$ocultarPedido.className = 'oculto';
}

function obtenerSalarioMayor(numeros) {
	let numeroMayor = numeros[0];
	for (let i = 1; i < numeros.length; i++) {
		if (numeros[i] > numeroMayor) {
			numeroMayor = numeros[i];
		}
	}

	return numeroMayor;
}
function obtenerSalarioMenor(numeros) {
	let numeroMenor = numeros[0];
	for (let i = 1; i < numeros.length; i++) {
		if (numeros[i] < numeroMenor) {
			numeroMenor = numeros[i];
		}
	}
	return numeroMenor;
}
function obtenerSalarioPromedio(numeros) {
	let sumaTotal = 0;
	for (let i = 0; i < numeros.length; i++) {
		sumaTotal = sumaTotal + numeros[i];
	}
	return sumaTotal / numeros.length;
}

function calcularIngresoMensualPromedio(ingresoAnual) {
	let ingresoPromedio = ingresoAnual / 12;
	return ingresoPromedio;
}

function eliminarNotificacionErrores() {
	const $notificacionError = document.querySelectorAll('.lista-error-salarios');
	const $errores = document.querySelector('#errores-salario');
	if (($errores.hasChildNodes = true)) {
		$notificacionError.forEach(function () {
			const $errorEliminar = document.querySelector('#errores-salario');
			$errorEliminar.removeChild($errorEliminar.lastChild);
		});
	}
}
