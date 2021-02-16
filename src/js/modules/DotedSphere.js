import * as THREE from '../../vendor/three.module.js';

export default class DotedSphere {
  constructor(dotSize = 2, radius = 100, numberOfPoints = 4000) {
    this.dotSize = dotSize;
    this.radius = radius;
    this.numberOfPoints = numberOfPoints;

    this.geometry = new THREE.Geometry();
    this.material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: this.dotSize,
      map: new THREE.TextureLoader().load('./resources/particle.png'),
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false
    });

    this._constructVertices();

    this.mesh = new THREE.Points(this.geometry, this.material);
  }

  _constructVertices() {
    const phi = Math.PI * (3 - Math.sqrt(5)) // golden angle

    for (let i = 0; i < this.numberOfPoints; i++) {
      const y = 1 - (i / (this.numberOfPoints - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const vertex = new THREE.Vector3(0, 0, 0);

      vertex.x = vertex.initX = this.radius * Math.cos(theta) * radiusAtY;
      vertex.z = vertex.initZ = this.radius * Math.sin(theta) * radiusAtY;
      vertex.y = vertex.initY = this.radius * y;

      this.geometry.vertices.push(vertex);
    }
  }

  getMesh() {
    return this.mesh;
  }
}