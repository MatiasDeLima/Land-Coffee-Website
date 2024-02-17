import * as THREE from "three";
import Experience from "../../Experience.js";
import { PointLightHelper } from "three";

export default class PointLigth2 {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setPointLight();
    }

    setPointLight() {
        // // Area Light 1
        const width = 4;
        const intensity = 4;
        const rectLight = new THREE.PointLight(
            0xFF9966,
            intensity,
            width,
        );
        // posicao da luz do aquario
        rectLight.position.set(-0.6, 1.2, -0.1);
        this.scene.add(rectLight);



        const rectLightHelper = new PointLightHelper(rectLight);
        // rectLight.add(rectLightHelper);
    }
}