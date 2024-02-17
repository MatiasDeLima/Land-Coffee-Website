import * as THREE from "three";
import Experience from "../Experience.js";

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.object = {
            colorObj: { r: 0, g: 0, b: 0 },
            intensity: 3,
        }

        this.setSunlight();
    }

    setSunlight() {
        // add room Lights and scene shadow and light
        this.sunlight = new THREE.DirectionalLight("#ffffff", 1);
        this.sunlight.castShadow = true;
        this.sunlight.shadow.camera.far = 20;
        this.sunlight.shadow.mapSize.set(2048, 2048);
        this.sunlight.shadow.normalBias = 0.05;
        this.sunlight.position.set(1.5, 7, 3);
        this.scene.add(this.sunlight);

        // Ambient light
        this.ambientLight = new THREE.AmbientLight("#6249CF", 2)
        this.scene.add(this.ambientLight);
    }

    resize() {}
    update() {}
}
