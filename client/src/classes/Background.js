export default class Background {

    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.sprite = this.scene.physics.add.sprite(this.x, this.y, 'grass');
        this.sprite.body.immovable = true;
        this.sprite.body.moves = false;
    }
}