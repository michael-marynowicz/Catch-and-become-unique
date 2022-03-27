export default class Main {


    boule;

    key;
    inputStates = {};
    allStep=[];
    ind=0;


    constructor(scene, ground, faille, respawnPoint) {
        this.scene = scene;
        this.ground = ground;
        this.faille = faille;
        this.nbrJeton = 11;
        this.nbrJetonToGenerate = 11;
        this.respawn = respawnPoint;
        this.createStep(10, 10, respawnPoint.x, respawnPoint.y - 5, respawnPoint.z)

    }

    createStep(w, s, x, y, z) {
        let step = new BABYLON.MeshBuilder.CreateBox("step_", {size: s, width: w, height: 2}, this.scene);
        step.physicsImpostor = new BABYLON.PhysicsImpostor(step, BABYLON.PhysicsImpostor.BoxImpostor, {
            mass: 0,
            restitution: 0
        }, this.scene);
        step.material = new BABYLON.StandardMaterial("stepMaterial", this.scene);
        step.material.diffuseTexture = new BABYLON.Texture("images/diffuse.jpg");
        step.checkCollisions = true;
        step.position = new BABYLON.Vector3(x, y, z);
        this.allStep[this.ind]=step;
        this.ind+=1;
        return step;
    }


    createSphere(scene) {
        let boule = new BABYLON.MeshBuilder.CreateSphere("heroboule", {diameter: 7}, scene);
        boule.applyGravity = true;
        boule.position = new BABYLON.Vector3(this.respawn.x, this.respawn.y, this.respawn.z);
        boule.checkCollisions = true;
        let speed = 2;
        boule.applyGravity = true;
        boule.material = new BABYLON.StandardMaterial("s-mat", scene);
        boule.material.diffuseTexture = new BABYLON.Texture("images/lightning.jpg", scene);
        boule.material.emissiveColor = new BABYLON.Color3.Red;
        boule.material.diffuseTexture.uScale *= 4;

        boule.physicsImpostor = new BABYLON.PhysicsImpostor(boule, BABYLON.PhysicsImpostor.SphereImpostor, {
            mass: 50,
            restitution: 0
        }, scene);
        let canJump = true;
        boule.move = () => {
            let velocityLin = boule.physicsImpostor.getLinearVelocity();
            if (this.inputStates.up && velocityLin.x < 30) {
                boule.physicsImpostor.setAngularVelocity(new BABYLON.Quaternion(0, 0, -speed, 0));
                boule.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(velocityLin.x + speed, velocityLin.y, velocityLin.z));
            }
            if (this.inputStates.down && velocityLin.x > -30) {
                boule.physicsImpostor.setAngularVelocity(new BABYLON.Quaternion(0, 0, speed, 0));
                boule.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(velocityLin.x - speed, velocityLin.y, velocityLin.z));
            }
            if (this.inputStates.left && velocityLin.z < 30) {
                boule.physicsImpostor.setAngularVelocity(new BABYLON.Quaternion(speed, 0, 0, 0));
                boule.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(velocityLin.x, velocityLin.y, velocityLin.z + speed));
            }
            if (this.inputStates.right && velocityLin.z > -30) {
                boule.physicsImpostor.setAngularVelocity(new BABYLON.Quaternion(-speed, 0, 0, 0));
                boule.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(velocityLin.x, velocityLin.y, velocityLin.z - speed));
            }

            if (this.inputStates.space && canJump) {
                canJump = false;
                boule.physicsImpostor.applyImpulse(new BABYLON.Vector3(0, 500, 0), boule.getAbsolutePosition());
                setTimeout(() => {
                    canJump = true;
                }, 1500)
            }
        };

        this.boule = boule;
        return this.boule;
    }

    modifySettings(window) {
        // key listeners for the tank
        this.inputStates.left = false;
        this.inputStates.right = false;
        this.inputStates.up = false;
        this.inputStates.down = false;
        this.inputStates.space = false;

        //add the listener to the main, window object, and update the states
        window.addEventListener('keydown', (event) => {
            if ((event.key === "ArrowLeft") || (event.key === "q") || (event.key === "Q")) {
                this.inputStates.left = true;
            } else if ((event.key === "ArrowUp") || (event.key === "z") || (event.key === "Z")) {
                this.inputStates.up = true;
            } else if ((event.key === "ArrowRight") || (event.key === "d") || (event.key === "D")) {
                this.inputStates.right = true;
            } else if ((event.key === "ArrowDown") || (event.key === "s") || (event.key === "S")) {
                this.inputStates.down = true;
            } else if (event.key === " ") {
                this.inputStates.space = true;
            }
        }, false);

        //if the key will be released, change the states object
        window.addEventListener('keyup', (event) => {
            if ((event.key === "ArrowLeft") || (event.key === "q") || (event.key === "Q")) {
                this.inputStates.left = false;
            } else if ((event.key === "ArrowUp") || (event.key === "z") || (event.key === "Z")) {
                this.inputStates.up = false;
            } else if ((event.key === "ArrowRight") || (event.key === "d") || (event.key === "D")) {
                this.inputStates.right = false;
            } else if ((event.key === "ArrowDown") || (event.key === "s") || (event.key === "S")) {
                this.inputStates.down = false;
            } else if (event.key === " ") {
                this.inputStates.space = false;
            }
        }, false);
    }

    createJeton(i, x, y, z) { // cree un jeton aux coordonnées (x,y,z)
        let jeton = new BABYLON.MeshBuilder.CreateSphere("jeton_" + i, {diameter: 2}, this.scene);
        let jetonMaterial = new BABYLON.StandardMaterial("jetonMaterial", this.scene);
        jeton.position = new BABYLON.Vector3(x, y, z)
        jetonMaterial.emissiveColor = new BABYLON.Color3.Blue;
        jeton.material = jetonMaterial;
        jeton.checkCollisions = true;
        this.scene.jetons[i] = jeton;
        this.nbrJeton = i - 1;
        return jeton;

    }

    generateJetons() { //genere des jetons a des endroits aleatoire

        this.scene.jetons[this.nbrJeton] = this.createKey();
        this.key = this.scene.jetons[this.nbrJeton];
        let e = 11 - this.nbrJeton.valueOf();
        for (let i = 0; i < e; i++) {
            let xrand = Math.floor(Math.random() * 1000 - 480);
            let zrand = Math.floor(Math.random() * 200 - 100);
            this.createJeton(i, xrand, 1, zrand);
        }
        return this.key;


    }

    collision() {
        this.boule.actionManager = new BABYLON.ActionManager(this.scene);
        this.scene.jetons.forEach(jeton => {
            this.boule.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
                {
                    trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
                    parameter: jeton
                },
                () => {
                    if (jeton === this.key) {
                        this.boule.key = true;
                        this.key.particles.stop();
                    }
                    jeton.dispose();
                    this.nbrJeton -= 1;
                }
            ));
        });
        this.boule.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
            {
                trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
                parameter: this.faille
            },
            () => {
                if (this.boule.key) this.faille.dispose();


            }));
        this.boule.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
            {
                trigger: BABYLON.ActionManager.OnIntersectionExitTrigger,
                parameter: this.ground
            },
            () => {
                var music = new BABYLON.Sound("Violons", "sounds/rebond.wav", this.scene, null, {
                    loop: false,
                    autoplay: true
                });

            }));

        this.allStep.forEach(step => {
            this.boule.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
                {
                    trigger: BABYLON.ActionManager.OnIntersectionExitTrigger,
                    parameter: step
                },
                () => {
                    var music = new BABYLON.Sound("Violons", "sounds/rebond.wav", this.scene, null, {
                        loop: false,
                        autoplay: true
                    });

                }));
        });
    }



    events() {
        if (this.boule.intersectsMesh(this.ground, true)) {
            this.boule.position = new BABYLON.Vector3(this.respawn.x, this.respawn.y, this.respawn.z);
            this.boule.physicsImpostor.setAngularVelocity(new BABYLON.Quaternion(0, 0, 0, 0));
            this.boule.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, 0, 0));
        }
    }


    createPanneau(parent, x, y, z, message, messageOnClick) {
        var plane = BABYLON.Mesh.CreatePlane("plane", 10, this.scene);
        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane);
        plane.parent = parent;
        plane.position = new BABYLON.Vector3(x, y, z);
        plane.rotation.y = 1.58;

        var button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", message);
        button1.width = 20;
        button1.height = 20;
        button1.color = "white";
        button1.fontSize = 200;
        button1.background = "green";
        button1.onPointerUpObservable.add(function () {
            alert(messageOnClick);
        });
        advancedTexture.addControl(button1);

        return button1;
    }


}