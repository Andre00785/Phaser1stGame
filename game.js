var config = { // туто ми налаштовуємо сценку
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    scene: {
        parent:game,
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


function preload ()// тут ми завантажуємо потрібні матеріали для гри
{
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
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
    
    function create ()
    {


        
        var score = 0;
var scoreText;
scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });  //це поки що не надо
function collectStar (player, star)
{
    star.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);
}

        cursors = this.input.keyboard.createCursorKeys();
        this.add.image(960, 540, 'sky');   //тут ми можна сказати доаємо на сцену наш фон
    
        platforms = this.physics.add.staticGroup();
    
        // platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        // platforms.create(1750, 568, 'ground').setScale(2).refreshBody();
        // platforms.create(1750, 400, 'ground');
        // platforms.create(1400, 250, 'ground').setScale(0.5).refreshBody();
        // platforms.create(1750, 200, 'ground').setScale(0.2).refreshBody();
        // platforms.create(960, 1070, 'ground').setScale(5).refreshBody();
    
        // platforms.create(400, 380, 'ground');
        // platforms.create(130, 150, 'ground');
        // platforms.create(600, 350, 'ground'); 

for (var x = 0; x < worldWidth; x = x + 400) {
    console.log(x)
    platforms.create(x, 1040, 'ground').setOrigin(0, 0).refreshBody().setScale(1);  //тут ми додаємо платформи які спауняться випадковим образом
}

        player = this.physics.add.sprite(100, 450, 'dude');  //додаємо персонажа і задаємо його розміри і ось 
         player.setScale(0.8)
         player.setBounce(0.1);
         player.setCollideWorldBounds(true);



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

stars = this.physics.add.group({   
    key: 'soul',
    repeat: 15,
    setXY: { x: 0, y: 0, stepX: 120 }
});

stars.children.iterate(function (child) {

    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

});

this.physics.add.collider(stars, platforms);
this.physics.add.overlap(player, stars, collectStar, null, this);
function collectStar (player, star)
{
    star.disableBody(true, true);
}



    }
        
    function update ()
{
    this.cameras.main.setBounds(0, 0, worldWidth, window.innerHeight);
    this.physics.world.setBounds(0, 0, worldWidth, window.innerHeight);
    this.cameras.main.startFollow(player);
      
    if (cursors.left.isDown)
{
    player.setVelocityX(-160);

    player.anims.play('left', true);
}
else if (cursors.right.isDown)
{
    player.setVelocityX(160);

    player.anims.play('right', true);
}
else
{
    player.setVelocityX(0);

    player.anims.play('turn');
}

if (cursors.up.isDown && player.body.touching.down)
{
    player.setVelocityY(-330);
}

}
