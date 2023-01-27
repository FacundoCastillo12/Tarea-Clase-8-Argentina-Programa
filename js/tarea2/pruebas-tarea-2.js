//Pruebas Tarea 1
function probarValidarIngreso() {
	console.assert(
		validarSalarios('') === 'El campo ingreso salario no debe estar esta vacio',
		'Validar salario no ha validado que el campo no este vacio'
	);
	console.assert(
		validarSalarios('-5') ===
			'El campo de ingreso solamente acepta numeros positivos',
		'Validar salarios no ha validado que los numeros ingresados sean positivos'
	);
	console.assert(
		validarSalarios('123456781') ===
			'El campo de ingreso acepta hasta 8 numeros',
		'Validar salarios no ha validado que unicamente haya hasta 8 numeros'
	);
	console.assert(
		validarSalarios('25000') === '',
		'Validar salarios no ha validado que el salario ingresado sea correcto'
	);
}

probarValidarIngreso();

