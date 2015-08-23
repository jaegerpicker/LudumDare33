(function() {
  'use strict';

  function Game() {}

  Game.prototype = {
    main_player_sprite: '',
    create: function () {
      var text = this.add.text(this.game.width * 0.5 - 10, this.game.height * 0.5 - 15,
        'Monster? Or Robot? Who do you call a monster?', {font: '24px Arial', fill: '#ffffff', align: 'center'
      });
      var select_monster_text = this.add.text(this.game.width * 0.5 - 10, this.game.height * 0.5 + 15,
      'Monster', {font: '24px Arial', fill:'#FF0000', align:'center'});
      var select_robot_text = this.add.text(this.game.width * 0.5 - 10, this.game.height * 0.5 + 45,
      'Robot', {font: '24px Arial', fill:'#0000FF', align:'center'});
      select_robot_text.anchor.set(0.5);
      select_monster_text.anchor.set(0.5);
      text.anchor.set(0.5);
      select_monster_text.inputEnabled = true;
      select_monster_text.events.onInputDown.add(this.onMonsterClick, this);
      select_robot_text.inputEnabled = true;
      select_robot_text.events.onInputDown.add(this.onRobotClick, this);
    },

    update: function () {

    },

    onRobotClick: function() {
      console.log("Yes Mr. Robot");
      this.main_player_sprite = 'blueRobot';
      this.game.state.start('play_game', true, false, 'blueRobot');
    },

    onMonsterClick: function() {
      console.log("Clickty Click");
      this.main_player_sprite = 'pinkMonster';
      this.game.state.start('play_game', true, false, 'pinkMonster');
    },

    onInputDown: function () {
      this.game.state.start('menu');
    }
  };

  window['whatsamonster'] = window['whatsamonster'] || {};
  window['whatsamonster'].Game = Game;
}());
