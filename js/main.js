var NUM_PARTICLES,
  THICKNESS = Math.pow(15, 2),
  SPACING = 4,
  MARGIN = 0,
  COLOR = 220,
  DRAG = 0.95,
  EASE = 0.25,
  container,
  particle,
  canvas,
  mouse,
  stats,
  list,
  ctx,
  tog,
  man,
  dx,
  dy,
  mx,
  my,
  d,
  t,
  f,
  a,
  b,
  i,
  n,
  w,
  h,
  p,
  s,
  r,
  c;

particle = {
  vx: 0,
  vy: 0,
  x: 0,
  y: 0,
};

const design = document.querySelector(".design");
const designWidth = design.clientWidth;
const designHeight = design.clientHeight;

function init() {
  container = document.getElementById("container");
  canvas = document.createElement("canvas");

  w = canvas.width = designWidth;
  h = canvas.height = designHeight;

  COLS = Math.floor(w / SPACING);
  ROWS = Math.floor(h / SPACING);
  NUM_PARTICLES = COLS * ROWS;

  ctx = canvas.getContext("2d");
  man = false;
  tog = true;

  list = [];

  for (i = 0; i < NUM_PARTICLES; i++) {
    p = Object.create(particle);
    p.x = p.ox = SPACING * (i % COLS);
    p.y = p.oy = SPACING * Math.floor(i / COLS);
    list[i] = p;
  }

  container.addEventListener("mousemove", function (e) {
    bounds = container.getBoundingClientRect();
    mx = e.clientX - bounds.left;
    my = e.clientY - bounds.top;
    man = true;
  });

  if (typeof Stats === "function") {
    document.body.appendChild((stats = new Stats()).domElement);
  }

  container.appendChild(canvas);
}

function step() {
  if (stats) stats.begin();

  if ((tog = !tog)) {
    if (!man) {
      t = +new Date() * 0.001;
      mx = w * 0.5 + Math.cos(t * 2.1) * Math.cos(t * 0.9) * w * 0.45;
      my = h * 0.5 + Math.sin(t * 3.2) * Math.tan(Math.sin(t * 0.8)) * h * 0.45;
    }

    for (i = 0; i < NUM_PARTICLES; i++) {
      p = list[i];

      d = (dx = mx - p.x) * dx + (dy = my - p.y) * dy;
      f = -THICKNESS / d;

      if (d < THICKNESS) {
        t = Math.atan2(dy, dx);
        p.vx += f * Math.cos(t);
        p.vy += f * Math.sin(t);
      }

      p.x += (p.vx *= DRAG) + (p.ox - p.x) * EASE;
      p.y += (p.vy *= DRAG) + (p.oy - p.y) * EASE;
    }
  } else {
    b = (a = ctx.createImageData(w, h)).data;

    for (i = 0; i < NUM_PARTICLES; i++) {
      p = list[i];
      (b[(n = (~~p.x + ~~p.y * w) * 4)] = b[n + 1] = b[n + 2] = COLOR),
        (b[n + 3] = 255);
    }

    ctx.putImageData(a, 0, 0);
  }

  if (stats) stats.end();

  requestAnimationFrame(step);
}

init();
step();

const circle = document.querySelector(".circle__bought");
const line = document.querySelector(".line__bought");
const dataStart = document.querySelector(".data__start");

const tm = gsap.timeline({ paused: true });

tm.fromTo(
  ".line__bought",
  {
    x: -50,
    opacity: 0,
  },
  {
    x: 0,
    opacity: 1,
    duration: 0.8,
  },
  0
);

tm.fromTo(
  ".data__start__muted",
  {
    y: 200,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 0.8,
  },
  0
);

tm.fromTo(
  ".data__start__title",
  {
    y: 200,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 1,
  },
  0
);

tm.fromTo(
  ".li-columns",
  {
    y: 200,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 1,
  },
  0
);

tm.fromTo(
  ".end__title",
  {
    y: -200,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 0.8,
  },
  0
);

tm.fromTo(
  ".location",
  {
    x: 100,
    opacity: 0,
  },
  {
    x: 0,
    opacity: 1,
    duration: 0.8,
  },
  0
);

tm.fromTo(
  ".column-01",
  {
    x: 100,
    opacity: 0,
  },
  {
    x: 0,
    opacity: 1,
    duration: 0.4,
  },
  0
)
  .fromTo(
    ".column-02",
    {
      x: 100,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      duration: 0.8,
    },
    0
  )
  .fromTo(
    ".column-03",
    {
      x: 100,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      duration: 1.2,
    },
    0
  );

tm.fromTo(
  ".squadron",
  {
    y: -100,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 0.4,
  },
  0
);

circle.addEventListener("mouseover", function (e) {
  if (e.target.classList.contains("circle__bought")) {
    tm.play();
  }
});

circle.addEventListener("mouseout", function (e) {
  if (e.target.classList.contains("circle__bought")) {
    tm.reverse();
  }
});

// PORTFOLIO

let isAnimating = false;
let animationQueue = [];
let animationTimeout;

function animateRowPopap(isHover) {
  if (isAnimating) {
    animationQueue.push(isHover);
    return;
  }

  isAnimating = true;

  const rowPopap = document.querySelector(".row__popap");
  const startTime = performance.now();
  const duration = 500;
  const initialHeight = parseFloat(rowPopap.style.height) || 0;
  const targetHeight = isHover ? 690 : 0;

  function step(currentTime) {
    const progress = (currentTime - startTime) / duration;
    if (progress < 1) {
      rowPopap.style.height =
        initialHeight + progress * (targetHeight - initialHeight) + "px";
      requestAnimationFrame(step);
    } else {
      rowPopap.style.height = targetHeight + "px";
      isAnimating = false;

      if (animationQueue.length > 0) {
        const nextAnimation = animationQueue.shift();
        animateRowPopap(nextAnimation);
      }
    }
  }

  requestAnimationFrame(step);
}

const activeRows = document.querySelector(".active__rows");

activeRows.addEventListener("mouseover", function () {
  clearTimeout(animationTimeout);
  animationTimeout = setTimeout(() => {
    animateRowPopap(true);
  }, 100);

  num.classList.add("active");
});

activeRows.addEventListener("mouseout", function () {
  clearTimeout(animationTimeout);
  animationTimeout = setTimeout(() => {
    animateRowPopap(false);
  }, 100);
});
