var config = { // туто ми налаштовуємо сценку
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

function preload ()// тут ми завантажуємо потрібні матеріали для гри
{
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
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
scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
function collectStar (player, star)
{
    star.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);
}

        cursors = this.input.keyboard.createCursorKeys();
        this.add.image(960, 540, 'sky');
    
        platforms = this.physics.add.staticGroup();
    
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        platforms.create(1750, 568, 'ground').setScale(2).refreshBody();
    
        platforms.create(400, 380, 'ground');
        platforms.create(130, 150, 'ground');
        platforms.create(600, 350, 'ground');

        player = this.physics.add.sprite(100, 450, 'dude');
player.setScale(0.8)
player.setBounce(0.1);
player.setCollideWorldBounds(true);

this.anims.create({
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
player.body.setGravityY(50)
this.physics.add.collider(player, platforms);
stars = this.physics.add.group({
    key: 'star',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
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
