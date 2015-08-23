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

  PlayGame.prototype = {

    init: function(playerChoice) {
      this.player_choice = playerChoice;
    },
    create: function() {
      this.main_player = this.game.add.sprite(0, 0, this.player_choice);
      this.main_player.anchor.setTo(0.5, 0.5);
      this.main_player.scale.setTo(0.05,0.05);
      if(this.player_choice === 'blueRobot') {
        this.game.stage.backgroundColor = '#0000FF';
      } else {
        this.game.stage.backgroundColor = '#FF0000';
      }
      var bounds = new Phaser.Rectangle(0, 0, this.game.width, this.game.height);

      this.game.physics.startSystem(Phaser.Physics.P2JS);
      this.game.physics.p2.restitution = 0.9;
      this.game.physics.p2.enable(this.main_player);
      this.main_player.body.setCircle(28);
      this.bullets = this.game.add.group();
      this.bullets.enableBody = true;
      this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
      this.bullets.createMultiple(30, this.player_choice + '-shot');
      this.bullets.setAll('anchor.x', 0.5);
      this.bullets.setAll('anchor.y', 1);
      this.bullets.setAll('outOfBoundsKill', true);
      this.bullets.setAll('checkWorldBounds', true);
      this.monsters = this.game.add.group();
      this.monsters.enableBody = true;
      this.monsters.physicsBodyType = Phaser.Physics.ARCADE;
      this.monsters.createMultiple(30, 'negatron');
      this.monsters.setAll('anchor.x', 0.5);
      this.monsters.setAll('anchor.y', 1);
      this.monsters.setAll('checkWorldBounds', true);
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
        var monster = this.monsters.getFirstExists(false);
        if(monster) {
          monster.scale.setTo(0.05, 0.05);
          monster.reset(this.main_player.x - 20, this.main_player.y + 50);
        }
        this.spawn_counter = 0;
      } else {
        this.spawn_counter += 1;
      }
    },
    fireBullet: function() {
      var bullet = this.bullets.getFirstExists(false);
      if(bullet) {
        bullet.scale.setTo(0.75, 0.75);
        bullet.reset(this.main_player.x, this.main_player.y + 8);
        bullet.body.velocity.y = +400;
      }
    }

  }
  window['whatsamonster'] = window['whatsamonster'] || {};
  window['whatsamonster'].PlayGame = PlayGame;
}());
