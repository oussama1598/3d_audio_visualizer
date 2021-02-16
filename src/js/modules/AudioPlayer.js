export default class AudioPlayer {
  constructor(showPlayer = true) {
    this.audioPlayerElement = document.createElement('audio');
    this.audioPlayerElement.controls = showPlayer;
    this.audioPlayerElement.src = "./resources/audio.mp3";
    this.audioPlayerElement.crossOrigin = "anonymous";

    this.audioContext = null;

    document.body.appendChild(this.audioPlayerElement);
  }

  _createAudioAnalyser() {
    this.audioContext = new AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.source = this.audioContext.createMediaElementSource(this.audioPlayerElement);

    this.source.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);

    this.analyser.fftSize = 8192;
    this.analyser.smoothingTimeConstant = 0.8;

    this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
  }

  update() {
    this.analyser.getByteFrequencyData(this.frequencyData);
  }

  paused() {
    return this.audioPlayerElement.paused;
  }

  toggle() {
    if (!this.audioContext)
      this._createAudioAnalyser();

    if (this.audioPlayerElement.paused)
      return this.audioPlayerElement.play();

    this.audioPlayerElement.pause();
  }

  getFrequencyData() {
    return this.frequencyData;
  }

  setStream(streamUrl) {
    this.audioPlayerElement.src = streamUrl;
  }
}