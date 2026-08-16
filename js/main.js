/* =========================================
   ELEMENTOS
========================================= */

const pantallaInicial =
    document.getElementById("pantalla-inicial");

const botonComenzar =
    document.getElementById("btn-comenzar");

const pantallaFrases =
    document.getElementById("pantalla-frases");

const frase =
    document.getElementById("frase");

const pantallaPastel =
    document.getElementById("pantalla-pastel");


/* =========================================
   ELEMENTOS FASE 3
========================================= */

const btnEncender =
    document.getElementById("btn-encender");

const btnSoplar =
    document.getElementById("btn-soplar");

const flama =
    document.getElementById("flama");

const mensajePastel =
    document.getElementById("mensaje-pastel");

const pastelInteractivo =
    document.getElementById("pastel-interactivo");


/* =========================================
   FRASES
========================================= */

const frases = [

    "Bueno... tengo algo preparado 👀",

    "Y no, esta vez no te voy a decir qué es JAJA",

    "Porque si te lo digo, se arruina la sorpresa 😂",

    "Solo diré que me dio por hacer algo diferente",

    "Y que sí... me tardé más de lo que debería 😭",

    "Pero ya que llegaste hasta aquí..."

];


let fraseActual = 0;

const intervaloFrases = 3000;

let temporizadorFrases = null;


/* =========================================
   CAMBIAR FRASE
========================================= */

function cambiarFrase() {

    frase.classList.remove(
        "visible"
    );


    setTimeout(() => {

        fraseActual++;


        /* =====================================
           TERMINAR FASE 2
        ===================================== */

        if (
            fraseActual >=
            frases.length
        ) {

            clearInterval(
                temporizadorFrases
            );


            setTimeout(() => {

                iniciarParteTres();

            }, 700);


            return;
        }


        /* =====================================
           SIGUIENTE FRASE
        ===================================== */

        frase.textContent =
            frases[fraseActual];

        frase.classList.add(
            "visible"
        );

    }, 700);
}


/* =========================================
   INICIAR PARTE 3
========================================= */

function iniciarParteTres() {

    /* =====================================
       OCULTAR FASE 2
    ===================================== */

    pantallaFrases.classList.remove(
        "mostrar"
    );


    /* =====================================
       MOSTRAR FASE 3
    ===================================== */

    pantallaPastel.classList.add(
        "mostrar"
    );


    /* =====================================
       REINICIAR PASTEL
    ===================================== */

    if (flama) {

        flama.classList.remove(
            "encendida"
        );

        flama.classList.remove(
            "soplando"
        );

    }


    if (btnEncender) {

        btnEncender.disabled =
            false;

    }


    if (btnSoplar) {

        btnSoplar.disabled =
            true;

    }


    if (mensajePastel) {

        mensajePastel.textContent =
            "Enciende la vela y pide tu deseo";

    }


    if (pastelInteractivo) {

        pastelInteractivo.classList.remove(
            "soplado"
        );

    }

}


/* =========================================
   ENCENDER VELA
========================================= */

if (btnEncender) {

    btnEncender.addEventListener(
        "click",
        () => {

            /* Encender llama */

            flama.classList.remove(
                "soplando"
            );

            flama.classList.add(
                "encendida"
            );


            /* Cambiar mensaje */

            mensajePastel.textContent =
                "Ahora pide tu deseo... ✨";


            /* Desactivar encender */

            btnEncender.disabled =
                true;


            /* Activar soplar */

            btnSoplar.disabled =
                false;

        }
    );

}


/* =========================================
   SOPLAR VELA
========================================= */

if (btnSoplar) {

    btnSoplar.addEventListener(
        "click",
        () => {

            /*
               Evitamos que el usuario
               pueda pulsar varias veces.
            */

            btnSoplar.disabled =
                true;

            btnEncender.disabled =
                true;


            /* =================================
               EFECTO DE SOPLIDO
            ================================= */

            flama.classList.add(
                "soplando"
            );


            /*
               El pastel hace un pequeño
               movimiento.
            */

            pastelInteractivo.classList.add(
                "soplado"
            );


            /* =================================
               MENSAJE DURANTE EL SOPLIDO
            ================================= */

            mensajePastel.textContent =
                "¡Sopla! 💨";


            /* =================================
               APAGAR LLAMA
               Después de la inclinación
            ================================= */

            setTimeout(() => {

                flama.classList.remove(
                    "encendida"
                );

            }, 420);


            /* =================================
               HUMO
            ================================= */

            setTimeout(() => {

                crearHumo();

            }, 430);


            /* =================================
               ESPERAR 1.5 SEGUNDOS
               DESPUÉS DE SOPLAR
            ================================= */

            setTimeout(() => {

                crearConfeti();

                mensajePastel.textContent =
                    "¡Deseo pedido! 🎉";

            }, 1500);


            /* =================================
               TERMINAR FASE 3
            ================================= */

            setTimeout(() => {

                pantallaPastel.classList.add(
                    "completada"
                );

            }, 3600);


            /* =================================
               PREPARAR FASE 4
            ================================= */

            setTimeout(() => {

                iniciarParteCuatro();

            }, 5000);

        }
    );

}


/* =========================================
   CREAR HUMO
========================================= */

function crearHumo() {

    for (
        let i = 0;
        i < 6;
        i++
    ) {

        const humo =
            document.createElement(
                "div"
            );


        humo.className =
            "humo";


        humo.style.left =
            `calc(50% + ${(Math.random() - .5) * 18}px)`;


        humo.style.animationDelay =
            `${i * .12}s`;


        pantallaPastel.appendChild(
            humo
        );


        setTimeout(() => {

            humo.remove();

        }, 2200);

    }

}


/* =========================================
   CREAR CONFETI
   DESDE LA PARTE SUPERIOR
========================================= */

function crearConfeti() {

    const cantidad =
        window.innerWidth <= 600
            ? 45
            : 70;


    for (
        let i = 0;
        i < cantidad;
        i++
    ) {

        const pieza =
            document.createElement(
                "div"
            );


        pieza.className =
            "confeti";


        /*
           IMPORTANTE:

           El confeti NO aparece
           desde el pastel.

           Empieza arriba de la pantalla.
        */

        const posicionInicial =
            Math.random() *
            100;


        pieza.style.left =
            `${posicionInicial}%`;


        pieza.style.top =
            `${-30 - Math.random() * 120}px`;


        /*
           Caída ligeramente hacia
           los lados.
        */

        const movimientoX =
            (Math.random() - .5)
            * (
                window.innerWidth <= 600
                    ? 180
                    : 360
            );


        const movimientoY =
            window.innerHeight
            + 100;


        const rotacion =
            Math.random()
            * 1200
            - 600;


        pieza.style.setProperty(
            "--x",
            `${movimientoX}px`
        );


        pieza.style.setProperty(
            "--y",
            `${movimientoY}px`
        );


        pieza.style.setProperty(
            "--rot",
            `${rotacion}deg`
        );


        /* =================================
           TAMAÑO
        ================================= */

        pieza.style.width =
            `${Math.random() * 7 + 6}px`;


        pieza.style.height =
            `${Math.random() * 11 + 9}px`;


        /* =================================
           COLOR
        ================================= */

        pieza.style.background =
            obtenerColorConfeti();


        /* =================================
           RETRASO ALEATORIO
        ================================= */

        pieza.style.animationDelay =
            `${Math.random() * .5}s`;


        /* =================================
           DURACIÓN
        ================================= */

        pieza.style.animationDuration =
            `${Math.random() * .8 + 2.4}s`;


        pantallaPastel.appendChild(
            pieza
        );


        setTimeout(() => {

            pieza.remove();

        }, 4000);

    }

}


/* =========================================
   COLORES DEL CONFETI
========================================= */

function obtenerColorConfeti() {

    const coloresConfeti = [

        "#ff5c8a",

        "#ffd166",

        "#72d6ff",

        "#b987ff",

        "#7ee081",

        "#ffffff"

    ];


    return coloresConfeti[
        Math.floor(
            Math.random()
            * coloresConfeti.length
        )
    ];

}


/* =========================================
   FASE 4
========================================= */

function iniciarParteCuatro() {

    /*
       La Fase 4 todavía no se muestra.

       Dejamos preparada la transición
       para agregar después:

       FELIZ CUMPLEAÑOS
       +
       FUEGOS ARTIFICIALES
    */

    console.log(
        "Parte 3 terminada. Fase 4 lista para agregar."
    );

}


/* =========================================
   CANVAS DE PARTICULAS
========================================= */

const canvas =
    document.getElementById("particulas");

const ctx =
    canvas.getContext("2d");


/* =========================================
   AJUSTAR CANVAS
========================================= */

function ajustarCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}


ajustarCanvas();


window.addEventListener(
    "resize",
    ajustarCanvas
);


/* =========================================
   PARTICULAS
========================================= */

const particulas = [];


const colores = [

    "#ffffff",

    "#ffe066",

    "#87cefa",

    "#ffd1e3"

];


for (
    let i = 0;
    i < 120;
    i++
) {

    particulas.push({

        x:
            Math.random() *
            canvas.width,

        y:
            Math.random() *
            canvas.height,

        radio:
            Math.random() *
            3 + 1,

        color:
            colores[
                Math.floor(
                    Math.random() *
                    colores.length
                )
            ],

        alpha:
            Math.random() *
            .5 + .5,

        velAlpha:
            (
                Math.random() *
                .01 + .005
            ) *
            (
                Math.random() < .5
                    ? -1
                    : 1
            ),

        dx:
            (
                Math.random() -
                .5
            ) * .3,

        dy:
            (
                Math.random() -
                .5
            ) * .3

    });

}


/* =========================================
   ANIMAR PARTICULAS
========================================= */

function animar() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    for (
        const p of particulas
    ) {

        p.x += p.dx;

        p.y += p.dy;


        /* Rebote horizontal */

        if (
            p.x < 0 ||
            p.x > canvas.width
        ) {

            p.dx *= -1;

        }


        /* Rebote vertical */

        if (
            p.y < 0 ||
            p.y > canvas.height
        ) {

            p.dy *= -1;

        }


        /* Parpadeo */

        p.alpha +=
            p.velAlpha;


        if (
            p.alpha > 1 ||
            p.alpha < .35
        ) {

            p.velAlpha *= -1;

        }


        /* Dibujar */

        ctx.beginPath();


        ctx.arc(
            p.x,
            p.y,
            p.radio,
            0,
            Math.PI * 2
        );


        ctx.globalAlpha =
            p.alpha;


        ctx.fillStyle =
            p.color;


        ctx.fill();

    }


    ctx.globalAlpha = 1;


    requestAnimationFrame(
        animar
    );

}


animar();


/* =========================================
   BOTON COMENZAR
========================================= */

botonComenzar.addEventListener(
    "click",
    () => {

        /* Evitar doble clic */

        botonComenzar.disabled =
            true;


        /* =================================
           FASE 1 → FASE 2
        ================================= */

        pantallaInicial.classList.add(
            "oculto"
        );


        setTimeout(() => {

            pantallaFrases.classList.add(
                "mostrar"
            );


            setTimeout(() => {

                fraseActual = 0;


                frase.textContent =
                    frases[fraseActual];


                frase.classList.add(
                    "visible"
                );


                temporizadorFrases =
                    setInterval(
                        cambiarFrase,
                        intervaloFrases
                    );


            }, 300);


        }, 600);

    }
);