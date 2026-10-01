// ==========================================
// DATA SISWA
// ==========================================

let dataSiswa =
    JSON.parse(
        localStorage.getItem("dataSiswa")
    ) || [];


// ==========================================
// INDEX DATA YANG SEDANG DI-EDIT
// ==========================================

let indexEdit = -1;


// ==========================================
// LOGIN
// ==========================================

function login() {

    let username =
        document
            .getElementById("username")
            .value
            .trim();

    let password =
        document
            .getElementById("password")
            .value
            .trim();


    // Username dan password

    let usernameBenar = "khalil";

    let passwordBenar = "121212";


    if (
        username === usernameBenar &&
        password === passwordBenar
    ) {

        document
            .getElementById("loginPage")
            .style.display = "none";


        document
            .getElementById("dataPage")
            .style.display = "block";


        document
            .getElementById("loginMessage")
            .innerText = "";


        tampilkanSiswa();

    }

    else {

        document
            .getElementById("loginMessage")
            .innerText =
            "Anda tidak login! Username atau password salah.";

    }

}


// ==========================================
// LOGOUT
// ==========================================

function logout() {

    document
        .getElementById("dataPage")
        .style.display = "none";


    document
        .getElementById("loginPage")
        .style.display = "flex";


    document
        .getElementById("username")
        .value = "";


    document
        .getElementById("password")
        .value = "";

}


// ==========================================
// TAMBAH DATA
// ==========================================

function tambahSiswa() {

    let nis =
        document
            .getElementById("nis")
            .value
            .trim();


    let nama =
        document
            .getElementById("nama")
            .value
            .trim();


    let kelas =
        document
            .getElementById("kelas")
            .value;


    let jurusan =
        document
            .getElementById("jurusan")
            .value;


    let nilaiInput =
        document
            .getElementById("nilai")
            .value;


    let nilai =
        Number(nilaiInput);


    // ======================================
    // CEK FORM
    // ======================================

    if (
        nis === "" ||
        nama === "" ||
        kelas === "" ||
        jurusan === "" ||
        nilaiInput === ""
    ) {

        alert(
            "Semua data siswa harus diisi!"
        );

        return;
    }


    // ======================================
    // CEK NILAI
    // ======================================

    if (
        nilai < 0 ||
        nilai > 100
    ) {

        alert(
            "Nilai harus antara 0 sampai 100!"
        );

        return;
    }


    // ======================================
    // MAKSIMAL 50 DATA
    // ======================================

    if (dataSiswa.length >= 50) {

        alert(
            "Data siswa sudah mencapai 50 data!"
        );

        return;
    }


    // ======================================
    // CEK NIS
    // ======================================

    let nisSudahAda =
        dataSiswa.some(
            function(siswa) {

                return siswa.nis === nis;

            }
        );


    if (nisSudahAda) {

        alert(
            "NIS tersebut sudah ada!"
        );

        return;
    }


    // ======================================
    // STATUS
    // ======================================

    let status =
        nilai >= 75
            ? "Lulus"
            : "Tidak Lulus";


    // ======================================
    // DATA BARU
    // ======================================

    let siswaBaru = {

        nis: nis,

        nama: nama,

        kelas: kelas,

        jurusan: jurusan,

        nilai: nilai,

        status: status

    };


    // ======================================
    // TAMBAHKAN DATA
    // ======================================

    dataSiswa.push(siswaBaru);


    // ======================================
    // SIMPAN LOCAL STORAGE
    // ======================================

    localStorage.setItem(
        "dataSiswa",
        JSON.stringify(dataSiswa)
    );


    // ======================================
    // TAMPILKAN DATA
    // ======================================

    tampilkanSiswa();


    // ======================================
    // KOSONGKAN FORM
    // ======================================

    kosongkanForm();


    alert(
        "Data siswa berhasil ditambahkan!"
    );

}


// ==========================================
// TAMPILKAN DATA
// ==========================================

function tampilkanSiswa() {

    let tabel =
        document.getElementById(
            "tabelSiswa"
        );


    tabel.innerHTML = "";


    // ======================================
    // BELUM ADA DATA
    // ======================================

    if (dataSiswa.length === 0) {

        let baris =
            document.createElement("tr");


        baris.innerHTML = `

            <td
                colspan="7"
                style="
                    text-align:center;
                    padding:25px;
                "
            >
                Belum ada data siswa
            </td>

        `;


        tabel.appendChild(baris);

    }


    // ======================================
    // BUAT BARIS OTOMATIS
    // ======================================

    dataSiswa.forEach(
        function(siswa, index) {

            let baris =
                document.createElement("tr");


            baris.innerHTML = `

                <td>
                    ${siswa.nis}
                </td>


                <td>
                    ${siswa.nama}
                </td>


                <td>
                    ${siswa.kelas}
                </td>


                <td>
                    ${siswa.jurusan}
                </td>


                <td>
                    ${siswa.nilai}
                </td>


                <td>

                    <span class="${
                        siswa.status === "Lulus"
                            ? "lulus"
                            : "tidak-lulus"
                    }">

                        ${siswa.status}

                    </span>

                </td>


                <td class="kolom-aksi">

                    <button
                        class="edit-button"
                        onclick="editSiswa(${index})"
                    >
                        EDIT
                    </button>


                    <button
                        class="hapus-button"
                        onclick="hapusSiswa(${index})"
                    >
                        HAPUS
                    </button>

                </td>

            `;


            tabel.appendChild(baris);

        }
    );


    // ======================================
    // JUMLAH DATA
    // ======================================

    document
        .getElementById("jumlahData")
        .innerText =
        dataSiswa.length + " / 50";

}


// ==========================================
// EDIT DATA
// ==========================================

function editSiswa(index) {

    let siswa =
        dataSiswa[index];


    document
        .getElementById("nis")
        .value =
        siswa.nis;


    document
        .getElementById("nama")
        .value =
        siswa.nama;


    document
        .getElementById("kelas")
        .value =
        siswa.kelas;


    document
        .getElementById("jurusan")
        .value =
        siswa.jurusan;


    document
        .getElementById("nilai")
        .value =
        siswa.nilai;


    indexEdit = index;


    let tombol =
        document.getElementById(
            "tombolData"
        );


    tombol.innerText =
        "UBAH DATA";


    tombol.onclick =
        ubahData;

}


// ==========================================
// UBAH DATA
// ==========================================

function ubahData() {

    let nis =
        document
            .getElementById("nis")
            .value
            .trim();


    let nama =
        document
            .getElementById("nama")
            .value
            .trim();


    let kelas =
        document
            .getElementById("kelas")
            .value;


    let jurusan =
        document
            .getElementById("jurusan")
            .value;


    let nilaiInput =
        document
            .getElementById("nilai")
            .value;


    let nilai =
        Number(nilaiInput);


    // ======================================
    // CEK DATA
    // ======================================

    if (
        nis === "" ||
        nama === "" ||
        kelas === "" ||
        jurusan === "" ||
        nilaiInput === ""
    ) {

        alert(
            "Semua data harus diisi!"
        );

        return;
    }


    // ======================================
    // CEK NILAI
    // ======================================

    if (
        nilai < 0 ||
        nilai > 100
    ) {

        alert(
            "Nilai harus antara 0 sampai 100!"
        );

        return;
    }


    // ======================================
    // STATUS
    // ======================================

    let status =
        nilai >= 75
            ? "Lulus"
            : "Tidak Lulus";


    // ======================================
    // GANTI DATA
    // ======================================

    dataSiswa[indexEdit] = {

        nis: nis,

        nama: nama,

        kelas: kelas,

        jurusan: jurusan,

        nilai: nilai,

        status: status

    };


    // ======================================
    // SIMPAN
    // ======================================

    localStorage.setItem(
        "dataSiswa",
        JSON.stringify(dataSiswa)
    );


    tampilkanSiswa();


    batalEdit();


    alert(
        "Data siswa berhasil diubah!"
    );

}


// ==========================================
// HAPUS DATA
// ==========================================

function hapusSiswa(index) {

    let yakin =
        confirm(
            "Apakah data siswa ini ingin dihapus?"
        );


    if (!yakin) {
        return;
    }


    dataSiswa.splice(
        index,
        1
    );


    localStorage.setItem(
        "dataSiswa",
        JSON.stringify(dataSiswa)
    );


    tampilkanSiswa();

}


// ==========================================
// SAVE DATA
// ==========================================

function simpanData() {

    localStorage.setItem(
        "dataSiswa",
        JSON.stringify(dataSiswa)
    );


    alert(
        "Data berhasil disimpan!"
    );

}


// ==========================================
// EXPORT KE EXCEL
// ==========================================

function exportExcel() {

    if (dataSiswa.length === 0) {

        alert(
            "Belum ada data siswa untuk diekspor!"
        );

        return;
    }


    // Data yang akan masuk Excel

    let dataExcel =
        dataSiswa.map(
            function(siswa) {

                return {

                    "NIS":
                        siswa.nis,

                    "Nama Siswa":
                        siswa.nama,

                    "Kelas":
                        siswa.kelas,

                    "Jurusan":
                        siswa.jurusan,

                    "Nilai":
                        siswa.nilai,

                    "Status":
                        siswa.status

                };

            }
        );


    // Buat worksheet

    let worksheet =
        XLSX.utils.json_to_sheet(
            dataExcel
        );


    // Lebar kolom

    worksheet["!cols"] = [

        { wch: 15 },

        { wch: 25 },

        { wch: 15 },

        { wch: 15 },

        { wch: 10 },

        { wch: 15 }

    ];


    // Buat workbook

    let workbook =
        XLSX.utils.book_new();


    // Masukkan worksheet

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Data Siswa"
    );


    // Nama file

    let tanggal =
        new Date()
            .toISOString()
            .slice(0, 10);


    let namaFile =
        "Data_Siswa_" +
        tanggal +
        ".xlsx";


    // Download Excel

    XLSX.writeFile(
        workbook,
        namaFile
    );


    alert(
        "Data siswa berhasil diekspor ke Excel!"
    );

}


// ==========================================
// CETAK DATA
// ==========================================

function cetakData() {

    if (dataSiswa.length === 0) {

        alert(
            "Belum ada data siswa untuk dicetak!"
        );

        return;
    }


    window.print();

}


// ==========================================
// KOSONGKAN FORM
// ==========================================

function kosongkanForm() {

    document
        .getElementById("nis")
        .value = "";


    document
        .getElementById("nama")
        .value = "";


    document
        .getElementById("kelas")
        .value = "";


    document
        .getElementById("jurusan")
        .value = "";


    document
        .getElementById("nilai")
        .value = "";

}


// ==========================================
// BATAL EDIT
// ==========================================

function batalEdit() {

    indexEdit = -1;


    kosongkanForm();


    let tombol =
        document.getElementById(
            "tombolData"
        );


    tombol.innerText =
        "TAMBAH DATA";


    tombol.onclick =
        tambahSiswa;

}


// ==========================================
// SAAT HALAMAN DIBUKA
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        document
            .getElementById("dataPage")
            .style.display = "none";

    }
);