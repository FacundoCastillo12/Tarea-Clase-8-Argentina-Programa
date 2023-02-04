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

function calcularIngresoMensualPromedio(ingresoAnual) {
	let ingresoPromedio = ingresoAnual / 12;
	return ingresoPromedio;
}

const URL = 'http://127.0.0.1:8080';

context('Tarea 1', () => {
	describe('Verificar si los menus estan activos', () => {
		before('Probando mis formularios', () => {
			cy.visit(URL);
		});
		it('Se asegura que los dos menus estan activos', () => {
			cy.get('#boton-iniciar-tarea1').should('be.visible');
			cy.get('#boton-iniciar-tarea2').should('be.visible');
		});
	});
	describe('Asegurar ingreso al primer menu y se realizan las pruebas', () => {
		beforeEach('Probando el primer formulario', () => {
			cy.visit(URL);
			cy.contains('TAREA 1').click();
		});
		let miembrosAIngresar = 4;
		let edadMiembros = [25, 30, 40, 22];
		it('Comprobar que el formulario 1 sea visible', () => {
			cy.get('#formulario-edad').should('be.visible');
		});
		it('Ingresar miembros y calcular', () => {
			cy.get('#cantidad-miembros').type(miembrosAIngresar);
			cy.get('#cantidad-miembros').should('have.value', miembrosAIngresar);
			cy.get('#ingresar-datos').click();
			cy.get('#edades')
				.find('.miembro')
				.should('have.length', miembrosAIngresar);
			cy.get('.edades-miembros').then((miembros) => {
				cy.get(miembros[0]).type(`${edadMiembros[0]}`);
				cy.get(miembros[1]).type(`${edadMiembros[1]}`);
				cy.get(miembros[2]).type(`${edadMiembros[2]}`);
				cy.get(miembros[3]).type(`${edadMiembros[3]}`);
			});
			cy.get('#calcular')
				.click()
				.then(() => {
					cy.get('#edad-mayor').should(
						'have.text',
						`${obtenerNumeroMayor(edadMiembros)}`
					);
					cy.get('#edad-menor').should(
						'have.text',
						`${obtenerNumeroMenor(edadMiembros)}`
					);
					cy.get('#edad-promedio').should(
						'have.text',
						`${obtenerPromedio(edadMiembros)}`
					);
				});
		});
		it('Reiniciar y retroceder', () => {
			let ingresarDosMiembros = 2;
			let edadMiembros = [49, 69];
			cy.get('#cantidad-miembros').type(ingresarDosMiembros);
			cy.get('#cantidad-miembros').should('have.value', ingresarDosMiembros);
			cy.get('#ingresar-datos').click();
			cy.get('#edades')
				.find('.miembro')
				.should('have.length', ingresarDosMiembros);
			cy.get('.edades-miembros').then((miembros) => {
				cy.get(miembros[0]).type(`${edadMiembros[0]}`);
				cy.get(miembros[1]).type(`${edadMiembros[1]}`);
			});
			cy.get('#calcular')
				.click()
				.then(() => {
					cy.get('#edad-mayor').should(
						'have.text',
						`${obtenerNumeroMayor(edadMiembros)}`
					);
					cy.get('#edad-menor').should(
						'have.text',
						`${obtenerNumeroMenor(edadMiembros)}`
					);
					cy.get('#edad-promedio').should(
						'have.text',
						`${obtenerPromedio(edadMiembros)}`
					);
				});
			cy.get('#reiniciar')
				.click()
				.then(() => {
					cy.get('#resultado').should('has.class', 'oculto');
					cy.get('#resultado').should('not.be.visible');
					cy.get('.miembro').should('not.exist');
				});
			cy.get('#pseudo-retroceder')
				.click()
				.then(() => {
					cy.get('#formulario-edad').should('not.be.visible');
				});
		});
	});
	describe('Comprobar errores al ingresar numero incorrecto en ingresar miembro', () => {
		beforeEach('Probando el primer formulario', () => {
			cy.visit(URL);
			cy.contains('TAREA 1').click();
		});
		it('Ingresar numero de miembro negativo', () => {
			let numeroNegativo = -20;
			cy.get('#cantidad-miembros').type(numeroNegativo);
			cy.get('#ingresar-datos')
				.click()
				.then(() => {
					cy.get('#cantidad-miembros').should('have.class', 'error');
					cy.get('.lista-error').should(
						'have.text',
						'El numero de integrente debe ser mayor a cero'
					);
				});
		});
		it('Ingresar numero superior a dos cifras', () => {
			let numeroSuperiorDosCifras = 200;
			cy.get('#cantidad-miembros').type(numeroSuperiorDosCifras);
			cy.get('#ingresar-datos')
				.click()
				.then(() => {
					cy.get('#cantidad-miembros').should('have.class', 'error');
					cy.get('.lista-error').should(
						'have.text',
						'El campo de ingreso solo admite numero de dos cifras'
					);
				});
		});
		it('Ingresar numero decimal', () => {
			let numeroDecimal = 2.5;
			cy.get('#cantidad-miembros').type(numeroDecimal);
			cy.get('#ingresar-datos')
				.click()
				.then(() => {
					cy.get('#cantidad-miembros').should('have.class', 'error');
					cy.get('.lista-error').should(
						'have.text',
						'El campo de ingreso unicamente debe contener numeros enteros'
					);
				});
		});
		it('No ingresar valor', () => {
			cy.get('#ingresar-datos')
				.click()
				.then(() => {
					cy.get('#cantidad-miembros').should('have.class', 'error');
					cy.get('.lista-error').should(
						'have.text',
						'El campo de ingreso no debe estar vacio'
					);
				});
		});
	});
	describe('Comprobar errores al ingresar edad incorrecta', () => {
		beforeEach('Probando el primer formulario', () => {
			cy.visit(URL);
			cy.contains('TAREA 1').click();
		});
		let miembro = 1;
		it('No ingresar edad', () => {
			cy.get('#cantidad-miembros')
				.type(miembro)
				.then(() => {
					cy.get('#cantidad-miembros').should('have.value', miembro);
					cy.get('#ingresar-datos').click();
				});
			cy.get('.edades-miembros').then(() => {
				cy.get('#calcular').click();
				cy.get('.edades-miembros').should('has.id', 'error');
				cy.get('.lista-error').should(
					'have.text',
					'El campo de edad no debe estar vacio'
				);
			});
		});
		it('Ingresar numero cero', () => {
			let edad = 0;
			cy.get('#cantidad-miembros')
				.type(miembro)
				.then(() => {
					cy.get('#cantidad-miembros').should('have.value', miembro);
					cy.get('#ingresar-datos').click();
				});
			cy.get('#edades').find('.miembro').should('have.length', miembro);
			cy.get('.edades-miembros').then((miembros) => {
				cy.get(miembros).type(`${edad}`);
			});
			cy.get('#calcular')
				.click()
				.then(() => {
					cy.get('.edades-miembros').should('has.id', 'error');
					cy.get('.lista-error').should(
						'have.text',
						'El campo de edad tiene que ser mayor a cero'
					);
				});
		});
		it('Ingresar numero decimal', () => {
			let edad = 2.5;
			cy.get('#cantidad-miembros')
				.type(miembro)
				.then(() => {
					cy.get('#cantidad-miembros').should('have.value', miembro);
					cy.get('#ingresar-datos').click();
				});
			cy.get('#edades').find('.miembro').should('have.length', miembro);
			cy.get('.edades-miembros').then((miembros) => {
				cy.get(miembros).type(`${edad}`);
			});
			cy.get('#calcular')
				.click()
				.then(() => {
					cy.get('.edades-miembros').should('has.id', 'error');
					cy.get('.lista-error').should(
						'have.text',
						'El campo de edad unicamente debe contener numeros enteros'
					);
				});
		});
		it('Ingresar edad mayor a 125 años', () => {
			let edad = 1500;
			cy.get('#cantidad-miembros')
				.type(miembro)
				.then(() => {
					cy.get('#cantidad-miembros').should('have.value', miembro);
					cy.get('#ingresar-datos').click();
				});
			cy.get('#edades').find('.miembro').should('have.length', miembro);
			cy.get('.edades-miembros').then((miembros) => {
				cy.get(miembros).type(`${edad}`);
			});
			cy.get('#calcular')
				.click()
				.then(() => {
					cy.get('.edades-miembros').should('has.id', 'error');
					cy.get('.lista-error').should(
						'have.text',
						'La edad ingresada no debe ser mayor que 125 años'
					);
				});
		});
	});
});
context('Tarea 2', () => {
	describe('Ingresar al segundo formulario y relizar las pruebas', () => {
		beforeEach('Probando el primer formulario', () => {
			cy.visit(URL);
			cy.contains('TAREA 2').click();
		});
		it('Comprobar formulario y elemtos', () => {
			cy.get('#formulario-salario').should('be.visible');
			cy.get('button').should('be.visible');
		});
		it('Añadir integrante', () => {
			cy.get('#añadir-integrante').click().click().click().click();
			cy.get('.integrantes-añadidos').should('have.length', 4);
		});
		it('Ingresar salario de familiares', () => {
			let ingresosFamiliares = [200000, 125000, 78000, 52500];
			cy.get('#añadir-integrante').click().click().click().click();
			cy.get('.integrantes-añadidos').should('have.length', 4);
			cy.get('.integrantes-añadidos').then((miembros) => {
				cy.get(miembros[0]).type(`${ingresosFamiliares[0]}`);
				cy.get(miembros[1]).type(`${ingresosFamiliares[1]}`);
				cy.get(miembros[2]).type(`${ingresosFamiliares[2]}`);
				cy.get(miembros[3]).type(`${ingresosFamiliares[3]}`);
			});
			cy.get('#calcular-salario')
				.click()
				.then(() => {
					cy.get('#mayor-ingreso-anual').should(
						'have.text',
						`${obtenerNumeroMayor(ingresosFamiliares)}`
					);
					cy.get('#menor-ingreso-anual').should(
						'have.text',
						`${obtenerNumeroMenor(ingresosFamiliares)}`
					);
					cy.get('#promedio-ingreso-anual').should(
						'have.text',
						`${obtenerPromedio(ingresosFamiliares)}`
					);
					cy.get('#ingreso-promedio-mensual').should(
						'have.text',
						`${calcularIngresoMensualPromedio(
							obtenerPromedio(ingresosFamiliares)
						)}`
					);
				});
		});
		it('Reiniciar y retroceder', () => {
			let ingresosFamiliares = [200000, 125000];
			cy.get('#añadir-integrante').click().click();
			cy.get('.integrantes-añadidos').should('have.length', 2);
			cy.get('.integrantes-añadidos').then((miembros) => {
				cy.get(miembros[0]).type(`${ingresosFamiliares[0]}`);
				cy.get(miembros[1]).type(`${ingresosFamiliares[1]}`);
			});
			cy.get('#calcular-salario').click();

			cy.get('#reinciar-salario')
				.click()
				.then(() => {
					cy.get('#resultados-salario').should('has.class', 'oculto');
					cy.get('#resultados-salario').should('not.be.visible');
					cy.get('#calcular-salario').should('not.be.visible');
					cy.get('.div-miembros').should('not.exist');
				});
			cy.get('#pseudo-retroceder2')
				.click()
				.then(() => {
					cy.get('#formulario-salario').should('not.be.visible');
				});
		});
	});
	describe('Comprobar errores del formulario', () => {
		beforeEach('Probando el primer formulario', () => {
			cy.visit(URL);
			cy.contains('TAREA 2').click();
		});
		it('Ingresar y quitar miembros', () => {
			cy.get('#añadir-integrante').click().click();
			cy.get('.integrantes-añadidos').should('have.length', 2);
			cy.get('#quitar-integrante').click().click().click();
			cy.get('.integrantes-añadidos').should('have.length', 0);
			cy.get('#error-falta-miembro').should(
				'have.text',
				'Debes añadir integrante.'
			);
		});
		it('Campo de ingreso salario vacio', () => {
			cy.get('#añadir-integrante').click();

			cy.get('#calcular-salario')
				.click()
				.then(() => {
					cy.get('.integrantes-añadidos').should('has.id', 'error');
					cy.get('.lista-error-salarios').should(
						'have.text',
						'El campo ingreso salario no debe estar esta vacio'
					);
					cy.get('#pedido-reingresar-datos').should('be.visible');
				});
		});
		it('Ingresar numero negativo', () => {
			let ingreso = '-5000';
			cy.get('#añadir-integrante').click();
			cy.get('.integrantes-añadidos').then((miembros) => {
				cy.get(miembros[0]).type(`${ingreso}`);
			});
			cy.get('#calcular-salario')
				.click()
				.then(() => {
					cy.get('.integrantes-añadidos').should('has.id', 'error');
					cy.get('.lista-error-salarios').should(
						'have.text',
						'El campo de ingreso solamente acepta numeros positivos'
					);
					cy.get('#pedido-reingresar-datos').should('be.visible');
				});
		});
		it('Ingresar numero mayor a ocho cifras', () => {
			let ingreso = 546845678;
			cy.get('#añadir-integrante').click();
			cy.get('.integrantes-añadidos').then((miembros) => {
				cy.get(miembros[0]).type(`${ingreso}`);
			});
			cy.get('#calcular-salario')
				.click()
				.then(() => {
					cy.get('.integrantes-añadidos').should('has.id', 'error');
					cy.get('.lista-error-salarios').should(
						'have.text',
						'El campo de ingreso acepta hasta 8 numeros'
					);
					cy.get('#pedido-reingresar-datos').should('be.visible');
				});
		});
	});
});
