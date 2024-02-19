//www.linkedin.com/in/frank-exequiel

let numeroSecreto = 0;
let intentos = 1;
let listaNumerosSorteados = [];
let numeroMaximo = 10;
let vidas = 3;



function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.getElementById(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    if (numeroDeUsuario === numeroSecreto && intentos <= vidas) {        
        asignarTextoElemento('pistas', `Acertaste el número secreto con ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('intentar').setAttribute('disabled', 'true');
    } else {
        //El usuario no acertó.
        if (intentos == 3) {
            asignarTextoElemento('vidasRestantes', `Vidas Restantes: ${(vidas - intentos)}`);
            asignarTextoElemento('pistas', `Ya no tienes vidas`);
            document.getElementById('intentar').setAttribute('disabled', 'true');
            document.getElementById('reiniciar').removeAttribute('disabled');
            intentos++;
        } else {
            if (numeroDeUsuario > numeroSecreto) {
                asignarTextoElemento('pistas', 'El número secreto es menor');
            } else {
                asignarTextoElemento('pistas', 'El número secreto es mayor');
            }
            asignarTextoElemento('vidasRestantes', `Vidas Restantes: ${(vidas - intentos)}`);
            intentos++;
            limpiarCaja();
        }
    }

    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
    document.getElementById('intentar').removeAttribute('disabled');
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //Si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('pistas', 'Ya se sortearon todos los números posibles');
    } else {
        //Si el numero generado está incluido en la lista 
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento('titulo', 'Juego del número secreto!');
    asignarTextoElemento('pistas', `Ingresa un número del 1 al ${numeroMaximo}`);
    asignarTextoElemento('vidasRestantes', `Vidas Restantes: ${vidas}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    console.log(numeroSecreto);
}

function reiniciarJuego() {
    //limpiar caja
    limpiarCaja();
    //Indicar mensaje de intervalo de números 
    //Generar el número aleatorio
    //Inicializar el número intentos
    condicionesIniciales();
    //Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');

}

condicionesIniciales();