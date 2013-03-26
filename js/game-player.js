game.player = {};

// &#9729;

( function( $ ) {
	"use strict";

	gamePlayer.prototype = new gameObject();
	gamePlayer.prototype.constructor = gamePlayer;
	function gamePlayer() {
		this.type = 'player';
		this.character = '&#9731;';
	};

	gamePlayer.prototype.canDie = function( type ) {
		switch ( type ) {
			case 'enemy':
			case 'hazard':
				return true;
			break;
			default:
				return false;
		}// end switch
	};

	game.player.init = function() {
		game.the_player = new gamePlayer();
		game.position( game.the_player, 1, 1 );

		$(document).keydown( function(e) {

			switch ( e.which ) {
				case 37:
				case 65:
					game.move( game.the_player, 'left' );
				break;
				case 38:
				case 87:
					game.move( game.the_player, 'up' );
				break;
				case 39:
				case 68:
					game.move( game.the_player, 'right' );
				break;
				case 40:
				case 83:
					game.move( game.the_player, 'down' );
				break;
			}// end switch
		});
	};
})(jQuery);

amplify.subscribe( 'game-init', game.player.init );