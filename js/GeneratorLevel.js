import Affichage from "./Affichage.js";
import GeneratorToken from "./GeneratorToken.js";

export default class GeneratorLevel{
    main;
    obstacle;
    createNewLevel=true;
    access=false;
    poutres=[];
    rotation=1.57;
    constructor(obstacle,main) {
        this.main=main;
        this.obstacle = obstacle;
        this.scene = main.scene;
        this.nbrJeton = main.nbrJeton;
        this.printer = new Affichage(main);
        this.generatorToken = new GeneratorToken(main);
    }


    generateLevel() {
        if (this.main.nbrJetonToGenerate === 0) {
            this.deleteLevel();
            this.main.level += 1;
            this.createNewLevel = true;
        }
        switch (this.main.level % 9) {
            case -1: {
                if (this.createNewLevel) {
                    this.menuLevel();
                    this.createNewLevel = false;
                }
                break;
            }
            case 0:{
                if (this.createNewLevel) {
                    this.createLevel0();
                    this.main.collision();
                    this.createNewLevel = false;
                    if(this.access)this.main.affichage.dispose();
                    this.printer.printNumberOfJeton();
                }
                break;
            }
            case 1: {
                if (this.createNewLevel) {
                    this.createLevel1();
                    this.main.collision();
                    this.createNewLevel = false;
                    this.main.affichage.dispose();
                    this.printer.printNumberOfJeton();
                }
                break;
            }
            case 2:
            {
                if (this.createNewLevel) {
                    this.createLevel2();
                    this.main.collision();
                    this.changeGravity = this.obstacle.inverseGravity(this.main.respawn.x,this.main.respawn.y - 5,this.main.respawn.z);
                    this.createNewLevel = false;
                    this.main.affichage.dispose();
                    this.printer.printNumberOfJeton();
                    this.access=true;
                }
                this.changeGravity.move();

                break;

            }
            case 3: {
                if (this.createNewLevel) {
                    this.createLevel3();
                    this.main.collision();
                    this.createNewLevel = false;
                    this.main.affichage.dispose();
                    this.printer.printNumberOfJeton();
                }
                this.main.key.rotate(BABYLON.Axis.Z, 0.02);
                break;
            }
            case 4: {
                if (this.createNewLevel) {
                    this.createLevel4();
                    this.main.collision();
                    this.createNewLevel = false;
                    this.main.affichage.dispose();
                    this.printer.printNumberOfJeton();
                }
                break;
            }
            case 5: {
                if (this.createNewLevel) {
                    this.createLevel5();
                    this.main.collision();
                    this.obstacle.floorIsLava(this.main.respawn.x+10, 0, 0);
                    this.obstacle.createInvisibleHouse(210, 32, 0);
                    this.createNewLevel = false;
                    this.main.affichage.dispose();
                    this.printer.printNumberOfJeton();
                }
                break;
            }
            case 6: {
                if (this.createNewLevel) {
                    this.main.floorisLava=false;
                    this.createLevel6();
                    this.main.collision();
                    this.createNewLevel = false;
                    this.main.affichage.dispose();
                    this.printer.printNumberOfJeton();

                }
                for (let i = 0; i < this.poutres.length; i++) {
                    this.poutres[i].rotate(BABYLON.Axis.Y, 0.02);
                }
                break;
            }
            case 7: {
                if (this.createNewLevel) {
                    this.createLevel7();
                    this.main.collision();
                    this.createNewLevel = false;
                    this.main.affichage.dispose();
                    this.printer.printNumberOfJeton();
                    this.access=true;
                }
                for (let i = 0; i < this.pique.length; i++) {
                    if (i===0){
                        this.pique[i].move("y");
                    }
                    else{
                        this.pique[i].move("z");
                    }
                }
                this.manche.move();


                break;
            }
            case 8:
            {
                if (this.createNewLevel) {
                    this.createLevel8();
                    this.main.collision();
                    this.createNewLevel = false;
                    this.main.affichage.dispose();
                    this.printer.printNumberOfJeton();
                    this.access=true;
                }

                this.ascenseur.move()
            }

        }
    }

    mySwitch(main){
        main.nbrJetonToGenerate = 0;
    }
    menuLevel(){
        this.obstacle.createStep(100, 100, this.main.respawn.x, this.main.respawn.y - 5, this.main.respawn.z,true);
        // GUI
        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        this.main.nbrJetonToGenerate = 5;
        var button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "START GAME");
        button1.fontSize = "10%";
        button1.width = "40%";
        button1.height = "40%";
        button1.color = "white";
        button1.cornerRadius = 20;
        button1.background = "rgba(0, 0, 0, 0.5)";
        var obj = this.main;



        var textblock = new BABYLON.GUI.TextBlock();
        textblock.text = "ZQSD to move\n" +
            "SPACEBAR to jump (you have a double jump)\n" +
            "Grab all the tokens of a level to go to the next one";
        textblock.fontSize = 24;
        textblock.top = "25%";
        textblock.color = "white";
        textblock.cornerRadius = 20;

        button1.onPointerUpObservable.add(function() {
            obj.nbrJetonToGenerate = 0;
            advancedTexture.dispose();
        });
        advancedTexture.addControl(textblock);
        advancedTexture.addControl(button1);

    }
    createLevel0(){
        this.main.allJeton=5;
        this.obstacle.createStep(100, 100, this.main.respawn.x, this.main.respawn.y - 5, this.main.respawn.z,true);
        this.generatorToken.generateJetons( (this.main.respawn.x+99), (this.main.respawn.x+49),(this.main.respawn.z+99),(this.main.respawn.z+49));
    }

    createLevel1(){
        this.main.allJeton=5;
        this.obstacle.createStep(20, 20, this.main.respawn.x, this.main.respawn.y - 5, this.main.respawn.z, true)
        this.obstacle.createStep(17, 17, this.main.respawn.x+30, this.main.respawn.y - 5, this.main.respawn.z, true)
        this.obstacle.createStep(15, 15, this.main.respawn.x+60, this.main.respawn.y - 5, this.main.respawn.z, true)
        this.obstacle.createStep(12, 12, this.main.respawn.x+90, this.main.respawn.y - 5, this.main.respawn.z, true)
        this.obstacle.createStep(100, 5, this.main.respawn.x+165, this.main.respawn.y-5, this.main.respawn.z,true);
        this.obstacle.createStep(10, 10, this.main.respawn.x+240, this.main.respawn.y - 5, this.main.respawn.z, true)

        this.generatorToken.createJeton(this.nbrJeton,this.main.respawn.x+30,this.main.respawn.y - 2,this.main.respawn.z);
        this.nbrJeton-=1;
        this.generatorToken.createJeton(this.nbrJeton,this.main.respawn.x+60,this.main.respawn.y - 2,this.main.respawn.z);
        this.nbrJeton-=1;
        this.generatorToken.createJeton(this.nbrJeton,this.main.respawn.x+90,this.main.respawn.y - 2,this.main.respawn.z);
        this.nbrJeton-=1;
        this.generatorToken.createJeton(this.nbrJeton,this.main.respawn.x+165,this.main.respawn.y - 2,this.main.respawn.z);
        this.nbrJeton-=1;
        this.generatorToken.createJeton(this.nbrJeton,this.main.respawn.x+240,this.main.respawn.y - 2,this.main.respawn.z);
        this.nbrJeton-=1;


    }
    createLevel2(){
        this.main.allJeton=5;
        this.obstacle.createStep(10, 10, this.main.respawn.x, this.main.respawn.y - 5, this.main.respawn.z, true);
        for (let i = 0; i < 4; i++) {
            var xpos =i%2===0 ? 10*i : -10;
            var zpos=i%2===0 ? (5*i) : -(5*i);
            this.generatorToken.createJeton(this.nbrJeton,this.main.respawn.x+90+xpos,this.main.respawn.y+80,this.main.respawn.z+zpos,true);
            this.nbrJeton-=1;
        }
        this.generatorToken.createJeton(this.nbrJeton,this.main.respawn.x+144,this.main.respawn.y-3,this.main.respawn.z,true);
        this.nbrJeton-=1;

    }

    createLevel3() {
        this.main.allJeton=4;
        this.main.nbrJetonToGenerate = 4;
        this.obstacle.createStep(10, 10, this.main.respawn.x, this.main.respawn.y - 5, this.main.respawn.z, true)
        this.obstacle.stepByStep(30, 0);
        this.obstacle.poutre(140, 0);
        this.obstacle.createStep(100, 5, 320, 10, -10,true);
        this.obstacle.createStep(100, 100, 435, 10, 0);
        this.obstacle.coffreFort(469, 12, 20);
        this.obstacle.createKey(277, 8, 10);

    }
    createLevel4() {
        this.main.allJeton=5;
        this.obstacle.createStep(10, 10, this.main.respawn.x, this.main.respawn.y - 5, this.main.respawn.z, true);

        this.obstacle.createStep(100, 5, this.main.respawn.x+75, this.main.respawn.y-5, this.main.respawn.z,true);

        let stepD=this.obstacle.createStep(23, 7, this.main.respawn.x+125, this.main.respawn.y-5, this.main.respawn.z-9,true);
        stepD.rotate(BABYLON.Axis.Y, 1.57);

        this.generatorToken.createJeton(this.nbrJeton,this.main.respawn.x+125,this.main.respawn.y-2,this.main.respawn.z);
        this.nbrJeton-=1;

        this.obstacle.createStep(100, 5, this.main.respawn.x+175, this.main.respawn.y-5, this.main.respawn.z-18,true);
        this.generatorToken.createJeton(this.nbrJeton,this.main.respawn.x+225,this.main.respawn.y-2,this.main.respawn.z-17);
        this.nbrJeton-=1;

        let stepG = this.obstacle.createStep(200, 5, this.main.respawn.x+228, this.main.respawn.y-5, this.main.respawn.z-10,true);
        stepG.rotate(BABYLON.Axis.Y, 1.57);
        this.obstacle.createStep(100, 5, this.main.respawn.x+235, this.main.respawn.y-5.1, this.main.respawn.z-50,true);
        this.generatorToken.createJeton(this.nbrJeton,this.main.respawn.x+284,this.main.respawn.y-2,this.main.respawn.z-50);
        this.nbrJeton-=1;
        this.generatorToken.createJeton(this.nbrJeton,this.main.respawn.x+186,this.main.respawn.y-2,this.main.respawn.z-50);
        this.nbrJeton-=1;
        this.obstacle.createStep(100, 5, this.main.respawn.x+280, this.main.respawn.y-5.1, this.main.respawn.z+87.5,true);
        this.generatorToken.createJeton(this.nbrJeton,this.main.respawn.x+330,this.main.respawn.y-2,this.main.respawn.z+87.5);
        this.nbrJeton-=1;


    }

    createLevel5(){
        this.main.allJeton=1;
        this.main.nbrJetonToGenerate = 1;
        this.obstacle.createStep(10, 10, this.main.respawn.x, this.main.respawn.y - 5, this.main.respawn.z, true);
        this.obstacle.createStep(100, 100, 195, 30, 0, true);
    }

    createLevel6(){
        this.main.allJeton=5;
        this.obstacle.createStep(10, 10, this.main.respawn.x, this.main.respawn.y - 5, this.main.respawn.z, true);
        this.poutres=this.obstacle.createRondin(60,-20,0);
        var acc=0;
        for (let i = 1; i < 5; i++) {
            acc+=50;
            this.generatorToken.createJeton(this.nbrJeton,this.main.respawn.x+acc,this.main.respawn.y,this.main.respawn.z);
            this.nbrJeton-=1;

        }
        this.obstacle.createStep(10, 10, 290, this.main.respawn.y-5, this.main.respawn.z, false);
        this.generatorToken.createJeton(this.nbrJeton,300,this.main.respawn.y-3,this.main.respawn.z);
        this.nbrJeton-=1;

        for (let i = 0; i < this.poutres.length; i++) {
            this.main.allObstacles[this.main.ind++] = this.poutres[i];
        }
    }

    createLevel7(){
        this.main.allJeton=4;
        this.main.nbrJetonToGenerate = 4;
        var sens;
        this.obstacle.createStep(10, 10, this.main.respawn.x, this.main.respawn.y - 5, this.main.respawn.z, true);
        let step1=this.obstacle.createStep(7, 30, this.main.respawn.x+30, this.main.respawn.y - 5, this.main.respawn.z, false);
        let step2=this.obstacle.createStep(7, 30, this.main.respawn.x+85, this.main.respawn.y - 5, this.main.respawn.z, false);
        this.pique=[];
        for (let i = 0; i < 3; i++) {
            var acc = i<2 ? 10 : -10;
            this.pique[i] = i===0 ? this.obstacle.createPique(60,this.main.respawn.y - 5,this.main.respawn.z) : this.obstacle.createPique(110,this.main.respawn.y,this.main.respawn.z+acc,sens = i !== 2);
            if (i>0) this.pique[i].rotate(BABYLON.Axis.X, this.rotation=i===1? -1.57 : 1.57);
        }
        let step3=this.obstacle.createStep(7, 130, this.main.respawn.x+180, this.main.respawn.y - 5, this.main.respawn.z, false);

        this.manche = this.obstacle.createBoulet(this.main.respawn.x+180,this.main.respawn.y+20,this.main.respawn.z);

        step1.rotate(BABYLON.Axis.Y, this.rotation);
        step2.rotate(BABYLON.Axis.Y, this.rotation);
        step3.rotate(BABYLON.Axis.Y, this.rotation);

        this.generatorToken.createJeton(this.nbrJeton,this.main.respawn.x+30,this.main.respawn.y-3,this.main.respawn.z);
        this.nbrJeton-=1;
        this.generatorToken.createJeton(this.nbrJeton,this.main.respawn.x+85,this.main.respawn.y-3,this.main.respawn.z);
        this.nbrJeton-=1;
        this.generatorToken.createJeton(this.nbrJeton,this.main.respawn.x+135,this.main.respawn.y-3,this.main.respawn.z);
        this.nbrJeton-=1;
        this.generatorToken.createJeton(this.nbrJeton,this.main.respawn.x+225,this.main.respawn.y-3,this.main.respawn.z);
        this.nbrJeton-=1;

    }

    createLevel8(){
        this.main.allJeton=5;
        this.obstacle.createStep(10, 10, this.main.respawn.x, this.main.respawn.y - 5, this.main.respawn.z, true);

        let step1 = this.obstacle.createStep(10, 80, this.main.respawn.x+60, this.main.respawn.y - 5, this.main.respawn.z, true);
        step1.rotate(BABYLON.Axis.Y, this.rotation);

        this.ascenseur=this.obstacle.ascenseur(this.main.respawn.x+130,this.main.respawn.y - 5, this.main.respawn.z);

        let step2 = this.obstacle.createStep(10, 80, this.main.respawn.x+190, this.main.respawn.y +65, this.main.respawn.z, true);
        step2.rotate(BABYLON.Axis.Y, this.rotation);

        this.obstacle.stepIncline(this.main.respawn.x+260,this.main.respawn.y +65,this.main.respawn.z)

        let step3 = this.obstacle.createStep(10, 80, this.main.respawn.x+390, this.main.respawn.y -5, this.main.respawn.z, true);
        step3.rotate(BABYLON.Axis.Y, this.rotation);
        this.generatorToken.createJeton(this.obstacle.nbrJeton, this.main.respawn.x+390, this.main.respawn.y -2, this.main.respawn.z);
        this.obstacle.nbrJeton -= 1;

    }



    deleteLevel() {
        this.main.allObstacles.forEach(obstacle => {
            if (obstacle.physicsImpostor) {
                obstacle.physicsImpostor.dispose();
            }
            obstacle.dispose();
        });
        for (let i = 0; i < this.scene.jetons.length; i++) {
            delete this.scene.jetons[i];
        }
        for (let i = 0; i < this.main.ind; i++) {
            delete this.main.allObstacles[i];
        }
        this.main.boule.physicsImpostor.setAngularVelocity(new BABYLON.Quaternion(0, 0, 0, 0));
        this.main.boule.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, 0, 0));
        this.main.nbrJeton = 5;
        this.main.nbrJetonToGenerate = 5;
        this.nbrJeton = 5;
        this.obstacle.nbrJeton=5;
        this.main.boule.key=false;
        this.main.boule.position = new BABYLON.Vector3(this.main.respawn.x, this.main.respawn.y, this.main.respawn.z)
        if(this.main.level % 9===2 || this.obstacle.light) {
            this.scene.getPhysicsEngine().setGravity(new BABYLON.Vector3(this.scene.getPhysicsEngine().gravity.x, -80,this.scene.getPhysicsEngine().gravity.z));
            this.main.camera.beta=3.14/3;
            this.obstacle.groundPlafond.dispose();
        }


    }

}