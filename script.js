const hiScreen = document.createElement("div");
hiScreen.innerHTML = `<span class="hi-text">Hi</span>`;
hiScreen.style.cssText = `
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: url('https://i.postimg.cc/nhPLTrdL/4593e9f8d2f3a50755be9e358974e53b.gif') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  cursor: pointer;
  animation: fadeIn 1s ease-out;
`;
document.body.appendChild(hiScreen);

const style = document.createElement("style");
style.textContent = `
  .hi-text {
    font-family: 'Segoe UI', sans-serif;
    font-size: 4.5rem;
    font-weight: 800;
    color: white;
    text-shadow: 0 0 15px #b37fff, 0 0 30px #b37fff66;
    opacity: 0;
    animation: hiFadeIn 1.4s ease-out forwards;
  }
  @keyframes hiFadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
`;
document.head.appendChild(style);

function typeText(el, text, speed = 50) {
  let i = 0;
  function typing() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }
  typing();
}

const playlist = [
  { title: "Shot For Me", src: "https://files.catbox.moe/gbljt4.mp3" },
  { title: "Awful Things", src: "https://files.catbox.moe/h2k35s.mp3" },
  { title: "Okk", src: "https://files.catbox.moe/g91ulp.mp3" },
  { title: "Condenado al Éxito", src: "https://files.catbox.moe/64div5.mp3" }
];
let currentTrack = 0;
const audio = new Audio(playlist[currentTrack].src);
audio.volume = 1.0;

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const titleEl = document.getElementById("song-title");
const progress = document.getElementById("progress");

function loadTrack(index) {
  audio.src = playlist[index].src;
  titleEl.textContent = playlist[index].title;
  audio.play();
  updatePlayIcon();
}
function updatePlayIcon() {
  playBtn.innerHTML = audio.paused
    ? '<svg viewBox="0 0 24 24" fill="white" width="18" height="18"><polygon points="5,3 19,12 5,21"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="white" width="18" height="18"><rect x="6" y="5" width="3" height="14"/><rect x="15" y="5" width="3" height="14"/></svg>';
}

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
  updatePlayIcon();
});
nextBtn.addEventListener("click", () => {
  currentTrack = (currentTrack + 1) % playlist.length;
  loadTrack(currentTrack);
});
prevBtn.addEventListener("click", () => {
  currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrack);
});
audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
});
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});
audio.addEventListener("ended", () => {
  currentTrack = (currentTrack + 1) % playlist.length;
  loadTrack(currentTrack);
});

document.body.addEventListener("click", () => {
  if (hiScreen) {
    hiScreen.remove();
    document.querySelector(".card").style.display = "block";
    loadTrack(currentTrack);
    typeText(document.getElementById("typed-name"), "Mih");
    setTimeout(() => {
      typeText(
        document.getElementById("typed-desc"),
        "Hi, I'm 18 years old and live in Colombia.\nI've been learning Python and Lua for 6 months.",
        35
      );
    }, 800);

    VanillaTilt.init(document.querySelector(".tilt"), {
      max: 10,
      speed: 400,
      glare: true,
      "max-glare": 0.2,
    });

    document.addEventListener("mousemove", sparkleTrail);
  }
}, { once: true });

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".card").style.display = "none";
});

function sparkleTrail(e) {
  const star = document.createElement("div");
  star.innerHTML = "★";
  star.style.position = "fixed";
  star.style.left = e.clientX + "px";
  star.style.top = e.clientY + "px";
  star.style.fontSize = "12px";
  star.style.color = Math.random() > 0.5 ? "#ff6bff" : "#d3a6ff";
  star.style.opacity = "0.8";
  star.style.pointerEvents = "none";
  star.style.zIndex = "99999";
  star.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
  star.style.transition = "all 0.8s ease-out";
  document.body.appendChild(star);

  requestAnimationFrame(() => {
    star.style.top = e.clientY - 20 + "px";
    star.style.opacity = "0";
  });

  setTimeout(() => {
    star.remove();
  }, 800);
}
