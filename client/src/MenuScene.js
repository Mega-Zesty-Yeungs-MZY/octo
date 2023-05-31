import octopus from './assets/octopus.png';
export default class MenuScene extends Phaser.Scene {
    constructor() {
      super('menuScene');
    }

    init() {
        // Initialize scene (or pass parameters to scene)
        this.config = this.sys.game.config;
    }
  
    preload() {
      // Preload assets for the menu scene
        this.load.image('background', octopus);
    }
  
    create() {
      // Create the menu scen
        // Get the button element
        // const switchButton = document.getElementById('switchButton');
        const thisScene = this;
        // Add background image
        const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
        backgroundImage.setScale(this.config.width / backgroundImage.width, this.config.height / backgroundImage.height);
        //game title
        this.add.text(
            this.config.width / 2 - 200, 
            this.config.height / 2 - 200, 
            'Octo Games', 
            { fontSize: '64px', fill: '#fff' });

        // if user clicks on the text, switch scnee
        this.add.text(
           this.config.width / 2 - 100,
            this.config.height / 2 - 100,
            'Click to start',
            { fontSize: '32px', fill: '#fff' }
        ).setInteractive().on('pointerdown', () => {
            thisScene.scene.start('MainScene');
        });
      

    }
  
    update() {
      // Update logic for the menu scene

    }
  }