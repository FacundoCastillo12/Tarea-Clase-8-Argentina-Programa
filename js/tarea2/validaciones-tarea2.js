//Validar ingreso. Numero negativo. Que este vacio. Caracteres como - no.

function validarSalarios (salario){
    if (salario === ''){
        return 'El campo ingreso salario no debe estar esta vacio';
    } 
    if (salario < 0){
        return 'El campo de ingreso solamente acepta numeros positivos';
    }
    if(!/^[0-9]{1,8}$/.test(salario)){
        return 'El campo de ingreso acepta hasta 8 numeros';
    }
return '';
}

function validarSalariosMiembros(){
    const $salarioMiembros = document.querySelectorAll('.integrantes-añadidos')
	let errores = {};
    for (let i = 0; i < $salarioMiembros.length; i++){
        errores[i] = validarSalarios($salarioMiembros[i].value);
    }


	if ((document.querySelector('#errores-salario').hasChildNodes = true)) {
		eliminarNotificacionError();
	}

	const resultadosValidaciones = manejarErroresSalario(errores, $salarioMiembros);
	if (resultadosValidaciones > 0) {
		return resultadosValidaciones;
	} else {
		return 0;
	}
}

function manejarErroresSalario(errores, $clase) {
	let cantidadDeErrores = 0;

	Object.keys(errores).forEach(function (key) {
		const error = errores[key];

		if (error) {
			cantidadDeErrores++;

			$clase[key].id = 'error';
			crearNuevosErrores(error);
		} else {
			$clase[key].id = '';
		}
	});
	return cantidadDeErrores;
}
function crearNuevosErrores(errores){
    const $errores = document.querySelector('#errores-salario');
	const $error = document.createElement('li');
	$error.innerText = errores;
	$error.className = 'lista-error-salarios';
	$errores.appendChild($error);
}
function eliminarNotificacionError() {
	const $notificacionError = document.querySelectorAll('.lista-error-salarios');
	const $errores = document.querySelector('#errores-salario');
	if (($errores.hasChildNodes = true)) {
		$notificacionError.forEach(function () {
			const $errorEliminar = document.querySelector('#errores-salario');
			$errorEliminar.removeChild($errorEliminar.lastChild);
		});
	}
}


