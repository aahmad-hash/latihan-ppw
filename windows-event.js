const statuswindow = document.getElementById("statuswindow");

document.addEventListener("DOMContentLoaded", function () {
  console.log("Sistem: Struktur HTML sudah siap digunakan.");
});

window.addEventListener("resize", function () {
  const lebar = window.innerWidth;
  const tinggi = window.innerHeight;

  statuswindow.textContent =
    "Ukuran layar: " + lebar + "px x " + tinggi + "px";
});