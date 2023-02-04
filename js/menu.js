
//MENU:
document.querySelector('#boton-iniciar-tarea1').onclick = function (event) {
	botonDeIniciarTarea1();

	event.preventDefault();
};

document.querySelector('#pseudo-retroceder').onclick = function (event) {
	botonOcultarFormulario1();
	event.preventDefault();
};
document.querySelector('#boton-iniciar-tarea2').onclick = function (event) {
	botonDeIniciarTarea2();

	event.preventDefault();
};
document.querySelector('#pseudo-retroceder2').onclick = function (event) {
	botonOcultarFormulario2();
	event.preventDefault();
};
function botonDeIniciarTarea1() {
	const $formulario = document.querySelector('#formulario-edad');
	const $butoniniciar = document.querySelector('#inicio');
	$formulario.className = '';
	$butoniniciar.className = 'oculto';
}
function botonOcultarFormulario1() {
	const $formulario = document.querySelector('#formulario-edad');
	const $butoniniciar = document.querySelector('#inicio');
	$formulario.className = 'oculto';
	$butoniniciar.className = '';
}
function botonDeIniciarTarea2() {
	const $formularioSalario = document.querySelector('#formulario-salario');
	const $butoniniciar = document.querySelector('#inicio');
	$formularioSalario.className = '';
	$butoniniciar.className = 'oculto';
}
function botonOcultarFormulario2() {
	const $formulario = document.querySelector('#formulario-salario');
	const $butoniniciar = document.querySelector('#inicio');
	$formulario.className = 'oculto';
	$butoniniciar.className = '';
}
