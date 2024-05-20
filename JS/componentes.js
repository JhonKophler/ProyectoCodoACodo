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
      <a href="../section/support.html">Soporte</a>
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
  fetch("/JS/datos.json")
    .then((response) => {
      return response.json();
    })
    .then((tickets) => {
      callback(tickets);
    });
}

//traer los datos de tickets desde jsonBin
const API_URL = "https://api.jsonbin.io/v3/b/664aed7bad19ca34f86c3849";
const X_MASTER_KEY =
  "$2a$10$RH7T4kckhXc3mWGFEHfWDuCPWUMikILghB/fQxqTz3/BbByE4zR1e";
const X_ACCESS_KEY =
  "$2a$10$RH7T4kckhXc3mWGFEHfWDuCPWUMikILghB/fQxqTz3/BbByE4zR1e";

async function obtenerDatosDeApi() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        "X-Master-Key": X_MASTER_KEY,
        "X-Access-Key": X_ACCESS_KEY,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data.record; // Los datos están bajo la clave 'record' en la respuesta
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}

// Define la variable global
let LISTA_TICKETS_GLOBAL = [];

document.addEventListener("DOMContentLoaded", async () => {
  LISTA_TICKETS_GLOBAL = await obtenerDatosDeApi();
});

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
  const ticketsContainer = document.getElementById("cont-tickets");
  ticketsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("cargarHtml")) {
      const varTicketId = event.target.getAttribute("data-id");
      window.location.href = `/section/ticket-detail.html?idTicket=${varTicketId}`;
    }
  });
}

//funcion para Cargar "section/ticket-detail.html" con la info del ticket seleccionado
function cargarTicketSeleccionado() {
  const urlParams = new URLSearchParams(window.location.search);
  const ticketId = urlParams.get("idTicket");
  const tickets = LISTA_TICKETS_GLOBAL;
  const ticket = tickets.find((t) => t.idTicket == ticketId);

  //console.log(ticket);

  if (ticket) {
    const ticketDetails = document.getElementById("details");
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
function insertarUltimoIdTicket(tickets) {
  // Ordenamos con SORT
  tickets.sort((a, b) => new Date(b.fechaCarga) - new Date(a.fechaCarga));

  const divIdTicketElement = document.getElementById("idTicketModal");
  const inputFormIdTicket = document.getElementById("idTicketCalculado");
  const ticketCalculado = parseInt(tickets[0].idTicket) + 1;

  divIdTicketElement.innerHTML = "Ticket Nº " + ticketCalculado;
  inputFormIdTicket.value = ticketCalculado.toString();
}

function generarUserID() {
  return crypto.randomUUID();
}

function verificarUserID() {
  let userUUID = localStorage.getItem("userUUID");
  if (!userUUID) {
    userUUID = generateUUID();
    localStorage.setItem("userUUID", userUUID);
  }
  return userUUID;
}

function enviarFormulario() {
  const form = document.getElementById("formTicketModal");
  //const enviarForm = document.getElementById("submitFormularioModal");
  //enviarForm.click();
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

    const formData = new FormData(form);
    const jsonData = {
      idTicket: formData.get("idTicketCalculado"),
      idPrioridad: formData.get("idPrioridad"),
      isEstado: formData.get("idEstado"),
      user: formData.get("user"),
      motivo: formData.get("motivo"),
      detalle: formData.get("detalle"),
      fechaCarga: new Date().toString(), // Formato de fecha estándar
      pokeAvatar: formData.get("pokeAvatar"),
    };

    fetch(API_URL, {
      // Reemplaza <ID_DEL_BIN> con tu ID de bin
      method: "POST",
      headers: {
        "X-Master-Key": X_MASTER_KEY,
        "X-Access-Key": X_ACCESS_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Datos enviados correctamente a JSON Bin");
          // Aquí puedes hacer algo después de enviar los datos exitosamente
        } else {
          console.error("Error al enviar los datos a JSON Bin");
        }
      })
      .catch((error) => {
        console.error("Error de red:", error);
      });

    form.submit();
  });
}
