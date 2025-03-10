const images = document.querySelectorAll('.image');
const captionContainer = document.querySelector('.caption-container'); // Ahora selecciona por clase
const captions = [
    "Imagen 1",
    "Imagen 2",
    "Imagen 3",
    "Imagen 4",
    "Imagen 5",
];
let imgIndex = 0;

function updateImage() {
    images.forEach((img, index) => {
        img.style.display = index === imgIndex ? 'block' : 'none';
    });
    captionContainer.innerHTML = `<p>${captions[imgIndex]}</p>`; // Actualiza el texto de la imagen actual
}

function previousImg() {
    imgIndex = imgIndex > 0 ? imgIndex - 1 : images.length - 1;
    updateImage();
}

function nextImg() {
    imgIndex = imgIndex < images.length - 1 ? imgIndex + 1 : 0;
    updateImage();
}

updateImage();
