import * as THREE from "three";
import Experience from "../../Experience.js";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

export default class AreaLigth {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setAreaLight();
    }

    setAreaLight() {
        // // Area Light 1
        const width = 1.5;
        const height = 1.5;
        const intensity = 100;
        const rectLight = new THREE.RectAreaLight(
            0xFFD5C2,
            intensity,
            width,
            height
        );
        // posicao da luz do aquario
        rectLight.position.set(4, 2, -0.5);
        rectLight.rotation.x = -Math.PI / 2
        rectLight.receiveShadow = true;
        this.scene.add(rectLight);

        const rectLightHelper = new RectAreaLightHelper(rectLight);
        // rectLight.add(rectLightHelper);
    }
}