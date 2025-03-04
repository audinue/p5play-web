// flappy bird clone
// mouse click or spacebar to flap

let bird, ground, pipes, gameOver;
let birdImg, pipeImg, groundImg, bgImg;

function preload() {
	birdImg = loadImage('assets/flappy_bird.png');
	pipeImg = loadImage('assets/flappy_pipe.png');
	groundImg = loadImage('assets/flappy_ground.png');
	bgImg = loadImage('assets/flappy_bg.png');
}

function setup() {
	createCanvas(400, 600);

	bird = new Sprite(birdImg, 0, height / 2, 24);

	ground = new Sprite(groundImg, width / 2, 650, 'none');

	pipes = new Group();
	pipes.addImg(pipeImg);
	pipes.collider = 'static';

	gameOver = true;
	canStartNewGame = true;

	bird.overlap(pipes, die);
}

function draw() {
	if (mouse.pressed() || kb.pressed(' ')) {
		if (canStartNewGame) newGame();
		// FLAP
		bird.vel.y = -9;
	}

	if (!gameOver) {
		bird.rotation = bird.direction * 0.8;
		// prevent bird from going off the top of the screen (cheating!)
		if (bird.y < 0) bird.y = 0;
		// if the bird hits the ground, it dies
		if (bird.y > ground.y - 100) die();

		// spawn pipes every 60 frames (1 second)
		if (frameCount % 60 == 0) {
			let pos = random(0, 250);

			let bottomPipe = new pipes.Sprite();
			bottomPipe.x = width + bird.x;
			bottomPipe.y = ground.y - pos;

			let topPipe = new pipes.Sprite();
			topPipe.x = bottomPipe.x;
			topPipe.y = ground.y - pos - 510 - random(0, 100);
			topPipe.mirror.y = -1;
		}

		// get rid of passed pipes
		for (let pipe of pipes) {
			if (pipe.x < bird.x - width / 2) {
				pipe.remove();
			}
		}

		// wrap ground
		if (camera.x > ground.x + width / 2) {
			ground.x += width;
		}
	}

	camera.x = bird.x + 150;

	camera.off();

	background(247, 134, 131);
	image(bgImg, 0, ground.y - 280);

	camera.on();

	ground.draw();
	pipes.draw();
	bird.draw();

	if (!gameOver) updateSprites();

	allSprites.debug = kb.pressing('d');
}

async function die() {
	gameOver = true;
	await delay(500); // 500 milliseconds
	canStartNewGame = true;
}

function newGame() {
	pipes.remove();
	gameOver = false;
	canStartNewGame = false;
	bird.x = width * 0.7;
	bird.y = height / 2;
	bird.vel.x = 4;
	bird.vel.y = 0;
	ground.x = width / 2;
	world.gravity.y = 24;
}
