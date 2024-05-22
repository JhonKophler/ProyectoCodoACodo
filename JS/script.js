const initSlider = () => {
    const caja = document.querySelector(".caja-contenedor caja")

    const slideButton = document.querySelector(".caja-contenedor slide-button")

    //mueve los comentarios según las flechas

    slideButton.forEach(button => {
        button.addEventListener("click", () =>{
            const direction  = button.id === "atras" ? -1 : 1;
            const scrollAmount = caja.clientWith * direction;
            caja.scrollBy({left : scrollAmount, behavior: "smooth"})
        })
    });
}


window.addEventListener("load", initSlider)