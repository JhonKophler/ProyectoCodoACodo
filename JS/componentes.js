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
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links-nb');

  navToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
  });
});


//FOOTER
function Footer() {
  var footer = document.getElementsByTagName("footer")[0];
  footer.innerHTML = `<p>Ticket<span>Track</span></p>
    <p>Node.js / Buenos Aires Aprende</p>`;
}

//obtener los tickets del json y mostrarlos
function obtenerDatosDeJSON(callback) {
  fetch("/JS/tickets.json")
    .then((response) => {
      return response.json();
    })
    .then((tickets) => {
      callback(tickets);
    });
}

//funcion para mostrar los tickets html
function mostrarTickets(tickets) {
  var ticketsContainer = document.getElementById("cont-tickets");

  //para cada ticket obtenido del json se crea un html
  tickets.forEach(function (ticket) {
    var ticketCard = `
      <div class="card-nb" data-id="${ticket.id}">
          <div class="card-header-nb">
            <p id="t-prioridad" style="color: ${ticket.colorPrioridad};font-size:1.2rem;text-transform: capitalize;">${ticket.prioridad}</p>
            <p id="t-id">Nº ${ticket.id}</p>
          </div>
          <div class="card-body-nb">
            <p id="t-detalle"> ${ticket.detalle}</p>
          </div>
          <div class="card-footer-nb">
            <button type="submit" class="btn btn-primary cargarHtml"  data-id="${ticket.id}">Detalles</button>
            <p id="estado">${ticket.estado}</p>
          </div>
      </div>`;
    ticketsContainer.innerHTML += ticketCard;
  });
}

function enviarAWebTicket() {
  //creamos el evento para reconocer cuando toque el boton detalle y asi abrir la web nueva con esos datos
  document.addEventListener("DOMContentLoaded", (event) => {
    // Seleccionamos el contenedor de los tickets como el elemento padre.
    const ticketsContainer = document.getElementById("cont-tickets");

    // Agregamos el evento de clic al contenedor de tickets.
    ticketsContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("cargarHtml")) {
        const ticketId = event.target.getAttribute("data-id");
        window.location.href = `/section/ticket-detail.html?id=${ticketId}`;
      }
    });
  });
}

//funcion para Cargar "section/ticket-detail.html" con la info del ticket seleccionado
function cargarTicketsDeleccionado() {
  document.addEventListener("DOMContentLoaded", (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const ticketId = urlParams.get("id");

    if (ticketId) {
      // Cargar los datos del JSON
      fetch("/JS/tickets.json")
        .then((response) => response.json())
        .then((tickets) => {
          const ticket = tickets.find((t) => t.id == ticketId);

          if (ticket) {
            console.log(ticket);
            const ticketDetails = document.getElementById("details");
            var ticketArmado = `
              <div class="detail-card">
                <div class="detail-card-header">
                    <div class="cajaAlineadoraCabecera">
                      <p style="text-transform: capitalize;"><strong>Prioridad</strong></p>
                      ${ticket.prioridad}
                    </div>
                    <div class="cajaAlineadoraCabecera">
                      <p><strong>Ticket</strong></p>
                      Nº ${ticket.id}
                    </div>
                    <div class="cajaAlineadoraCabecera">
                      <p><strong>Usuario</strong></p>
                      ${ticket.user}
                    </div>
                    
                </div>
                <hr class="border border-primary border-3 opacity-75 w-10">
                <div class="detail-card-body">
                    <h2><strong>${ticket.titulo}</strong></h2>
                    <p><strong>Detalle:</strong> ${ticket.detalle}</p>
                </div>
                <hr class="border border-primary border-3 opacity-75 w-10">
                <div class="botonesAcciones">
                  <button onClick=window.history.back(); type="button" class="btn btn-dark">Volver</button>
                  <aside>
                    <button type="button" class="btn btn-success">Resolver</button>
                    <button type="button" class="btn btn-danger">Cancelar</button>
                  </aside>
                </div>
            </div>`;
            ticketDetails.innerHTML = ticketArmado;
          } else {
            console.error("Ticket no encontrado");
          }
        })
        .catch((error) => {
          console.error("Error al cargar los datos del ticket:", error);
        });
    } else {
      console.error("ID del ticket no especificado en la URL");
    }
  });
}
