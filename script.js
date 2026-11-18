
/* =====================================
   ELEMENTOS
===================================== */

const portada = document.getElementById("portada");
const historia = document.getElementById("historia");
const boton = document.getElementById("abrir");
const fondoCorazones = document.getElementById("hearts");

let cartaAbierta = false;
let corazonesIniciados = false;


/* =====================================
   APERTURA DEL SOBRE
===================================== */

boton.addEventListener("click", () => {

    if (cartaAbierta) return;

    cartaAbierta = true;
    boton.disabled = true;

    // PASO 1: ABRIR LA SOLAPA
    portada.classList.add("abriendo");


    // PASO 2: SACAR LA CARTA
    setTimeout(() => {

        portada.classList.add("saliendo");

    }, 850);


    // PASO 3: EXPANDIR LA CARTA
    setTimeout(() => {

        portada.classList.add("expandida");

    }, 1800);


    // PASO 4: MOSTRAR LOS RECUERDOS
    setTimeout(() => {

        historia.style.display = "block";

        observarRecuerdos();
        iniciarCorazones();

        window.scrollTo(0, 0);

        portada.classList.add("finalizada");

        // Retirar la portada
        setTimeout(() => {

            portada.style.display = "none";

        }, 750);

    }, 3050);

});


/* =====================================
   APARICIÓN DE FOTOGRAFÍAS
===================================== */

function observarRecuerdos() {

    const recuerdos = document.querySelectorAll(".recuerdo");

    if (!("IntersectionObserver" in window)) {

        recuerdos.forEach(recuerdo => {
            recuerdo.classList.add("visible");
        });

        return;
    }

    const observador = new IntersectionObserver((entradas, observer) => {

        entradas.forEach(entrada => {

            if (entrada.isIntersecting) {

                entrada.target.classList.add("visible");

                observer.unobserve(entrada.target);

            }

        });

    }, {
        threshold: 0.15
    });

    recuerdos.forEach(recuerdo => {
        observador.observe(recuerdo);
    });

}


/* =====================================
   CORAZONES FLOTANTES
===================================== */

function iniciarCorazones() {

    if (corazonesIniciados) return;

    corazonesIniciados = true;

    const simbolos = ["❤️", "💕", "💗", "💖", "💘"];

    setInterval(() => {

        const corazon = document.createElement("span");

        corazon.textContent =
            simbolos[Math.floor(Math.random() * simbolos.length)];

        corazon.style.left = Math.random() * 100 + "vw";

        corazon.style.fontSize =
            (15 + Math.random() * 20) + "px";

        fondoCorazones.appendChild(corazon);

        setTimeout(() => {
            corazon.remove();
        }, 7000);

    }, 700);

}
