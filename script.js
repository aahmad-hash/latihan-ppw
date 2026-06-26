// 1. Seleksi Elemen DOM
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const todoCount = document.getElementById("todo-count");
const clearAllBtn = document.getElementById("clear-all");

// 2. Event Listener saat Form di-Submit
todoForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Mencegah reload halaman

  const taskText = todoInput.value.trim();

  // ===== [POIN B] VALIDASI INPUT =====
  // 1. Cek apakah input kosong / hanya berisi spasi
  if (taskText === "") {
    alert("Tugas tidak boleh kosong!");
    return; // Hentikan eksekusi, jangan lanjut membuat item
  }

  // 2. Cek apakah tugas sudah ada di dalam daftar (DOM Traversal)
  const existingItems = todoList.querySelectorAll("li .form-check span");
  const isDuplicate = Array.from(existingItems).some(
    (span) => span.innerText.trim().toLowerCase() === taskText.toLowerCase()
  );

  if (isDuplicate) {
    alert("Tugas ini sudah ada di dalam daftar!");
    return; // Hentikan eksekusi, jangan tambahkan duplikat
  }
  // ===== AKHIR VALIDASI =====

  createTodoItem(taskText);
  todoInput.value = ""; // Kosongkan input setelah submit
  updateSummary();
});

// 3. Fungsi untuk Membuat Elemen To-Do Baru (DOM Manipulation)
function createTodoItem(text) {
  // Membuat elemen <li> baru
  const li = document.createElement("li");
  li.className =
    "list-group-item d-flex justify-content-between align-items-center animate__animated animate__fadeIn";

  // Membuat container untuk teks dan checkbox
  const taskContainer = document.createElement("div");
  taskContainer.className = "form-check d-flex align-items-center gap-2";

  // Membuat Checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "form-check-input me-2 mt-0";

  // Membuat Label Teks
  const label = document.createElement("span");
  label.innerText = text;

  // Menggabungkan checkbox dan label ke container
  taskContainer.appendChild(checkbox);
  taskContainer.appendChild(label);

  // Membuat Tombol Hapus (Delete)
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-sm btn-link text-danger p-0 border-0";
  deleteBtn.innerHTML = '<i class="bi bi-trash3-fill"></i>';

  // Menggabungkan semuanya ke dalam elemen <li>
  li.appendChild(taskContainer);
  li.appendChild(deleteBtn);

  // Menambahkan <li> ke dalam <ul> di HTML
  todoList.appendChild(li);

  // --- Event Listener Internal untuk Setiap Item ---

  // Event saat Checkbox dicentang (Coret Tugas)
  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      label.classList.add("completed");
    } else {
      label.classList.remove("completed");
    }
    updateSummary();
  });

  // Event saat Tombol Hapus diklik
  deleteBtn.addEventListener("click", function () {
    li.remove(); // Menghapus elemen li dari DOM
    updateSummary();
  });

  // ===== [POIN A] EVENT LISTENER UNTUK EDIT (DOUBLE-CLICK) =====
  label.addEventListener("dblclick", function () {
    // Ambil teks yang sedang ditampilkan pada label
    const currentText = label.innerText;

    // Membuat elemen <input type="text"> baru untuk mengganti <span>
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = currentText;
    editInput.className = "form-control form-control-sm";

    // Mengganti elemen <span> (label) dengan <input> di dalam taskContainer
    taskContainer.replaceChild(editInput, label);

    // Fokuskan kursor langsung ke input agar siap diketik
    editInput.focus();

    // Fungsi untuk menyimpan hasil edit dan mengembalikan <input> menjadi <span>
    function saveEdit() {
      const newText = editInput.value.trim();

      // Jika hasil edit kosong, kembalikan ke teks semula (tidak boleh kosong)
      if (newText === "") {
        label.innerText = currentText;
      } else {
        label.innerText = newText;
      }

      // Mengembalikan <input> menjadi <span> kembali
      taskContainer.replaceChild(label, editInput);
    }

    // Event saat tombol Enter ditekan -> simpan edit
    editInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        saveEdit();
      }
    });

    // Event saat input kehilangan fokus (blur) -> simpan edit juga
    editInput.addEventListener("blur", function () {
      saveEdit();
    });
  });
  // ===== AKHIR FITUR EDIT =====
}

// 4. Event Listener untuk Tombol "Hapus Semua"
clearAllBtn.addEventListener("click", function () {
  if (confirm("Apakah Anda yakin ingin menghapus semua tugas?")) {
    todoList.innerHTML = ""; // Mengosongkan seluruh isi list
    updateSummary();
  }
});

// 5. Fungsi untuk Memperbarui Summary (Jumlah Tugas & Tombol Clear)
function updateSummary() {
  const totalItems = todoList.children.length;

  // Menghitung berapa yang belum dicentang
  const activeItems = Array.from(
    todoList.querySelectorAll(".form-check-input"),
  ).filter((checkbox) => !checkbox.checked).length;

  todoCount.innerText = `${activeItems} tugas tersisa`;

  // Tampilkan tombol "Hapus Semua" jika ada minimal 1 tugas
  if (totalItems > 0) {
    clearAllBtn.classList.remove("d-none");
  } else {
    clearAllBtn.classList.add("d-none");
  }
}