import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";

import AreaLigth from "./Lights/AreaLight.js";
import PointLigth from "./Lights/PointLight.js";
import PointLigth2 from "./Lights/PointLight2.js";

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {};
        this.areaLight = new AreaLigth();
        this.pointLight1 = new PointLigth();
        this.pointLight2 = new PointLigth2();

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        }

        this.setModel();
        this.onMouseMove();
    }

    setModel() {
        this.actualRoom.children.forEach((child) => {
            // console.log(child);

            child.castShadow = true;
            child.receiveShadow = true;

            if (child instanceof THREE.Group) {
                child.children.forEach((groupChild) => {
                    groupChild.castShadow = true;
                    groupChild.receiveShadow = true;
                })
            }

            if (child.name === "Plane004") {
                child.children[4].material = new THREE.MeshPhysicalMaterial();
                child.children[4].material.roughness = 0;
                child.children[4].material.color.set(0xE7AF70);
                child.children[4].material.ior = 3;
                child.children[4].material.transmission = 1;
                child.children[4].material.opacity = .1;

                child.children[5].material = new THREE.MeshPhysicalMaterial();
                child.children[5].material.roughness = 0;
                child.children[5].material.color.set(0xE7AF70);
                child.children[5].material.ior = 3;
                child.children[5].material.transmission = 1;
                child.children[5].material.opacity = .1;
            }
        })

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.3, 0.3, 0.3);
        // this.actualRoom.position.x = 0.8
    }

    onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;

            this.lerp.target = this.rotation * 0.1;
        })
    }

    resize() { }

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease,
        );

        this.actualRoom.rotation.y = this.lerp.current;
    }
}