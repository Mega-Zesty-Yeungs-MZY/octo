import Phaser from 'phaser';
import Player from './classes/PlayerClass.js';
import grassTileset from './assets/texture/grassTileset.png';
import stoneTileset from './assets/texture/stoneGroundTileset.png';
import wallTileset from './assets/texture/wallTileset.png';
import plantTileset from './assets/texture/plantTileset.png';
import propsTileset from './assets/texture/propsTileset.png';
import plantShadowTileset from './assets/texture/plantShadowTileset.png';
import structTileset from './assets/texture/structTileset.png';
import map from './assets/texture/map.json';


export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }
    
    preload() {
        this.load.image('grassTileset', grassTileset);
        this.load.image('stoneTileset', stoneTileset);
        this.load.image('wallTileset', wallTileset);
        this.load.image('plantTileset', plantTileset);
        this.load.image('propsTileset', propsTileset);
        this.load.image('plantShadowTileset', plantShadowTileset);
        this.load.image('structTileset', structTileset);
        this.load.tilemapTiledJSON('map', map);

        
    }
    
    create() {

        var map = this.make.tilemap({key: 'map'});
        var grassTiles = map.addTilesetImage('grassTileset');
        var stoneTiles = map.addTilesetImage('stoneTileset');
        var wallTiles = map.addTilesetImage('wallTileset');
        var plantTiles = map.addTilesetImage('plantTileset');
        var propsTiles = map.addTilesetImage('propsTileset');
        var plantShadowTiles = map.addTilesetImage('plantShadowTileset');
        var structTiles = map.addTilesetImage('structTileset');

        var baseLayer = map.createLayer('baseLayer', [grassTiles, stoneTiles, wallTiles, plantTiles, propsTiles, plantShadowTiles, structTiles], 0, 0);
        var shadow = map.createLayer('shadow', [grassTiles, stoneTiles, wallTiles, plantTiles, propsTiles, plantShadowTiles, structTiles], 0, 0);
        var level2 = map.createLayer('level2', [grassTiles, stoneTiles, wallTiles, plantTiles, propsTiles, plantShadowTiles, structTiles], 0, 0);
        var walls = map.createLayer('walls', [grassTiles, stoneTiles, wallTiles, plantTiles, propsTiles, plantShadowTiles, structTiles], 0, 0);
        var props = map.createLayer('props', [grassTiles, stoneTiles, wallTiles, plantTiles, propsTiles, plantShadowTiles, structTiles], 0, 0);
    }
    
    update() {

    }

}