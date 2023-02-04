//Validaciones Tarea 1
function validarNumeroIntegrante(integrante) {
	if (integrante === '') {
		return 'El campo de ingreso no debe estar vacio';
	}
	if (integrante <= 0) {
		return 'El numero de integrente debe ser mayor a cero';
	}
	if (!/^[0-9]+$/.test(integrante)) {
		return 'El campo de ingreso unicamente debe contener numeros enteros';
	}
	if (!/^[0-9]{1,2}$/.test(integrante)) {
		return 'El campo de ingreso solo admite numero de dos cifras';
	}

	return '';
}
function validarEdadIntegrante(integrante) {
	if (integrante === '') {
		return 'El campo de edad no debe estar vacio';
	}
	if (integrante <= 0) {
		return 'El campo de edad tiene que ser mayor a cero';
	}
	if (integrante >= 125) {
		return 'La edad ingresada no debe ser mayor que 125 años';
	}
	if (/[\.\,]/.test(integrante)) {
		return 'El campo de edad unicamente debe contener numeros enteros';
	}

	return '';
}

function validarElNumeroIntegrantes() {
	const $integrantes = document.querySelector('#cantidad-miembros').value;

	const errorIntegrantes = validarNumeroIntegrante($integrantes);

	const errores = {
		'#cantidad-miembros': errorIntegrantes,
	};

	if ((document.querySelector('#errores').hasChildNodes = true)) {
		eliminarAvisoError();
	}

	const resultadoValidacion = manejarErroresIntegrantes(errores);
	if (resultadoValidacion > 0) {
		return resultadoValidacion;
	} else {
		return 0;
	}
}

function validarEdadesIntegrantes() {
	const $edadIntegrante = document.querySelectorAll('.edades-miembros');

	let errores = {};

	for (let i = 0; i < $edadIntegrante.length; i++) {
		errores[i] = validarEdadIntegrante($edadIntegrante[i].value);
	}

	if ((document.querySelector('#errores').hasChildNodes = true)) {
		eliminarAvisoError();
	}

	const resultadoValidacion = manejarErroresEdades(errores, $edadIntegrante);
	if (resultadoValidacion > 0) {
		return resultadoValidacion;
	} else {
		return 0;
	}
}

function manejarErroresEdades(errores, $elemento) {
	let cantidadDeErrores = 0;

	Object.keys(errores).forEach(function (key) {
		const error = errores[key];

		if (error) {
			cantidadDeErrores++;

			$elemento[key].id = 'error';
			crearNuevoError(error);
		} else {
			$elemento[key].id = '';
		}
	});
	return cantidadDeErrores;
}

function manejarErroresIntegrantes(errores) {
	const keys = Object.keys(errores);
	const $errores = document.querySelector('#errores');
	let cantidadDeErrores = 0;

	keys.forEach(function (key) {
		const error = errores[key];

		if (error) {
			cantidadDeErrores++;
			const $llave = document.querySelector(`${key}`);
			$llave.classList.add('error');

			const $error = document.createElement('li');
			$error.innerText = error;
			$error.className = 'lista-error';
			$errores.appendChild($error);
		} else {
			const $llave = document.querySelector(`${key}`);
			$llave.classList.remove('error');
		}
	});
	return cantidadDeErrores;
}

function crearNuevoError(error) {
	const $errores = document.querySelector('#errores');
	const $error = document.createElement('li');
	$error.innerText = error;
	$error.className = 'lista-error';
	$errores.appendChild($error);
}

function eliminarAvisoError() {
	const $notificacionError = document.querySelectorAll('.lista-error');
	const $errores = document.querySelector('#errores');
	if (($errores.hasChildNodes = true)) {
		$notificacionError.forEach(function () {
			const $errorEliminar = document.querySelector('#errores');
			$errorEliminar.removeChild($errorEliminar.lastChild);
		});
	}
}
function crearArrayEdad() {
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

