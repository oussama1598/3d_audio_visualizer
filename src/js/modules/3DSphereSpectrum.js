import * as THREE from "../../vendor/three.module.js";
import {OrbitControls} from "../../vendor/OrbitControls.js";
import DotedSphere from "./DotedSphere.js";

export default class ThreeDSphereSpectrum {
  constructor(width, height, audioPlayer) {
    this.width = width;
    this.height = height;
    this.audioPlayer = audioPlayer;

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      sortObjects: true
    });
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, 0, 0.1, 1000);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // default camera position
    this.camera.position.set(0, 10, 170);

    // update renderer size
    this.updateSize(this.width, this.height);

    // create sphere object
    this.dotedSphere = new DotedSphere();
    this.scene.add(this.dotedSphere.getMesh());

    // update controls
    this.controls.update();
  }

  _updateVertices() {
    if (this.audioPlayer.paused())
      return;

    this.audioPlayer.update();

    const skipFrequencies = 600;
    const frequencyData = this.audioPlayer.getFrequencyData();
    const vertices = this.dotedSphere.geometry.vertices;

    for (let i = 0; i < vertices.length / 2; i++) {
      if (i + skipFrequencies < frequencyData.length) {
        let vertex = vertices[Math.floor(vertices.length / 2) + i];
        const factor = frequencyData[i + skipFrequencies] / 256 + 1; // between 1 and 2

        vertex.x = vertex.initX * factor;
        vertex.y = vertex.initY * factor;
        vertex.z = vertex.initZ * factor;

        vertex = vertices[Math.floor(vertices.length / 2) - i];
        vertex.x = vertex.initX * factor;
        vertex.y = vertex.initY * factor;
        vertex.z = vertex.initZ * factor;
      }
    }

    this.dotedSphere.getMesh().geometry.verticesNeedUpdate = true;
  }

  render() {
    this._updateVertices();

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  updateSize(width, height) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  getRenderer() {
    return this.renderer;
  }
}