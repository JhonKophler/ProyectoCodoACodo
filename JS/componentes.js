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
    <div class="nav-links-nb">
      <a href="../section/user.html"><i class="fa-solid fa-user"></i></a>
      <a href="../index.html">Inicio</a>
      <a href="../section/ticket-crud.html">Ticket</a>
      <a href="../section/about-us.html">Nosotros</a>
      <a href="../section/support.html">Soporte</a>
    </div>`;
}

//FOOTER
function Footer() {
  var footer = document.getElementsByTagName("footer")[0];
  footer.innerHTML = `<p>Ticket<span>Track</span></p>
    <p>Node.js / Buenos Aires Aprende</p>`;
}


//obtener los tickets del json y mostrarlos 

function cargarTickets() {
  fetch('/JS/tickets.json')
    .then(response => {
      return response.json();
    })
    .then(tickets => {
      mostrarTickets(tickets);
    })
}

//funcion para mostrar los tickets html

function mostrarTickets(tickets) {
  var ticketsContainer = document.getElementById("cont-tickets");

  //para cada ticket obtenido del json se crea un html
  tickets.forEach(function (ticket) {
    var ticketCard = `
      <div class="card-nb">
          <div class="card-header-nb">
              <p id="t-prioridad">${ticket.prioridad}</p>
              <div style="background: ${ticket.colorPrioridad};" class="card-header-circle-nb"></div>
          </div>
          <div class="card-body-nb">
              <p id="t-id"> ${ticket.id}</p>
              <p id="estado">${ticket.estado}</p>
              <p id="t-detalle"> ${ticket.detalle}</p>
          </div>
          <div class="card-footer-nb">
              <p id="t-fechaCarga"> ${ticket.fechaCarga}</p>
              <button type="submit" class="btn btn-primary"><a href="./ticket-detail.html">Detalles</a></button>
          </div>
      </div>`;
    ticketsContainer.innerHTML += ticketCard;
  });
}

// ticketsHTML += "<li>ID: " + ticket.id + ", Prioridad: " + ticket.prioridad + ", Usuario: " + ticket.user + ", Título: " + ticket.titulo + "</li>";
