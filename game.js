var config = { 
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    scene: {
        physics: {  
            default: 'arcade',
            arcade: {
                gravity: { y: 700 }, 
                debug: false
            }
        },
        preload: preload,
        create: create,
        update: update,
        shootBullet: shootBullet,
        collectLives: collectLives
    }
};

var game = new Phaser.Game(config);
var worldWidth = 9600
var console = console
var platform
var cursors
var House
var Angle

function preload()
{
  this.load.image('Fon', 'assets/Fon1.png');
  this.load.image('bullet', 'assets/Bullet.png');
  this.load.image('001', 'assets/гідрант.png');
  this.load.image('House', 'assets/house2.png');
  this.load.image('ground', 'assets/platform2.png');
  this.load.spritesheet('dude', 'assets/Player.png',
    { frameWidth: 147, frameHeight: 294 }
    );

    this.load.spritesheet('dude1', 'assets/Player1.png',
  { frameWidth: 147, frameHeight: 294 }
  );

  this.load.spritesheet('Anon', 'assets/Anon.png',
    { frameWidth: 147, frameHeight: 294 }
    );

    this.load.spritesheet('Anon1', 'assets/Anon1.png',
    { frameWidth: 147, frameHeight: 294 }
    );

}

function create()
{

    cursors = this.input.keyboard.createCursorKeys();

  this.add.tileSprite(0, 0, worldWidth, 1080, "Fon")
  .setOrigin(0,0)
  .setScale(1)
  .setDepth(-6);

  player = this.physics.add.sprite(100, 900, 'dude');
    player.setScale(0.3)
    player.setBounce(0.1)
    player.setCollideWorldBounds(false)
    player.setDepth(2);

    platforms = this.physics.add.staticGroup();


    this.input.on('pointerdown', shootBullet, this);


    for (var x = 0; x < worldWidth; x = x + 128) {
      console.log(x)
      platforms.create(x, 1080 - 80, 'ground')
          .setOrigin(0, 0)
          .refreshBody()
          .setScale(1);
    };

    this.anims.create({ 
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude1', { start: 3, end: 0 }),
        frameRate: 6.5,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: this.anims.generateFrameNumbers("dude", {
            frames: [0],
        }),
        frameRate: 6.5,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 4 }),
        frameRate: 6.5,
        repeat: -1
    });

    player.body.setGravityY(50) 

    this.physics.add.collider(player, platforms);    


    Anon = this.physics.add.sprite(5, 900, 'Anon');

    Anon.setScale(0.3)
    Anon.setBounce(0.1)
    Anon.setCollideWorldBounds(false)
    Anon.setDepth(-4);

    this.anims.create({ 
        key: 'l',
        frames: this.anims.generateFrameNumbers('Anon1', { start: 3, end: 0 }),
        frameRate: 6.5,
        repeat: -1
    });

    this.anims.create({
        key: 't',
        frames: this.anims.generateFrameNumbers("Anon", {
            frames: [0],
        }),
        frameRate: 6.5,
        repeat: -1
    });

    this.anims.create({
        key: 'r',
        frames: this.anims.generateFrameNumbers('Anon', { start: 0, end: 4 }),
        frameRate: 6.5,
        repeat: -1
    });

    this.physics.add.collider(Anon, platforms);


    Anon1 = this.physics.add.sprite(9500, 900, 'Anon1');

    Anon1.setScale(0.3)
    Anon1.setBounce(0.1)
    Anon1.setCollideWorldBounds(false)
    Anon1.setDepth(-4);

    this.physics.add.collider(Anon1, platforms);



    House = this.physics.add.staticGroup();

    for (var x = 0; x < worldWidth; x = x + 1000) {
        console.log(x)
        House.create(x, 1080 - 720, 'House')
            .setOrigin(0, 0)
            .refreshBody()
            .setScale(1)
            .setDepth(-5);
    }


    gidro = this.physics.add.staticGroup();

    for (var x = 0; x < worldWidth; x = x + 500) {
        console.log(x)
        gidro.create(x, 1080 - 120, '001')
            .setOrigin(0, 0)
            .refreshBody()
            .setScale(0.5)
            .setDepth(-3);
    }

  }

   

function update()
{

  this.cameras.main.setBounds(0, 0, worldWidth, window.innerHeight);
  this.physics.world.setBounds(0, 0, worldWidth, window.innerHeight);
  this.cameras.main.startFollow(player);

  if (cursors.left.isDown) 
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


  if (cursors.down.isUp) 
   {
      Anon.setVelocityX(160);

       Anon.anims.play('r', true);
   }


   if (cursors.down.isUp) 
   {
      Anon1.setVelocityX(-160);

       Anon1.anims.play('l', true);
   }

}

function shootBullet(pointer) {

    let bullet = this.physics.add.sprite(player.x, playr.y, 'bullet')
    .setScale(5)
    .setDepth(2);


    let angle = Phaser.Math.Angle.Between(player.x, playr.y, pointer.x, pointer.y);
    let velocityX = Math.cos(angle) * 5000;
    let velocityY = Math.sin(angle) * 500;

    bullet.setVelocity(velocityX, velocityY);
}

function collectLives() {







}
