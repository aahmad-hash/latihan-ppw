const kotak = document.getElementById("kotakInteraktif")

kotak.addEventListener("mouseover",function(){
    kotak.style.backgroundColor = "#e74c3c";
    kotak.textContent = "Mouse Masuk!";

});

kotak.addEventListener("Mouseout", function(){
    kotak.style.backgroundColor = "#3498db";
    kotak.textContent = "Arahkan Mouse Ke Sini";

});