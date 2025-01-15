const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');



canvas.width = window.innerWidth - 2;
canvas.height = window.innerHeight - 2;

let gameWidth = canvas.width;
let gameHeight = canvas.height;

draw = (x, y, c, s) => {
  ctx.fillStyle = c;
  ctx.fillRect(x, y, s, s);
};
atoms = [];
atom = (x, y, c) => {
  return { x: x, y: y, vx: 0, vy: 0, color: c };
};
random = () => {
  return Math.random() * canvas.width + 50;
};
create = (number, color) => {
  group = [];
  for (let i = 0; i < number; i++) {
    group.push(atom(random(), random(), color));
    atoms.push(group[i]);
  }
  return group;
};
rule = (atoms1, atoms2, g) => {
  for (let i = 0; i < atoms1.length; i++) {
    fx = 0;
    fy = 0;
    for (let j = 0; j < atoms2.length; j++) {
      a = atoms1[i];
      b = atoms2[j];
      dx = a.x - b.x;
      dy = a.y - b.y;
      d = Math.sqrt(dx * dx + dy * dy);
      if (d > 0 && d < 80) {
        F = (g * 1) / d;
        fx += F * dx;
        fy += F * dy;
      }
    }
    a.vx = (a.vx + fx) * 0.5;
    a.vy = (a.vy + fy) * 0.5;
    a.x += a.vx;
    a.y += a.vy;
    if (a.x <= 0 || a.x >= canvas.width) {
      a.vx *= -1;
    }
    if (a.y <= 0 || a.y >= canvas.width) {
      a.vy *= -1;
    }
  }
};
yellow = create(200, 'yellow');
red = create(200, 'red');
green = create(200, 'green');
update = () => {
  rule(green, green, -0.32);
  rule(green, red, -0.17);
  rule(green, yellow, 0.34);
  rule(red, red, -0.1);
  rule(red, green, -0.34);
  rule(yellow, yellow, 0.15);
  rule(yellow, green, -0.2);
  ctx.clearRect(0, 0, canvas.width, canvas.width);
  draw(0, 0, 'black', canvas.width);
  for (i = 0; i < atoms.length; i++) {
    draw(atoms[i].x, atoms[i].y, atoms[i].color, 5);
  }
  requestAnimationFrame(update);
};
update();
