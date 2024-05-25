//funciones
// function Ordenar() {
//   // Reordena los elementos de manera aleatoria
//   listaElementos.sort(function (a, b) {
//     return 0.5 - Math.random();
//   });

//   // Elimina todos los elementos del contenedor
//   var contenedor = document.querySelector(".container");
//   contenedor.innerHTML = "";

//   // Agrega los elementos reordenados al contenedor
//   listaElementos.forEach(function (elemento) {
//     contenedor.appendChild(elemento);
//   });
// }

//componentes
//NAVBAR
function Navbar() {
  var miNav = document.getElementsByClassName("navbar-nb")[0];
  miNav.innerHTML = `
    <div class="brand-container">
      <a href="../index.html">
        <img src="../assets/img/ticket-logo.png" alt="ticket-logo" />
        <p>Ticket<span>Track</span></p>
      </a>
    </div>
    <button class="nav-toggle" aria-label="Toggle navigation">
      <i class="fas fa-bars"></i>
    </button>
    <div class="nav-links-nb">
      <a href="../section/user.html"><i class="fa-solid fa-user"></i></a>
      <a href="../index.html">Inicio</a>
      <a href="../section/ticket-crud.html">Ticket</a>
      <a href="../section/about-us.html">Nosotros</a>
      <a href="../section/support.html">Faqs</a>
    </div>`;
}

// navbar toggle
document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links-nb");

  navToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });
});

//FOOTER
function Footer() {
  var footer = document.getElementsByTagName("footer")[0];
  footer.innerHTML = `<p>Ticket<span>Track</span></p>
    <p>Node.js / Buenos Aires Aprende</p>`;
}

const prioridadPorID = {
  1: { palabra: "Baja", color: "#008000" }, // Verde
  2: { palabra: "Media", color: "#ffa500" }, // Naranja
  3: { palabra: "Urgente", color: "#ff0000" }, // Rojo
};

const estadoTicketID = {
  0: { palabra: "En Espera", color: "#808080" }, // Gris
  1: { palabra: "Resuelto", color: "#008000" }, // Verde
  2: { palabra: "Cancelado", color: "#ff0000" }, // Naranja
  3: { palabra: "Terminado", color: "#00e7ff" }, // Cian
};

//obtener los tickets del json y mostrarlos
function obtenerDatosDeJSON(callback) {
  fetch("/JS/tickets.json")
    .then((response) => response.json())
    .then((tickets) => {
      callback(tickets);
    })
    .catch((error) => {
      console.error("Error al obtener los datos del JSON:", error);
      callback([]); // Devolver una lista vacía en caso de error
    });
}

//funcion para mostrar los tickets html
function mostrarTickets(lista) {
  var ticketsContainer = document.getElementById("cont-tickets");

  //para cada ticket obtenido del json se crea un html
  lista.forEach(function (t) {
    var ticketCard = `
      <div class="card-nb" data-id="${t.idTicket}">
          <div class="card-header-nb">
            <p id="t-prioridad" style="color: ${
              prioridadPorID[t.idPrioridad].color
            };font-size:1.2rem;text-transform: capitalize;font-weight: 700;">${
      prioridadPorID[t.idPrioridad].palabra
    }</p>
            <p id="t-id">Nº ${t.idTicket}</p>
          </div>
          <div class="card-body-nb">
            <p id="t-detalle"> ${t.detalle}</p>
          </div>
          <div class="card-footer-nb">
            <button type="submit" class="btn btn-primary cargarHtml"  data-id="${
              t.idTicket
            }">Detalles</button>
            <p id="estado" style="color: ${
              estadoTicketID[t.idEstado].color
            };font-size:1.2rem;text-transform: capitalize;font-weight: 700;">${
      estadoTicketID[t.idEstado].palabra
    }</p>
          </div>
      </div>`;
    ticketsContainer.innerHTML += ticketCard;
  });
}

function enviarAWebTicket() {
  let ticketsContainer = document.getElementById("cont-tickets");
  ticketsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("cargarHtml")) {
      let varTicketId = event.target.getAttribute("data-id");
      window.location.href = `/section/ticket-detail.html?idTicket=${varTicketId}`;
    }
  });
}

//funcion para Cargar "section/ticket-detail.html" con la info del ticket seleccionado
function cargarTicketSeleccionado(lista) {
  var urlParams = new URLSearchParams(window.location.search);
  var ticketId = urlParams.get("idTicket");
  var ticket = lista.find((t) => t.idTicket == ticketId);

  console.log(ticket);

  if (ticket) {
    var ticketDetails = document.getElementById("details");
    var ticketArmado = `
          <div class="detail-card">
            <div class="detail-card-header">
                <div class="cajaAlineadoraCabecera">
                    <p style="text-transform: capitalize;"><strong>Prioridad</strong></p>
                    ${prioridadPorID[ticket.idPrioridad].palabra}
                </div>
                <div class="cajaAlineadoraCabecera">
                    <p><strong>Ticket</strong></p>
                    Nº ${ticket.idTicket}
                </div>
                <div class="cajaAlineadoraCabecera">
                    <p><strong>Usuario</strong></p>
                    ${ticket.user}
                </div>
            </div>
            <hr class="border border-primary border-3 opacity-75 w-10" style="margin-bottom:0!important;">
            <div class="fechaCarga"><p>Creado ${formatearFecha(
              ticket.fechaCarga
            )}</p></div>
            <div class="detail-card-body">
                <h5><strong>${ticket.motivo}</strong></h5>
                <p><strong>Detalle</strong><br> ${ticket.detalle}</p>
                <hr class="border border-primary border-3 opacity-75 w-10">
                <div class="botonesAcciones">
                    <button onClick=window.history.back(); type="button" class="btn btn-dark">Volver</button>
                    <aside>
                        <button type="button" class="btn btn-success">Resolver</button>
                        <button type="button" class="btn btn-danger">Cancelar</button>
                    </aside>
                </div>
            </div>
          </div>`;
    ticketDetails.innerHTML = ticketArmado;
  }
}

function formatearFecha(fechaString) {
  // Reemplazamos el espacio por 'T' para que el constructor Date lo entienda
  let fechaISO = fechaString.replace(" ", "T");

  // Creamos un objeto Date
  let fecha = new Date(fechaISO);

  // Configuramos las opciones para formatear la fecha
  let opciones = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true, // Para usar formato de 12 horas (AM/PM)
  };

  // Utilizamos Intl.DateTimeFormat para formatear la fecha
  let fechaFormateada = new Intl.DateTimeFormat("es-ES", opciones).format(
    fecha
  );

  return fechaFormateada;
}

function obtenerFechaActual() {
  const fechaElement = document.getElementById("fechaActual");
  const fecha = new Date();
  const opciones = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const fechaFormateada = fecha.toLocaleDateString("es-ES", opciones);
  fechaElement.textContent = fechaFormateada;
}

//Espera una lista de tickets asi los acomoda y trae el ultimo primero
function calcularUltimoIdTicket(tickets) {
  // Ordenamos con SORT
  tickets.sort((a, b) => new Date(b.idTicket) - new Date(a.idTicket));

  var divIdTicketElement = document.getElementById("idTicketModal");
  var inputFormIdTicket = document.getElementById("idTicketCalculado");
  var ticketCalculado = parseInt(tickets[0].idTicket) + 1;

  divIdTicketElement.innerHTML = "Ticket Nº " + ticketCalculado;
  inputFormIdTicket.value = ticketCalculado.toString();
}

////////////////////////////////////////////////////////////////////

let key = "fae56571493a445c18bb37686ef46ad0";
let ciudad = document.getElementById("city");
let boton = document.getElementById("btn-w");
let resultado = document.getElementById("resultado");

let get_weather = () => {
  let city_name = ciudad.value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${key}&units=metric`;
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      console.log("La temperatura es" + data.temp.main + "°");
      console.log(data);
      resultado.innerHTML = `<h3>${data.name}</h3>
    <h3>${data.temp.main}</h3>`;
    });
};
//boton.addEventListener("click", get_weather);

function tomarDatosDelForm(form) {
  // Recolectar los datos del formulario
  const formData = new FormData(form);
  const jsonData = {
    userId: "",
    idTicket: parseInt(formData.get("idTicketCalculado"), 16),
    idPrioridad: parseInt(formData.get("idPrioridad"), 16),
    isEstado: parseInt(formData.get("idEstado"), 16),
    user: formData.get("user"),
    motivo: formData.get("motivo"),
    detalle: formData.get("detalle"),
    fechaCarga: new Date().toISOString(), // Formato de fecha estándar
    idUsuarioQueResolvio: null,
    pokeAvatar: formData.get("pokeAvatar"),
  };

  // Devolver los datos como JSON string
  return jsonData;
}

function mostrarTicketCreadoRecien(paqueteDatos) {
  const divDatos = document.getElementById("modalPadre");

  divDatos.innerHTML = `<div class="card mb-3" style="width: 500px;user-select: none;">
  <div class="row g-0">
    <div class="col-md-4 card-dentro-del-modal">
    </div>
    <div class="col-md-8" style="display: flex !important;
    justify-content: center !important;
    align-items: center !important;" >
      <div class="card-body">
        <h5 class="card-title">😁Ticket Enviado Exitosamente!</h5>
        <p class="card-text">Gracias ${paqueteDatos.user} por confiar en nosotros!</p>
        <p class="card-text"><small class="text-body-secondary">En los proximos dias recibiras noticias de tu ticket</small></p>
      </div>
    </div>
  </div>
</div>`; // Mostrar los datos en el div

  // Cerrar el div después de 4 segundos
  setTimeout(function () {
    divDatos.style.display = "none";

    // Simular envío de formulario y redirigir a tickets.html
    window.location.href = "ticket-crud.html";
  }, 4000);
}
