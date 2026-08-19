const playlistcontainer2 = document.querySelector(".playlistcontainer2");
const audio = document.querySelector("#audio");

const songs = [
    {
        image: "images/Meltdown.jpeg",
        name: "Meltdown",
        artist: "feat.(Drake) by travis scott",
        music: "songs/meltdown.mp3"
    },
    {
        image: "images/MfGaburu.jpeg",
        name: "MF Gabhru!",
        artist: "Kr$sna | karan Aujla",
        music: "songs/MfGabru.mp3"
    },
    {
        image: "images/kalayani.jpeg",
        name: "KALYANI (with Shreya Ghoshal) OFFICIAL MUSIC VIDEO | ARJN",
        artist: "ARJN | Shreya Ghoshal",
        music: "songs/kalyani.mp3"
    },
    {
        image: "images/NeverHaveIEver.jpeg",
        name: "Fire for You",
        artist: "Cannons",
        music: "songs/FireForYou.mp3"
    },
    {
        image: "images/him.jpeg",
        name: "Him",
        artist: "Song by Ikky and Karan Aujla",
        music: "songs/sample-speech-1m.mp3"
    },
    {
        image: "images/him.jpeg",
        name: "Him",
        artist: "Song by Ikky and Karan Aujla",
        music: "songs/sample-speech-1m.mp3"
    },
    {
        image: "images/him.jpeg",
        name: "Him",
        artist: "Song by Ikky and Karan Aujla",
        music: "songs/sample-speech-1m.mp3"
    },
    {
        image: "images/him.jpeg",
        name: "Him",
        artist: "Song by Ikky and Karan Aujla",
        music: "songs/sample-speech-1m.mp3"
    }
]

songs.forEach((song) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <img src="${song.image}" height="170px"
        width="170px" style="border-radius: 10px;">
        <div class="white SongName">${song.name}</div>
        <p class="artists color-spotify">
        <a>${song.artist}</a>
        </p>
    `;

    playlistcontainer2.appendChild(card);
});


const showall = document.querySelector(".ShowAll");
showall.addEventListener("click", () => {
    playlistcontainer2.classList.add("ShowAll")
})

const cards = document.querySelectorAll(".card");
const play = document.getElementById("#play")
let currentSongIndex = 0;

cards.forEach((card, index) => {
    const songname = card.querySelector(".SongName");

    songname.addEventListener("click", () => {
        currentSongIndex = index;
        cards.forEach((c, cindex) => {
            c.classList.remove("selected");
        });
        card.classList.add("selected");

        audio.src = songs[index].music;
        audio.play();

        play.src = "svg/pause.svg";
    });
});

play.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        play.src = "svg/pause.svg"
    } else {
        audio.pause();
        play.src = "svg/play copy.svg"
    }
})

const audiocontrol = document.querySelector(".AudioControl");

const control = document.createElement("div");
control.classList.add("control");

control.innerHTML = `
    <span class="StartDuration white">0:00</span>
    <input type="range" class="ProgressBar" min="0" value="0">
    <span class="EndDuration white">0:00</span>
`;

audiocontrol.appendChild(control);

const progressBar = control.querySelector(".ProgressBar");
const startDuration = control.querySelector(".StartDuration");
const endDuration = control.querySelector(".EndDuration");


function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${minutes}:${secs.toString().padStart(2, "0")}`;
}


audio.addEventListener("loadedmetadata", () => {
    progressBar.max = audio.duration;

    endDuration.textContent = formatTime(audio.duration);
});


audio.addEventListener("timeupdate", () => {
    progressBar.value = audio.currentTime;

    startDuration.textContent = formatTime(audio.currentTime);

    if (audio.currentTime == audio.duration) {
        nextsong();
    }
});


progressBar.addEventListener("input", () => {
    audio.currentTime = progressBar.value;
});

const forward = document.querySelector(".next");
function nextsong() {
    currentSongIndex++;

    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }


    audio.src = songs[currentSongIndex].music;

    audio.play();

    play.src = "svg/pause.svg";

    cards.forEach((card) => {
        card.classList.remove("selected");
    });
    cards[currentSongIndex].classList.add("selected");
}
forward.addEventListener("click", () => {
    currentSongIndex++;

    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }


    audio.src = songs[currentSongIndex].music;

    audio.play();

    play.src = "svg/pause.svg";

    cards.forEach((card) => {
        card.classList.remove("selected");
    });
    cards[currentSongIndex].classList.add("selected");

});


const back = document.querySelector(".back")

back.addEventListener("click", () => {

    if (audio.currentTime > 1.5) {
        currentSongIndex = currentSongIndex;
    }
    else if (currentSongIndex == 0) {
        currentSongIndex = 0;
    } else {
        currentSongIndex--;
    }

    audio.src = songs[currentSongIndex].music;

    audio.play();

    play.src = "svg/pause.svg";

    cards.forEach((card) => {
        card.classList.remove("selected");
    });
    cards[currentSongIndex].classList.add("selected");
})
const logo = document.querySelector(".logo");

logo.addEventListener("click" ,() => {
    location.reload();
})

function space() {
    if(audio.paused){
        audio.play();
        play.src = "svg/pause.svg";
    }else{
        audio.pause();
        play.src = "svg/play copy.svg";
    }
}
function left() {
    if (audio.currentTime > 1.5) {
        currentSongIndex = currentSongIndex;
    }
    else if (currentSongIndex == 0) {
        currentSongIndex = 0;
    } else {
        currentSongIndex--;
    }

    audio.src = songs[currentSongIndex].music;

    audio.play();

    play.src = "svg/pause.svg";

    cards.forEach((card) => {
        card.classList.remove("selected");
    });
    cards[currentSongIndex].classList.add("selected");  
}
document.addEventListener("keydown" , (e) => {
    if(e.code === "Space"){
        e.preventDefault();
        space();
    }
    else if(e.code === "ArrowLeft"){       
        e.preventDefault(); 
        left();
    }
    else if(e.code === "ArrowRight"){
        e.preventDefault();
        nextsong();
    }
})
const bottomaudio = document.querySelector(".bottomaudio");
bottomaudio.appendChild(playbar)