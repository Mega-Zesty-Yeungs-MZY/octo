export default class MenuScene extends Phaser.Scene {
    constructor() {
      super('menuScene');
    }

    init() {
        // Initialize scene (or pass parameters to scene)
        
    }
  
    preload() {
      // Preload assets for the menu scene

    }
  
    create() {
      // Create the menu scen
        // Get the button element
        // const switchButton = document.getElementById('switchButton');
        const thisScene = this;
        // // Add an event listener to the button
        // switchButton.addEventListener('click', function() {
        //     // Switch to the leaderboard scene
        //     thisScene.scene.start('MainScene');
        //     switchButton.style.display = 'none';
        // });
        //game title
        this.add.text(
            400, 
            100, 
            'Octo Games', 
            { fontSize: '64px', fill: '#fff' });

        // if user clicks on the text, switch scnee
        this.add.text(
            400,
            200,
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