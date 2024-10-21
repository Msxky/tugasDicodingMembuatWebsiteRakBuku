/*revisi dari submission yang di tolak sebelumnya:
  1. Nama properti di dalam objek buku harus sesuai kriteria. Contoh: "judul" seharusnya "title", dsb (telah di perbaiki)
  2. Tipe data "year" seharusnya `"number"/ bukan "string"` (telah di perbaiki)
  3. Menambahkan "confirm" ketika buku di rak akan di hapus (menambahkan)
  4. Memindahkan posisi "form input" ke bagian atas agar mudah di lihat dan di jangkau (modifikasi)
  5. Menambahkan fitur search untuk mencari buku (menambahkan)
  6. Merapikan code dan menambahkan komentar (diselesaikan)
*/

// mendapatkan data dari localStorage
function getDataFromStorage() {
  const data = localStorage.getItem("books");
  return data ? JSON.parse(data) : [];
}

// menyimpan data ke localStorage
function saveDataToStorage(data) {
  localStorage.setItem("books", JSON.stringify(data));
}

// menampilkan data buku ke DOM
function renderBooks() {
  const belumSelesaiDibaca = document.getElementById("belumSelesaiDibaca");
  const selesaiDibaca = document.getElementById("selesaiDibaca");

  belumSelesaiDibaca.innerHTML = "";
  selesaiDibaca.innerHTML = "";

  books.forEach((book) => {
    const bookElement = document.createElement("li");
    bookElement.classList.add("buku");
    bookElement.style.background = "var(--color3)";
    bookElement.innerHTML = `
      <div>
        <h3>${book.title}</h3>
        <p>Penulis : <b>${book.author}</b></p>
        <p>Tahun Terbit : <b>${book.year}</b></p>
      </div>
      <div>
        <button id="btnBlue" onclick="moveToFinish(${book.id})">Selesai Dibaca</button>
        <button id="btnBlue" onclick="moveToStart(${book.id})">Belum Selesai Dibaca</button>
        <button id="btnRed" onclick="deleteBook(${book.id})">Hapus</button>
      </div>
    `;

    if (book.isComplete) {
      selesaiDibaca.appendChild(bookElement);
    } else {
      belumSelesaiDibaca.appendChild(bookElement);
    }
  });
}

// menambahkan data buku baru ke dalam rak
function addBook() {
  const title = document.getElementById("judul").value;
  const author = document.getElementById("penulis").value;
  const year = document.getElementById("tahunTerbit").value;
  const isComplete = document.getElementById("complete").checked;

  const bukuBaru = {
  id: Date.now(),
  title,
  author,
  year: parseInt(year),
  isComplete,
};

  books.push(bukuBaru);
  saveDataToStorage(books);
  renderBooks();

  // tampilan awal (kosong) form yang mau isi
  document.getElementById("judul").value = "";
  document.getElementById("penulis").value = "";
  document.getElementById("tahunTerbit").value = "";
  document.getElementById("complete").checked = false;
}

//untuk memindahkan buku ke rak yang sudah dibaca
function moveToFinish(id) {
  const index = books.findIndex((book) => book.id == id);
  if (index !== -1) {
    books[index].isComplete = true;
    saveDataToStorage(books);
    renderBooks();
  }
}

// untuk memindahkan rak ke belum dibaca
function moveToStart(id) {
  const index = books.findIndex((book) => book.id == id);
  if (index !== -1) {
    books[index].isComplete = false;
    saveDataToStorage(books);
    renderBooks();
  }
}

// untuk menghapus buku dari daftar rak
function deleteBook(id) {
  const confirmasi = confirm("Apakah kamu ingin menghapusnya?");
  const index = books.findIndex((book) => book.id == id);
  if (index !== -1 && confirmasi == true) {
    books.splice(index, 1);
    saveDataToStorage(books);
    renderBooks();
  } else if (confirmasi == false) {
    location.reload();
  }
}

// memuat data awal dari localStorage saat halaman diload
let books = getDataFromStorage();
renderBooks();

// click btn untuk tombol "tambah"
document.getElementById("addBtn").addEventListener("click", () => {
  if (document.getElementById("judul").value == 0) {
    alert("⚠ Judul harus diisi!");
  } else {
    addBook();
  }
});

// menghapus semua data di localStorage
document.getElementById("clearAllData").addEventListener("click", () => {
  const clear = prompt(`ketik "1" untuk menghapus semua buku!`);
  if (clear === "1") {
    localStorage.clear();
    alert("Buku Terhapus");
  } else {
    alert("Gagal Menghapus Buku!");
  }
});

// menambahkan fitur cari buku
const search = () => {
  const searchbox = document.getElementById("search").value.toUpperCase();
  const list = document.querySelectorAll(".buku");
  const pname = document.getElementsByTagName("h3");

  for (var i = 0; i < pname.length; i++) {
    let match = list[i].getElementsByTagName("h3")[0];

    if (match) {
      let textvalue = match.textContent || match.innerHTML;

      if (textvalue.toUpperCase().indexOf(searchbox) > -1) {
        list[i].style.display = "";
      } else {
        list[i].style.display = "none";
      }
    }
  }
};
