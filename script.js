console.log("Script berjalan");

let semuaSoal = [
    {
        pertanyaan: "Apa ibukota Indonesia?",
        pilihan: ["surabaya", "Jakarta", "Bandung", "Medan"],
        jawaban: "Jakarta"
    },

    {
        pertanyaan: "2 + 2 = ?",
        pilihan: ["3", "4", "5", "6"],
        jawaban: "4"
    },

    {
        pertanyaan: "Bahasa pemrograman untuk web?",
        pilihan: ["JavaScript", "Photoshop", "Word", "Excel"],
        jawaban: "JavaScript"
    },

    {
        pertanyaan: "Planet terbesar di tata surya adalah?",
        pilihan: ["Bumi", "Mars", "Jupiter", "Venus"],
        jawaban: "Jupiter"
    },

    {
        pertanyaan: "Warna bendera indonesia adalah?",
        pilihan: ["Merah putih", "Merah biru", "Putih hijau", "Kuning merah"],
        jawaban: "Merah putih"
    },

    {
        pertanyaan: "5 x 6 = ?",
        pilihan: ["25", "30", "35", "40"],
        jawaban: "30"
    },

    {
        pertanyaan: "HTML digunakan untuk?",
        pilihan: [
            "Membuat struktur website",
            "Mengedit foto",
            "Membuat database",
            "Menggambar"
        ],
        jawaban: "Membuat struktur website"
    },

    {
        pertanyaan: "CSS digunakan untuk?",
        pilihan: [
            "Mengatur tampilan website",
            "Menghitung angka",
            "Menyimpan data",
            "Membuat video"
        ],
        jawaban: "Mengatur tampilan website"
    },

    {
        pertanyaan: "JavaScript digunakan untuk?",
        pilihan: [
            "Membuat website interaktif",
            "Mengetik dokumen",
            "Menggambar",
            "Membuat musik"
        ],
        jawaban: "Membuat website interaktif"
    },

    {
        pertanyaan: "Berapa jumlah hari dalam seminggu?",
        pilihan: ["5", "6", "7", "8"],
        jawaban: "7"
    }
];

semuaSoal.sort(function () {
    return Math.random() - 0.5;
});

let nomorSoal = 0;

let progressFill = document.getElementById("progressFill");

let pertanyaan = document.getElementById("pertanyaan");

let pilihanContainer = document.getElementById("pilihan");

let btnJawab = document.getElementById("btnJawab");

let btnRestart = document.getElementById("btnRestart");

let jawabanUser = "";

let skor = 0;

let skorElement = document.getElementById("skor");

let highScoreElement = document.getElementById("highScore");

let highScore = localStorage.getItem("highScore");

if (highScore === null) {
    highScore = 0;
}

highScoreElement.innerText = highScore;

let hasil = document.getElementById("hasil");

let progress = document.getElementById("progress")

let timerElement = document.getElementById("timer");

let waktu = 10;

let intervalTimer;

let tombolDipilih = null;

let waktuHabis = false;

let modeBtn = document.getElementById("modeBtn");

modeBtn.addEventListener("click", function() {
    document.body.classList.toggle("dark");
});

const suaraClick = new Audio("sounds/click.mp3");

const suaraBenar = new Audio("sounds/benar.mp3");

const suaraSalah = new Audio("sounds/wrong.mp3");

function mulaiTimer() {

    clearInterval(intervalTimer);

    waktu = 10;

    waktuHabis = false;

    timerElement.innerText = waktu;

    intervalTimer = setInterval(function () {

        waktu--;

        if (waktu <= 0) {

            clearInterval(intervalTimer);

            waktu = 0;

            timerElement.innerText = "0";

            timerElement.style.color = "red";

            waktuHabis = true;

            hasil.innerText = "Waktu Habis!";

            btnJawab.click

            return;
        }

        timerElement.innerText = waktu;

        timerElement.classList.add("timer-animasi");

        setTimeout(function () {
            timerElement.classList.remove("timer-animasi");
        }, 150);

        if (waktu <= 3) {
            timerElement.style.color = "red";
        }
        else if (waktu <= 5) {
            timerElement.style.color = "orange";
        }
        else {
            timerElement.style.color = "#ffd43b";
        }

    }, 1000);
}

function tampilkanSoal() {

    console.log("Menampilkan soal", nomorSoal);

    let soal = semuaSoal[nomorSoal];

    let pilihanAcak = [...soal.pilihan];

    pilihanAcak.sort(function () {
        return Math.random() - 0.5;
    });

    pertanyaan.innerText = soal.pertanyaan;

    pilihanContainer.innerHTML = "";

    for (let i = 0; i < soal.pilihan.length; i++) {

        let tombol = document.createElement("button");

        tombol.innerText = pilihanAcak[i];

        tombol.classList.add("pilihan");

        tombol.addEventListener("click", function () {

            let semuaTombol = document.querySelectorAll(".pilihan");

            semuaTombol.forEach(function (btn) {
                btn.classList.remove("dipilih");
            });

            tombol.classList.add("dipilih");

            jawabanUser = pilihanAcak[i];

            tombolDipilih = tombol;

            suaraClick.currentTime = 0;

            suaraClick.play();

        });

        pilihanContainer.appendChild(tombol);
    }

    progress.innerText =
        "soal " + (nomorSoal + 1) + " dari " + semuaSoal.length;

        let persen = (nomorSoal / semuaSoal.length) * 100;

        progressFill.style.width = persen + "%";

    mulaiTimer();
}

tampilkanSoal();

btnJawab.addEventListener("click", function () {

    console.log("Tombol jawab ditekan");

    clearInterval(intervalTimer);

    let soal = semuaSoal[nomorSoal];

    if (jawabanUser === "" && !waktuHabis) {

        hasil.innerText = "Pilih jawaban terlebih dahulu";

        return;
    }

    btnJawab.disabled = true;

    if (jawabanUser === soal.jawaban) {
        skor++;

        skorElement.innerText = skor;

        hasil.innerText = "Benar!";

        suaraBenar.currentTime = 0;

        suaraBenar.play();

        if (tombolDipilih) {
            tombolDipilih.classList.add("benar")
        }

    } else {

        if (!waktuHabis) {

            hasil.innerText = "Salah!";

            suaraSalah.currentTime = 0;

            suaraSalah.play();
        }

        if (tombolDipilih) {
            tombolDipilih.classList.add("salah");
        }

        let semuaTombol = document.querySelectorAll(".pilihan");

        semuaTombol.forEach(function (btn) {

            if (btn.innerText === soal.jawaban) {
                btn.classList.add("benar");
            }
        });
    }

    setTimeout(function () {

        nomorSoal++;

        if (nomorSoal < semuaSoal.length) {

            jawabanUser = "";

            waktuHabis = false;

            tombolDipilih = null;

            hasil.innerText = "";

            btnJawab.disabled = false;

            tampilkanSoal();

        } else {

            if (skor > highScore) {

                highScore = skor;

                localStorage.setItem("highScore", highScore);

                highScoreElement.innerText = highScore;
            }

            let nilai = Math.round((skor / semuaSoal.length) * 100);

            let grade = "";

            if (nilai >= 90) {
                grade = "A";
            }
            else if (nilai >= 80) {
                grade = "B";
            }
            else if (nilai >= 70) {
                grade = "C";
            }
            else if (nilai >= 60) {
                grade = "D";
            }
            else {
                grade = "E"
            }

            hasil.innerText =
                "Quiz selesai!\n" +
                "skor: " + skor + "/" + semuaSoal.length +
                "\nNilai: " + nilai +
                "\nGrade: " + grade;

            pertanyaan.innerText = "Quiz Selesai!";

            pilihanContainer.innerHTML = "";

            progress.innerText = "";

            clearInterval(intervalTimer);

            btnJawab.disabled = true;

            btnRestart.style.display = "inline-block";
        }

    }, 1000);

});

btnRestart.addEventListener("click", function () {

    nomorSoal = 0;

    skor = 0;

    jawabanUser = "";

    tombolDipilih = null;

    waktuHabis = false;

    waktu = 10;

    skorElement.innerText = skor;

    hasil.innerText = "";

    pertanyaan.innerText = "";

    progress.innerText = "";

    timerElement.innerText = waktu;

    btnJawab.disabled = false;

    btnRestart.style.display = "none";

    clearInterval(intervalTimer);

    semuaSoal.sort(function () {
        return Math.random() - 0.5;
    });

    tampilkanSoal();

});