const form = document.getElementById("FormPendaftaran");
const pilihanJurusan =  document.getElementById("PilihJurusan");

pilihanJurusan.addEventListener("change", function() {
    if(pilihanJurusan.value === ""){
        alert("Anda Memilih Jurusan : " + pilihanJurusan.value);
    } 
});

form.addEventListener("submit", function(event){
    event.preventDefault();
    const nama = document.getElementById("inputNama").value;
    alert("Pendafatran atas nama " + nama + "berhasil diproses");

});