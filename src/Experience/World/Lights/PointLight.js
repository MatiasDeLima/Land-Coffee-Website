import * as THREE from "three";
import Experience from "../../Experience.js";
import { PointLightHelper } from "three";

export default class PointLigth {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setPointLight();
    }

    setPointLight() {
        // // Area Light 1
        const width = 2;
        const intensity = 5;
        const rectLight = new THREE.PointLight(
            0xB2DFFF,
            intensity,
            width,
        );
        // posicao da luz do aquario
        rectLight.position.set(0.1, 1, -2.5);
        this.scene.add(rectLight);



        const rectLightHelper = new PointLightHelper(rectLight);
        // rectLight.add(rectLightHelper);
    }
}