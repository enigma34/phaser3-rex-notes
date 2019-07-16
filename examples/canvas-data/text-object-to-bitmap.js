import CanvasDataPlugin from '../../plugins/canvasdata-plugin.js';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
const RandomXY = Phaser.Math.RandomXY;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.mushrooms;
    }

    preload() {
    }

    create() {
        var txt = this.add.text(0, 0, 'hello');

        var startX = 250, startY = 200, width = 6, height = 6,
            offsetXY = { x: 0, y: 0 };
        this.plugins.get('rexCanvasData').textObjectToBitMap(txt)
            .forEachNonZero(function (value, x, y, bitMap) {
                var destinationX = startX + (x * width);
                var destinationY = startY + (y * height);
                offsetXY = RandomXY(offsetXY, 300);
                var gameObject = this.add.rectangle(
                    (destinationX + offsetXY.x),
                    (destinationY + offsetXY.y),
                    width,
                    height,
                    COLOR_LIGHT
                )
                this.tweens.add({
                    targets: gameObject,
                    x: destinationX,
                    y: destinationY,
                    ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
                    duration: 1000,
                    repeat: 0,            // -1: infinity
                    yoyo: false
                });

            }, this)
    }

    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexCanvasData',
            plugin: CanvasDataPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);