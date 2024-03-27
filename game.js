var config = { 
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    scene: {
        physics: {  
            default: 'arcade',
            arcade: {
                gravity: { y: 200 }, 
                debug: false
            }
        },
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
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

function preload()
{
  this.load.image('Fon', 'assets/Fon1');
  this.load.image('', '');
  this.load.spriteshit('dude', 'assets/Player',
    { frameWidth: 147, frameHeight: 294 }
    );
<<<<<<< Updated upstream
    this.load.spritesheet('Enemy',
        'assets/enemy.png',
        { frameWidth: 80, frameHeight: 80 }
    );
=======
  this.load.spriteshit('dude1', 'assets/Player1',
  { frameWidth: 147, frameHeight: 294 }
  );

>>>>>>> Stashed changes
}

function create()
{

  this.add.TileSprite(0, 0, worldWidth, 1080, "Fon0")
  .setOrigin(0,0)
  .setScale(1)
  .setDepth(0);




<<<<<<< Updated upstream
    }

    var score = 0;
    var scoreText;
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#FFF' });  //це поки що не надо

    cursors = this.input.keyboard.createCursorKeys();
    this.add.image(960, 540, 'sky');   //тут ми можна сказати доаємо на сцену наш фон

    platforms = this.physics.add.staticGroup();

    for (var x = 0; x < worldWidth; x = x + Phaser.Math.Between(600, 700)) //повітряна земля
    { var y = Phaser.Math.FloatBetween(700, 93 * 10);
        var i; 
        for (i = 1; 
            i < Phaser.Math.Between(0, 5); i++) 
            { platforms.create(x + 50 * i, y, 'platformOne');
         } 
         } 


         for (var x = 0; x < worldWidth; x = x + 128) {  //тут ми додаємо платформи які спауняться випадковим образом
            console.log(x)
            platforms.create(x, 1080 - 128, 'ground')
                .setOrigin(0, 0)
                .refreshBody()
                .setScale(1);  
        }


    player = this.physics.add.sprite(100, 450, 'dude');  //додаємо персонажа і задаємо його розміри і ось 
    player.setScale(0.8)
=======
  player = this.physics.add.sprite(100, 450, 'dude');
    player.setScale(1)
>>>>>>> Stashed changes
    player.setBounce(0.1);
    player.setCollideWorldBounds(false);



    this.anims.create({ 
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude1', { start: 3, end: 0 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: this.anims.generateFrameNumbers("dude", {
            frames: [0],
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: -1
    });
<<<<<<< Updated upstream
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

    this.physics.add.collider(souls, platforms,); // задаємо колізію
    this.physics.add.overlap(player, souls, collectStar, null, this);

lifeText = this.add.text(1700, 40, showLife(), { frontSize: '40px', fill: '#FFF'})
.setOrigin(0, 0)
.setScrollFactor(0)

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

    Enemy = this.physics.add.sprite(1000, 700, 'Enemy');  //додаємо ворога і задаємо його розміри і ось 
    Enemy.setScale(1)
    Enemy.setBounce(0.1);
    Enemy.setCollideWorldBounds(false);

    this.physics.add.collider(Enemy, platforms);

    player.body.setGravityY(100)

    this.anims.create({   //створюємо анімації для ворога
        key: 'left1',
        frames: this.anims.generateFrameNumbers('Enemy', { start: 1, end: 2 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn1',
        frames: this.anims.generateFrameNumbers("Enemy", {
            frames: [0],
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'right1',
        frames: this.anims.generateFrameNumbers('Enemy', { start: 3, end: 4 }),
        frameRate: 10,
        repeat: -1
    });

}

function collectStar(player, soul) {
    soul.disableBody(true, true);
    score += 10;

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

    if (cursors.left.isDown)  //робимо керуваня Enemy
    {
        Enemy.setVelocityX(-160);

        Enemy.anims.play('left1', true);
    }
    else if (cursors.right.isDown) {
        Enemy.setVelocityX(160);

        Enemy.anims.play('right1', true);
    }
    else {
        Enemy.setVelocityX(0);

        Enemy.anims.play('turn1');
    }

    if (cursors.up.isDown && Enemy.body.touching.down) {
        Enemy.setVelocityY(-330);
    }

}

function showLife() {
    var lifeLine = 'Життя: '

    for (var i = 0; i < life; i++) {
        lifeLine += '💜'
    }
    return lifeLine
}
=======
    player.body.setGravityY(100) 

    this.physics.add.collider(player, platforms);
}

function update()
{


  
}
>>>>>>> Stashed changes
