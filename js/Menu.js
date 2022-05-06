export default class Menu{
    constructor(main,obstacle) {
        this.main = main;
        this.obstacle=obstacle;
        this.main.canMove=true;
    }

    createText(text){
        let textblock = new BABYLON.GUI.TextBlock();
        textblock.text = text;
        textblock.fontSize = "3%";
        textblock.outlineColor = "black";
        textblock.outlineWidth = 4;
        textblock.color = "white";
        textblock.fontWeight = "bold";
        textblock.cornerRadius = 20;
        return textblock
    }


    genButtonStart(advancedTexture){
        let button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "START GAME");
        button1.fontSize = "5%";
        button1.top = "-8%";
        button1.width = "30%";
        button1.height = "10%";
        button1.color = "white";
        button1.cornerRadius = 20;
        button1.background = "rgba(0, 0, 0, 0.5)";
        let obj = this.main;
        let menu = this;

        button1.onPointerUpObservable.add(function() {
            obj.nbrJetonToGenerate = menu.welcome ? 0 : obj.nbrJetonToGenerate;
            advancedTexture.dispose();
            obj.canMove = menu.welcome;
            obj.turn = true;
        });
        return button1;
    }

    genButtonHelp(btnStart,advancedTexture,myText){
        let button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "HELP");
        button1.fontSize = "5%";
        button1.top = "8%";
        button1.width = "30%";
        button1.height = "10%";
        button1.color = "white";
        button1.cornerRadius = 20;
        button1.background = "rgba(0, 0, 0, 0.5)";
        let main = this;
        button1.onPointerUpObservable.add(function() {
            button1.dispose();
            btnStart.dispose();
            myText.dispose();
            main.genTextHelp(advancedTexture,myText);
        });
        return button1;
    }
    genTextHelp(advancedTexture,text){
        let myText =  new BABYLON.GUI.TextBlock();
        myText.text = "Overcome all obstacles to find your double\n and beat him to become unique";
        myText.outlineColor = "black";
        myText.outlineWidth = 4;
        myText.fontSize = "3%";
        myText.top = "-18%";
        myText.color = "white";
        myText.fontWeight = "bold";
        let or = this.createText("or");
        or.top="-5%";
        or.left="-2%";

        let toMove= this.createText("to Move");
        toMove.top="-5%";
        toMove.left="15%";

        let toJump= this.createText("to Jump");
        toJump.top="3%";
        toJump.left="-1%";

        let p_buttonText= this.createText("to see all the level");
        p_buttonText.top="10%";
        p_buttonText.left="2.5%";



        let zqsdKey = new BABYLON.GUI.Image("zqsd", "images/zqsd.png");
        zqsdKey.width = "10%";
        zqsdKey.height = "10%";
        zqsdKey.top = "-8%";
        zqsdKey.left = "-9%";

        let fleche = new BABYLON.GUI.Image("fleche", "images/fleche.png");
        fleche.width = "10%";
        fleche.height = "10%";
        fleche.top = "-8%";
        fleche.left = "5%";

        let spacebarKey = new BABYLON.GUI.Image("space", "images/spacebar.png");
        spacebarKey.width = "7%";
        spacebarKey.height = "5%";
        spacebarKey.left = "-9%";
        spacebarKey.top = "3%";

        let p_button = new BABYLON.GUI.Image("p-button", "images/p-button.png");
        p_button.width = "5%";
        p_button.height = "6%";
        p_button.left = "-9%";
        p_button.top = "10%";



        let button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "RETURN");
        button1.fontSize = "2%";
        button1.top = "19%";
        button1.width = "10%";
        button1.height = "5%";
        button1.color = "white";
        button1.cornerRadius = 20;
        button1.background = "rgba(0, 0, 0, 0.5)";
        let main = this;
        button1.onPointerUpObservable.add(function() {
            button1.dispose();
            or.dispose();
            toMove.dispose();
            toJump.dispose();
            spacebarKey.dispose();
            p_buttonText.dispose();
            zqsdKey.dispose();
            fleche.dispose();
            p_button.dispose();
            myText.dispose();
            advancedTexture.addControl(text);
            let buttonStart = main.genButtonStart(advancedTexture);
            advancedTexture.addControl(buttonStart);
            advancedTexture.addControl(main.genButtonHelp(buttonStart,advancedTexture,text));
        });
        advancedTexture.addControl(myText);
        advancedTexture.addControl(or);
        advancedTexture.addControl(toMove);
        advancedTexture.addControl(toJump);
        advancedTexture.addControl(spacebarKey);
        advancedTexture.addControl(zqsdKey);
        advancedTexture.addControl(fleche);
        advancedTexture.addControl(p_buttonText);
        advancedTexture.addControl(button1);
        advancedTexture.addControl(p_button)

    }
    menuMain(i,img){
        this.main.canMove = false;
        this.main.turn=false;
        this.welcome = i === undefined;
        // GUI
        let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        let myText =  new BABYLON.GUI.TextBlock();
        let button1 = this.genButtonStart(advancedTexture);
        let buttonHlp = this.genButtonHelp(button1,advancedTexture,myText);



        let rectangle = img ? new BABYLON.GUI.Image("name",img) : new BABYLON.GUI.Image("name", "images/welcome.jpg");
        rectangle.width = "45%";
        rectangle.height = "50%";
        rectangle.cornerRadius = 20;


        myText.text = i ? "Level "+i : "Catch and Become Unique";
        myText.outlineColor = "black";
        myText.outlineWidth = 4;
        myText.fontSize = "5%";
        myText.top = "-20%";
        myText.color = "white";
        myText.fontWeight = "bold";

        advancedTexture.addControl(rectangle);
        advancedTexture.addControl(myText);

        advancedTexture.addControl(buttonHlp);
        advancedTexture.addControl(button1);

    }
}