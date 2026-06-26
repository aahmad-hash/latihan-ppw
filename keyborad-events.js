const inputKetikan = document.getElementById("InputKetikan");
const outputTombol = document.getElementById("OutputTombol");

inputKetikan.addEventListener("keyup", function(event){
    outputTombol.textContent = event.key;

});