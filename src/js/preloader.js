(function() {
  'use strict';

  function Preloader() {
    this.asset = null;
    this.ready = false;
    this.blue_robot = null;
    this.dragon = null;
    this.negatron = null;
    this.pinkMonster = null;
    this.player = null;
  }

  Preloader.prototype = {
    preload: function () {
      this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
      this.load.setPreloadSprite(this.asset);

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.loadResources();

      this.ready = true;
    },

    loadResources: function () {
      // load your assets here
      this.game.load.image('blueRobot', 'assets/blueRobot.png');
      this.game.load.image('dragon', 'assets/dragon.png');
      this.game.load.image('negatron', 'assets/negatron.png');
      this.game.load.image('pinkMonster', 'assets/pinkMonster.png');
      this.game.load.image('player', 'assets/player.png');
      this.game.load.image('pinkMonster-shot', 'assets/Monster-Shot.png');
      this.game.load.image('blueRobot-shot', 'assets/Robot-Shot.png');
      //this.blue_robot = game.add.sprite(game.world.centerX, game.world.centerY, 'blueRobot'); //this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'blueRobot');
      //this.dragon = game.add.sprite(game.world.centerX, game.world.centerY, 'dragon'); //this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'dragon');
      //this.negatron = game.add.sprite(game.world.centerX, game.world.centerY, 'negatron'); //this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'negatron');
      //this.pinkMonster = game.add.sprite(game.world.centerX, game.world.centerY, 'pinkMonster'); //this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'pinkMonster');
      //this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'player'); //this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'player');
    },

    create: function () {

    },

    update: function () {
      // if (!!this.ready) {
        this.game.state.start('menu');
      // }
    },

    onLoadComplete: function () {
      // this.ready = true;
    }
  };

  window['whatsamonster'] = window['whatsamonster'] || {};
  window['whatsamonster'].Preloader = Preloader;
}());
