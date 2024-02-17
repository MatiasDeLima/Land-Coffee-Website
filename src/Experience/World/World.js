import * as THREE from "three";
import EventEmitter from "events";
import Experience from "../Experience.js";
import Room from "./Room.js";
import Environment from "./Environment.js";
import Floor from "./Floor.js";
import Controls from "./Controls.js";

export default class World extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;

        this.resources.on("ready", () => {
            this.environment = new Environment();
            this.room = new Room();
            this.floor = new Floor();

            this.controls = new Controls();

            this.emit("woldready");
        })
    }

    resize() { }

    update() {
        if (this.room) {
            this.room.update();
        }

        if (this.controls) {
            this.controls.update();
        }
    }
} 