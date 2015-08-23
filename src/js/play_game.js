(function() {
  'use strict';

  function PlayGame() {

  }

  var player_choice = '';
  var cursors = null;
  var main_player = null;
  var bullets = null;
  var fireButton = null;
  var monsters = null;
  var spawn_counter = 0;
  var playerCollisionGroup = null;
  var monsterCollisionGroup = null;
  var bulletCollisionGroup = null;

  PlayGame.prototype = {

    init: function(playerChoice) {
      this.player_choice = playerChoice;
    },
    create: function() {
      this.main_player = this.game.add.sprite(0, 0, this.player_choice);
      this.main_player.anchor.setTo(0.5, 0.5);
      this.main_player.scale.setTo(0.04,0.04);
      if(this.player_choice === 'blueRobot') {
        this.game.stage.backgroundColor = '#0000FF';
      } else {
        this.game.stage.backgroundColor = '#FF0000';
      }
      var bounds = new Phaser.Rectangle(0, 0, this.game.width, this.game.height);

      this.game.physics.startSystem(Phaser.Physics.P2JS);
      this.playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
      this.monsterCollisionGroup = this.game.physics.p2.createCollisionGroup();
      this.bulletCollisionGroup = this.game.physics.p2.createCollisionGroup();

      this.game.physics.p2.setImpactEvents(true);
      this.game.physics.p2.updateBoundsCollisionGroup();
      this.game.physics.p2.restitution = 0.9;
      this.game.physics.p2.enable(this.main_player);
      this.main_player.body.setCircle(28);
      this.main_player.body.fixedRotation = true;
      this.main_player.body.setCollisionGroup(this.playerCollisionGroup);
      this.main_player.body.collides(this.monsterCollisionGroup, this.playerCollide);
      this.bullets = this.game.add.physicsGroup(Phaser.Physics.P2JS);
      this.bullets.enableBody = true;
      this.bullets.createMultiple(30, this.player_choice + '-shot');
      this.bullets.setAll('anchor.x', 0.5);
      this.bullets.setAll('anchor.y', 1);
      this.bullets.setAll('outOfBoundsKill', true);
      this.bullets.setAll('checkWorldBounds', true);
      this.cursors = this.game.input.keyboard.createCursorKeys();
      this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      this.spawn_counter = 0;
    },
    update: function() {
      this.main_player.body.setZeroVelocity();
      if(this.cursors.left.isDown) {
        this.main_player.body.moveLeft(200);
      } else if (this.cursors.right.isDown) {
        this.main_player.body.moveRight(200);
      }

      if(this.cursors.up.isDown) {
        this.main_player.body.moveUp(200);
      } else if(this.cursors.down.isDown) {
        this.main_player.body.moveDown(200);
      }

      if(this.fireButton.isDown || this.game.input.activePointer.isDown) {
        this.fireBullet();
      }
      if(this.spawn_counter >= 50) {
        var monster = this.game.add.sprite(this.game.world.randomX, this.game.world.randomY, 'negatron');
        if(monster) {
          this.game.physics.p2.enable(monster);
          monster.body.setCircle(24);
          monster.scale.setTo(0.02, 0.02);
          monster.body.velocity.y = +Math.floor((Math.random() * 10) + 1);
          monster.body.velocity.x = -Math.floor((Math.random() * 10) + 1);
          monster.body.setCollisionGroup(this.monsterCollisionGroup);
          monster.body.collides([this.playerCollisionGroup, this.bulletCollisionGroup]);
        }
        this.spawn_counter = 0;
      } else {
        this.spawn_counter += 1;
      }
      //this.game.physics.p2.overlap(this.main_player, monsters, this.playerCollide, null, this);
      //this.game.physics.p2.overlap(bullets, monsters, this.bulletCollide, null, this);
    },
    fireBullet: function() {
      var bullet = this.bullets.getFirstExists(false);
      if(bullet) {
        this.game.physics.p2.enable(bullet);
        bullet.body.setCollisionGroup(this.bulletCollisionGroup);
        bullet.body.collides(this.monsterCollisionGroup, this.bulletCollide, this);
        //bullet.body.setCircle(5);
        bullet.scale.setTo(0.75, 0.75);
        bullet.reset(this.main_player.x, this.main_player.y + 8);
        bullet.body.velocity.y = +400;
      }
    },
    playerCollide: function(player, monster) {
      //this.player.kill();
      console.log("Player should die");
    },
    bulletCollide: function(bullet, monster) {
      bullet.sprite.kill();
      monster.sprite.kill();
    }
  }
  window['whatsamonster'] = window['whatsamonster'] || {};
  window['whatsamonster'].PlayGame = PlayGame;
}());
