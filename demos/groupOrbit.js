let blocks, dots, bounds;

function setup() {
	createCanvas(800, 800);

	blocks = new Group();
	blocks.shapeColor = 'yellow';
	blocks.rotationLock = true;

	let sym = 360 / 6;
	for (let i = 0; i < 160; i++) {
		let angle = sym * i - i * 2;
		let dist = 360 - i * 2;
		let x = sin(angle) * dist + 400;
		let y = cos(angle) * dist + 400;
		let h = 30 - i * 0.14;
		let block = new blocks.Sprite(x, y, 10, h);
		block.rotation = angle;
	}

	dots = new Group();
	dots.shapeColor = 'red';
	dots.x = () => random(200, 600);
	dots.y = () => random(200, 600);
	dots.diameter = 12;
	dots.rotationLock = true;
	dots.amount = 250;

	bounds = new Group();
	bounds.collider = 'static';
	bounds.shapeColor = 'blue';
	bounds.x = (i) => 400 + cos(i * 2) * 380;
	bounds.y = (i) => 400 + sin(i * 2) * 380;
	bounds.diameter = 10;
	bounds.amount = 180;
}

function draw() {
	clear();

	if (mouse.pressing()) {
		for (let dot of dots) {
			dot.moveTowards(400, 400, 0.05);
		}
	}

	blocks.orbit(-2 + mouse.y / 200);
}
