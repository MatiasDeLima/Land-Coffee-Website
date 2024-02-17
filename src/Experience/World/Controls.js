import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        GSAP.registerPlugin(ScrollTrigger);


        // Camera Curver Animation
        // this.progress = 0;
        // this.dummyCurve = new THREE.Vector3(0, 0, 0);

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        }

        // this.position = new THREE.Vector3(0, 0, 0);
        // this.lookAtPosition = new THREE.Vector3(0, 0, 0);

        // this.directionalVector = new THREE.Vector3(0, 0, 0);
        // this.staticVector = new THREE.Vector3(0, 1, 0);
        // this.crossVector = new THREE.Vector3(0, 0, 0);

        // this.setPath();
        // this.onWheel();
        this.setScrollTrigger();
    }

    // setPath() {
    //     this.curve = new THREE.CatmullRomCurve3([
    //         // Left point
    //         new THREE.Vector3(-5, 0, 0), // Point
    //         new THREE.Vector3(0, 0, -5), // Curve

    //         // new THREE.Vector3(0, 0, 0), // Center Curver

    //         // Right point
    //         new THREE.Vector3(5, 0, 0),
    //         new THREE.Vector3(0, 0, 5),
    //     ],
    //         // Junta as duas linhas em uma so
    //         true
    //     );

    //     // curver setup
    //     const points = this.curve.getPoints(50);
    //     const geometry = new THREE.BufferGeometry().setFromPoints(points);
    //     const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

    //     // create the final object to add to the scene
    //     const curveObject = new THREE.Line(geometry, material);
    //     this.scene.add(curveObject);
    // }

    setScrollTrigger() {
        ScrollTrigger.matchMedia({
            // Desktop
            "(min-width: 960px)": () => {
                // console.log("desktop");

                // Resets (room scale and postion)
                this.room.position.set(0.8, 0, 0);
                this.room.scale.set(0.3, 0.3, 0.3);

                // First Section ---------------------------------------- //
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        markers: true,
                        invalidateOnRefresh: true,
                    }
                });
                this.firstMoveTimeline.to(this.room.position, {
                    x: () => { return this.sizes.width * 0.0015 },
                }, "same")

                // Second Section ---------------------------------------- //
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        markers: true,
                        invalidateOnRefresh: true,
                    }
                });
                // position
                this.secondMoveTimeline.to(this.room.position, {
                    x: () => {
                        return 1
                    },
                    z: () => {
                        return this.sizes.height * 0.000012;
                    }
                }, "same");

                // scale
                this.secondMoveTimeline.to(this.room.scale, {
                    x: 0.7,
                    y: 0.7,
                    z: 0.7,
                }, "same");

                // Third Section ---------------------------------------- //
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        markers: true,
                        invalidateOnRefresh: true,
                    }
                }).to(this.camera.orthographicCamera.position, {
                    // quanto maior o valor do y menos longo ele vai
                    y: 21,
                    x: -1.5,
                }, "same")

                this.thirdMoveTimeline.to(this.room.scale, {
                    x: 0.4,
                    y: 0.4,
                    z: 0.4,
                }, "same");
            },

            // Mobile
            "(max-width: 960px)": () => {
                // console.log("mobile");

                // Resets (room scale and position)
                this.room.scale.set(0.18, 0.18, 0.18);
                this.room.position.set(0, 0, 0);

                // First Section ---------------------------------------- //
                // vou usar a funcao mais resulmida mas no final da no mesmo usa o nome "to" e tals 
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        markers: true,
                        invalidateOnRefresh: true,
                    }
                }).to(this.room.scale, {
                    x: 0.2,
                    y: 0.2,
                    z: 0.2
                }, "same")

                // Second Section ---------------------------------------- //
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        markers: true,
                        invalidateOnRefresh: true,
                    }
                }).to(this.room.scale, {
                    x: 0.21,
                    y: 0.21,
                    z: 0.21,
                }, "same");

                // Third Section ---------------------------------------- //
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        markers: true,
                        invalidateOnRefresh: true,
                    }
                }).to(this.camera.orthographicCamera.position, {
                    // quanto maior o valor do y menos longo ele vai
                    y: 21,
                    x: -1,
                }, "same").to(this.room.scale, {
                    x: 0.4,
                    y: 0.4,
                    z: 0.4,
                }, "same");
            },


            // animations
            all: () => { },
        })
    }




    // onWheel() {
    //     // Quando faz escroll com o mause mexe a camera
    //     window.addEventListener("wheel", (e) => {
    //         console.log(e)

    //         if (e.deltaY > 0) {
    //             this.lerp.target += 0.01;
    //             this.back = false;
    //         } else {
    //             this.lerp.target -= 0.01;
    //             this.back = true;
    //         }
    //     })
    // }

    resize() { }

    update() {
        // camera helper curver
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease,
        );
        
        // camera curver
        // this.curve.getPointAt(this.lerp.current % 1, this.position);
        // this.camera.orthographicCamera.position.copy(this.position);

        // this.directionalVector.subVectors(
        //     this.curve.getPointAt((this.lerp.current % 1) + 0.000001),
        //     this.position
        // );

        // this.directionalVector.normalize();
        // this.crossVector.crossVectors(
        //     this.directionalVector,
        //     this.staticVector,
        // );

        // this.crossVector.multiplyScalar(100000);
        // this.camera.orthographicCamera.lookAt(0, 0, 0);
    }
}