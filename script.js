const accent = '#2c6fef'
const dark = '#36393f'
const light = '#fffff'

function style(obj) {
  let css = ''
  for (const [k, v] of Object.entries(obj)) {
    let u = ''
    if (typeof v === 'number') u = 'px'
    css += `${k}: ${v}${u};`
  }
  return css
}

function move(cursor, e) {
  cursor.setAttribute('style', style({
    top: e.pageY - cursor.cssHeight / 2,
    left: e.pageX - cursor.cssWidth / 2,
    width: (cursor.cssWidth),
    height: (cursor.cssHeight),
    transform: cursor.style.transform,
    'mix-blend-mode': blend,
    opacity: cursor.style.opacity,
    // 'background-color': cursor.style['background-color'],
  }))
}

const cursor = document.querySelector('.cursor')
const hoverables = document.querySelectorAll('a, button, input, .btn, .logo, .hamburger')
for (const hoverable of hoverables) {
  hoverable.addEventListener('mouseenter', e => {
    // cursor.style['background-color'] = accent
  })
  hoverable.addEventListener('mouseleave', e => {
    // cursor.style['background-color'] = dark
  })
}

const links = document.querySelectorAll('.menu a')
for (let i = 0; i < links.length; i++) {
  const link = links[i]
  link.style.transitionDelay = `${0.2 + (i / 10)}s`
  console.log(link.style)
  link.addEventListener('mouseenter', e => {
    cursor.style.opacity = 1
    blend = 'difference'
  })
  link.addEventListener('mouseleave', e => {
    cursor.style.opacity = 0.25
    blend = 'normal'
  })
}

let free = true
let current = 0
let blend = 'normal'

cursor.cssWidth = 24
cursor.cssHeight = 24

let part = 0
const sections = document.querySelectorAll('section')
for (let i = 0; i < sections.length; i++) {
  sections[i].setAttribute('n', i)
  sections[i].style.zIndex = sections.length - i
}
const main = document.querySelector('main')

document.addEventListener('mousemove', e => {
  move(cursor, e)
})

document.addEventListener('mousedown', e => {
  cursor.style.transform = `scale(0.5)`
})

document.addEventListener('mouseup', e => {
  cursor.style.transform = `scale(1)`
})

document.addEventListener('wheel', e => {
  if (free) {
    free = false
    if (e.deltaY > 0) part++
    if (e.deltaY < 0) part--
    if (part >= sections.length) part = sections.length - 1
    if (part < 0) part = 0
    main.style.top = `calc(-1 * (${part} * (100vh - 64px)) + 64px)`
    setTimeout(() => {
      free = true
      console.log(part)
    }, 500)
  }
})

const buttons = document.querySelectorAll('.btn:not(.btn:disabled), .ripple')

for (const button of buttons) {
  pulse(button)
}

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 64,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": accent
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": accent,
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});

update = function() {
  if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
    count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
  }
  requestAnimationFrame(update);
};
requestAnimationFrame(update);