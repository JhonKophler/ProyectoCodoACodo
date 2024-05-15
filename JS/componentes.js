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
function Navbar() {
  var miNav = document.getElementsByClassName("navbar-nb")[0];
  miNav.innerHTML = `<div class="brand-container">
      <img src="../assets/img/ticket-logo.png" alt="ticket-logo" />
      <p>Ticket<span>Track</span></p>
      </div>
      <div class="nav-links-nb">
      <a href="../index.html">Inicio</a>
      
      <a href="../section/ticket-crud.html">Ticket</a>
      
      <a href="../section/login-register.html">Login</a>
      
      <a href="../section/contacto.html">Contacto</a>
      </div>`;
}

// function PrioridadCard() {
//   const alta = `<p>Alta</p><div style="background: rgba(251, 4, 61, 0.5)" class="card-header-circle"></div>`;
//   const inter = `<p>Intermedia</p><div style="background: rgba(255, 242, 0, 0.824);" class="card-header-circle"></div>`;
//   const baja = `<p>Baja</p><div style="background: rgba(51, 255, 0, 0.5)" class="card-header-circle"></div>`;

//   var prioridad = document.getElementsByClassName(".card-header")[0];
//   console.log(prioridad);

// }

//componentes
function Footer() {
  var footer = document.getElementsByTagName("footer")[0];
  footer.innerHTML = `<p>Ticket<span>Track</span></p>
    <p>Soporte de ayuda</p>
  `;
}
