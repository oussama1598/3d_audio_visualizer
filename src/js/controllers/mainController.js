import * as soundcloud from '../lib/soundcloud.js';
import ThreeDSphereSpectrum from "../modules/3DSphereSpectrum.js";
import AudioPlayer from "../modules/AudioPlayer.js";

const linkInput = document.getElementById("linkInput");
const searchButton = document.getElementById("searchButton");
const playButton = document.getElementById("playButton");

const audioPlayer = new AudioPlayer(
    false
);
const sphereSpectrum = new ThreeDSphereSpectrum(
    window.innerWidth,
    window.innerHeight,
    audioPlayer
);

document.body.appendChild(sphereSpectrum.getRenderer().domElement);

searchButton.addEventListener('click', async () => {
  searchButton.innerText = 'Loading ...';

  const streamUrl = await soundcloud.getStreamUrl(linkInput.value);

  searchButton.innerText = 'Fetch';

  audioPlayer.setStream(streamUrl);
  audioPlayer.toggle();

  playButton.disabled = false;
  playButton.textContent = 'Pause';
});

playButton.addEventListener('click', () => {
  playButton.textContent = audioPlayer.paused() ? 'Pause' : 'Play';

  audioPlayer.toggle();
});

window.addEventListener('resize', () => {
  sphereSpectrum.updateSize(
      window.innerWidth,
      window.innerHeight
  );
});

const animate = function () {
  requestAnimationFrame(animate);

  sphereSpectrum.render();
};

animate();
