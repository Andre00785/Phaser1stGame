var config = { // туто ми налаштовуємо сценку
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    scene: {
        parent: game,
        physics: {  //задаємо стиль фізики гри
            default: 'arcade',
            arcade: {
                gravity: { y: 200 },  //додаємо гравітацію
                debug: false
            }
        },
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);  //тут ми дещо теж додаємо :)
var worldWidth = 9600
var console = console
var plants
var platform
var souls
var bombs
var life = 3
var platform
var cursors
var score = 0
var scoreText
var lifeText
var gameOver = false
var playerSpeed = 1000




function preload()// тут ми завантажуємо потрібні матеріали для гри
{
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('plant', 'assets/plant.png');
    this.load.image('soul', 'assets/soul.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('stair', 'assets/stairs.png');
    this.load.spritesheet('dude',
        'assets/dude.png',
        { frameWidth: 129, frameHeight: 129 }
    );
    this.load.spritesheet('dude5',
        'assets/dude5.png',
        { frameWidth: 129, frameHeight: 129 }
    );
}

function create() {

    plant = this.physics.add.staticGroup();

    for (var x = 0; x < worldWidth; x = x + Phaser.Math.FloatBetween(200, 500)) {
        plant
            .create(x, 1080 - 120, 'plant')
            .setOrigin(0, 1)
            .setScale(Phaser.Math.FloatBetween(0.5, 2))
            .setDepth(Phaser.Math.Between(-10, 10));




    }

    var score = 0;
    var scoreText;
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#FFF' });  //це поки що не надо

    cursors = this.input.keyboard.createCursorKeys();
    this.add.image(960, 540, 'sky');   //тут ми можна сказати доаємо на сцену наш фон

    platforms = this.physics.add.staticGroup();

    for (var x = 0; x < worldWidth; x = x + Phaser.Math.Between(600, 700)) //повітряна земля
    { var y = Phaser.Math.FloatBetween(700, 93 * 10)
        .platforms.create(x, y, 'platformStart'); 
        var i; 
        for (i = 1; 
            i < Phaser.Math.Between(0, 5); i++) 
            { platforms.create(x + 100 * i, y, 'platformOne');
         } platforms.create(x + 100 * i, y, 'platformFinish'); }

    for (var x = 0; x < worldWidth; x = x + Phaser.Math.FloatBetween(400, 500)) {
        var y = Phaser.Math.FloatBetween(100, 1000)
        platforms.create(x, y, 'ground');
    }

    player = this.physics.add.sprite(100, 450, 'dude');  //додаємо персонажа і задаємо його розміри і ось 
    player.setScale(0.8)
    player.setBounce(0.1);
    player.setCollideWorldBounds(false);



    this.anims.create({   //створюємо анімації для персонажа
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude5', { start: 9, end: 1 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: this.anims.generateFrameNumbers("dude", {
            frames: [11, 10, 11, 12],
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 1, end: 10 }),
        frameRate: 10,
        repeat: -1
    });
    player.body.setGravityY(50)   //задаємо персонажу гравітацію

    this.physics.add.collider(player, platforms);  //створюємо йому колізію

    souls = this.physics.add.group({   //додаємо зірочки
        key: 'soul',
        repeat: 100,
        setXY: { x: 0, y: 0, stepX: 120 }
    });

    souls.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    this.physics.add.collider(souls, platforms); // задаємо колізію
    this.physics.add.overlap(player, souls, collectStar, null, this);

    scoreText = this.add.text(50, 50, 'Score: 0', { fontSize: '20px', fill: '#FFF' })
        .setOrigin(0, 0)
        .setScrollFactor(0)


    var resetButton = this.add.text(200, 40, 'reset', { fontSize: '40px', fill: '#ccc' })
        .setInteractive()
        .setScrollFactor(0);

    resetButton.on('pointerdown', function () {
        console.log('restart')
        refreshBody()
    });

}

function collectStar(player, soul) {
    soul.disableBody(true, true);
    score += 10;
    scoreText.setText('Score' + score);

    if (souls.countActive(true) === 0) {
        souls.children.interate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 800) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 10, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
}


function update() {


    this.cameras.main.setBounds(0, 0, worldWidth, window.innerHeight);  //робимо камеру щоб вона стежила за гравцем
    this.physics.world.setBounds(0, 0, worldWidth, window.innerHeight);
    this.cameras.main.startFollow(player);

    if (cursors.left.isDown)  //робимо керуваня гравцем
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }

}
