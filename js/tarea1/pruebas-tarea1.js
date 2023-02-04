//Pruebas tarea 1
function probarValidarNumerosMiembrosFamilia() {
	console.assert(
		validarNumeroIntegrante('') === 'El campo de ingreso no debe estar vacio',
		'Validar numeros de integrante no valido que el campo de ingreso no deba estar vacio'
	);
	console.assert(
		validarNumeroIntegrante('2,5') ===
			'El campo de ingreso unicamente debe contener numeros enteros',
		'Validar numeros de integrantes no ha validado que el campo de ingreso unicamente tenga numeros'
	);
	console.assert(
		validarNumeroIntegrante('9999') ===
			'El campo de ingreso solo admite numero de dos cifras',
		'Validar numeros de integrantes no ha validado la admicion de numeros de dos cifras'
	);
	console.assert(
		validarNumeroIntegrante(-158) ===
			'El numero de integrente debe ser mayor a cero',
		'Validar numero de integrante no ha validado que los integrantes sean mayores que cero'
	);
	console.assert(
		validarNumeroIntegrante('6') === '',
		'Validar numero de integrantes no ha validado con un numero correcto'
	);
}

function probarValidadEdadIntegrante() {
	console.assert(
		validarEdadIntegrante('') === 'El campo de edad no debe estar vacio',
		'Validar edad integrante no ha validado que el campo de edad no este vacio'
	);
	console.assert(
		validarEdadIntegrante(0) === 'El campo de edad tiene que ser mayor a cero',
		'Validar edad integrante no ha validado que el campo edad no tenga ceros'
	);
	console.assert(
		validarEdadIntegrante('22,5') ===
			'El campo de edad unicamente debe contener numeros enteros',
		'Validar edad integrante no ha validado que el campo de edad contenga numeros enteros'
	);
	console.assert(
		validarEdadIntegrante('263') ===
			'La edad ingresada no debe ser mayor que 125 años',
		'Validar edad integrante no ha validado que la edad no sea mayor que 150 años'
	);
	console.assert(
		validarEdadIntegrante('20') === '',
		'Validad edad integrante no ha validado con una edad correcta'
	);
}

probarValidarNumerosMiembrosFamilia();
probarValidadEdadIntegrante();

