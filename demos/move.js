let player, block;

function setup() {
	createCanvas(800, 500);

	player = new Sprite();
	player.diameter = 50;
	player.x = 600;

	block = new Sprite();
}

function draw() {
	clear();

	// depending on how the player hits the block
	// it either can reach the destination or not
	if (mouse.pressed()) {
		player.move(mouse.x, mouse.y, 8);
	}
}
