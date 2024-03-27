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
var platform
var cursors

function preload()
{
  this.load.image('Fon', 'assets/Fon1');
  this.load.spriteship('dude', 'assets/Player',
    { frameWidth: 147, frameHeight: 294 }
    );

  this.load.spriteship('dude1', 'assets/Player1',
  { frameWidth: 147, frameHeight: 294 }
  );

}

function create()
{

  this.add.TileSprite(0, 0, worldWidth, 1080, "Fon")
  .setOrigin(0,0)
  .setScale(1)
  .setDepth(0);

  player = this.physics.add.sprite(100, 450, 'dude');
    player.setScale(1)

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

    player.body.setGravityY(50) 

    this.physics.add.collider(player, platforms);    
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
}
