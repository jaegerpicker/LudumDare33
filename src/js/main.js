window.addEventListener('load', function () {
  'use strict';

  var ns = window['whatsamonster'];
  var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'whatsamonster-game');

  game.state.add('boot', ns.Boot);
  game.state.add('preloader', ns.Preloader);
  game.state.add('menu', ns.Menu);
  game.state.add('game', ns.Game);
  game.state.add('play_game', ns.PlayGame);
  /* yo phaser:state new-state-files-put-here */
  game.state.start('boot');
}, false);
