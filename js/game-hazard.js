game.hazard = {};

( function( $ ) {
	"use strict";

	gameHazard.prototype = new gameObject();
	gameHazard.prototype.constructor = gameHazard;
	function gameHazard() {
		this.type = 'hazard';
	};

	gameHazard.prototype.canKill = function( who ) {
		switch ( who.type ) {
			case 'player':
				return true;
			break;
			default:
				return false;
		}// end switch
	};

	gameHazard.prototype.canMove = function( who, direction ) {
		if ( 'obstacle' == who.type ) {
			game.hazard.lightning_position = game.getPosition( who );

			game.hazard.push_direction = game.reverse_direction( direction );
			game.move( who, game.hazard.push_direction );

			$( game.hazard.lightning_position ).addClass( 'lightning-' + game.hazard.push_direction );

			// after a bit, clear the lightning bolt
			setTimeout( function(){
				if ( ! game.occupied[ game.hazard.lightning_position ] ) {
					$( game.hazard.lightning_position ).removeClass( 'lightning-' + game.hazard.push_direction );
				}// end if
			}, 500)
		}// end if

		return false;
	};

	gameHazard.prototype.kill = function( who ) {
		if ( 'player' === who.type ) {
			game.position( who, this.x, this.y );
			game.over( 1, this );
		}// end if
	};


	game.hazard.hazards = [];

	game.hazard.init = function() {
		game.hazard.lightning_charater = '';

		game.hazard.add( 1, 5 );
		game.hazard.add( 3, 1 );
	};

	game.hazard.add = function( x, y ) {
		var hazard = new gameHazard();

		var i = game.hazard.hazards.length;
		hazard.id = 'hazard-' + i;

		game.hazard.hazards.push( hazard );
		game.position( hazard, x, y );
	};
})(jQuery);

amplify.subscribe( 'game-init', game.hazard.init );