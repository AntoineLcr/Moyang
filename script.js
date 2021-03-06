var width, height, x, y, raw, nraw, prev, points, value, wd, color, aftstart
var colors = ['#FFAAA0', '#FFBE4A', '#FCE900', '#9CF13E', '#85D4FF', '#DF8BFF']
// var ready = false
var start = false


var title = document.querySelector('.title')
var letters = document.querySelectorAll('.letter')
var letterShapes = document.querySelectorAll('.shape')
var instruction = document.querySelector('.instruction')
var input = document.querySelector('.input')
input.value = ''
var textarea = document.querySelector('.textarea')
textarea.value = ''
var speed = 50
var playground = document.querySelector('.playground')

TweenMax.staggerTo(letters, .25, {transform:'scale(1)', opacity:1}, .1)
TweenMax.to(instruction, .5, {opacity:1, transform:'translateY(0px)', delay:1})


noiseFx()

letterClick()
function letterClick() {
  for (let i = 0; i < letters.length; i++) {
    letters[i].addEventListener('click', function() {
      gameOn(i)
    })
    letters[i].addEventListener('mouseover', cursorOn.bind(null, letters[i]))
    letters[i].addEventListener('mouseout', cursorOff.bind(null, letters[i]))
  }
}
// keySpace()
function gameOn(i) {
  colorChoose(i)
  colorMoyang()
  hideHome()
  inputOn()
  keysOn()

  TweenMax.to(letterShapes, .25, {transform:'translateY(100px)'})

  TweenMax.to(instruction, .25, {opacity:0, transform:'translateY(5px)'})
  TweenMax.to(instruction, .5, {opacity:1, transform:'translateY(0px)',textContent:'TYPE IT OUT', delay:.5})
  TweenMax.to(instruction, .25, {opacity:0, transform:'translateY(5px)', delay:2})
}
function cursorOn(letter) {
  document.body.style.cursor = 'pointer'
  TweenMax.to(letter, .25, {transform:'translateY(-10px)'})
}
function cursorOff(letter) {
  document.body.style.cursor = ''
  TweenMax.to(letter, .25, {transform:'translateY(0)'})
}
function colorChoose(i) {
  color = colors[i]
}
function colorMoyang() {
  for (shape of letterShapes) {
    shape.style.fill = color
  }
}
function hideHome() {
  // title.classList.add('hidden')
  for (letter of letters) {
    letter.removeEventListener('mouseover', cursorOn)
  }
  // instruction.textContent = 'TYPE SOMETHING AMAZING'
  // aftstart = window.setTimeout(function() {
  //   instruction = document.querySelector('.instruction')
  //   instruction.classList.add('hidden')
  // }, 1000)
}
function inputOn() {
  input.classList.remove('none')
  input.style.color = color
}

function cmdV() {
  if (textarea.value[0]) {
    write({
      which: textarea.value[0].toUpperCase().charCodeAt(),
      key: textarea.value[0],
      whichForce: true
    })
    window.setTimeout(cmdV, speed)
    textarea.value = textarea.value.slice(1)
  }
}


function keysOn() {
  window.addEventListener('keydown', write.bind(this.event))
}

function write(event) {
  // console.log(event);
  if (event.metaKey) {
    if (event.which === 86) {
      // console.log('coller');
      textarea.focus()
      document.execCommand("Paste");
      window.setTimeout(function() {
        cmdV()
      }, 10)
    } else if (event.which === 67) {
      // console.log('copier');
      textarea.value = input.textContent
      textarea.select();
      // document.execCommand("Copy");
    }
  } else
  // if (65 <= event.which && event.which <= 90) {
  if ( event.whichForce ||
      (event.which > 47 && event.which < 58)   || // number keys
      event.which == 32 ||                        // spacebar
      (event.which > 64 && event.which < 91)   || // letter keys
      (event.which > 95 && event.which < 112)  || // numpad keys
      (event.which > 185 && event.which < 193) || // ;=,-./` (in order)
      (event.which > 218 && event.which < 223)    // [\]' (in order)
    ) {

    input.textContent += event.key

    rawCreate(event.which)

    rawAdjust()
    randSize()
    randPos()
    pointsCreate()
    shapeCreate()
  } else if (event.which === 8) {
    event.preventDefault()
    input.textContent = input.textContent.slice(0, -1)

    // TweenMax.to(playground.lastChild, 1, {transform:'translateY(100%)'})


    if (playground.lastChild) {
      TweenMax.to(playground.lastChild, .1, {transform:'scale(0)', opacity:0})
      window.setTimeout(function() {
        playground.removeChild(playground.lastChild)
      }, 100)
    }
  } else if (event.which === 18) {
    input.classList.toggle('none')
  } else if (event.which === 17) {
    speed = speedToggle()
  }
}

function rawCreate(which) {
  switch (which) {
    case 65: // A
    raw = '50% 0%, 0% 100%, 100% 100%'
    break
    case 90: // Z
    raw = '0 0, 100% 0, 100% 100%, 0 100%'
    break
    case 69: // E
    raw = '20% 0%, 80% 0%, 100% 100%, 0% 100%'
    break
    case 82: // R
    raw = '25% 0%, 100% 0%, 75% 100%, 0% 100%'
    break
    case 84: // T
    raw = '50% 0%, 100% 50%, 50% 100%, 0% 50%'
    break
    case 89: // Y
    raw = '50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%'
    break
    case 85: // U
    raw = '21% 21%, 22% 77%, 58% 62%, 58% 36%'
    break
    case 73: // I
    raw = '0% 100%, 68% 100%, 70% 49%, 44% 49%'
    break
    case 79: // O
    raw = '0% 68%, 100% 30%, 0% 78%'
    break
    case 80: // P
    raw = '0% 0%, 28% 0%, 27% 100%, 0% 100%'
    break

    case 81: // Q
    raw = '0% 0%, 0% 100%, 25% 100%, 25% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0%'
    break
    case 83: // S
    raw = '20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%'
    break
    case 68: // D
    raw = '0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%'
    break
    case 70: // F
    raw = '50% 0%, 0% 100%, 4% 100%'
    break
    case 71: // G
    raw = '89% 29%, 13% 51%, 92% 46%'
    break
    case 72: // H
    raw = '0 20%, 100% 20%, 100% 64%, 0 64%'
    break
    case 74: // J
    raw = '42% 0%, 100% 93%, 18% 100%, 0% 20%'
    break
    case 75: // K
    raw = '29% 19%, 93% 19%, 18% 75%'
    break
    case 76: // L
    raw = '28% 21%, 70% 21%, 28% 83%, 10% 41%'
    break
    case 77: // M
    raw = '50% 33%, 15% 50%, 50% 68%, 85% 50%'
    break

    case 87: // W
    raw = '3% 3%, 100% 86%, 89% 99%'
    break
    case 88: // X
    raw = '7% 7%, 83% 9%, 45% 22%'
    break
    case 67: // C
    raw = '83% 23%, 45% 79%, 7% 63%, 3% 31%, 37% 0%'
    break
    case 86: // V
    raw = '25% 0%, 100% 25%, 75% 100%, 0% 75%'
    break
    case 66: // B
    raw = '9% 5%, 50% 37%, 93% 5%, 50% 18%'
    break
    case 78: // N
    raw = '33% 10%, 7% 21%, 86% 94%'
    break

    default: raw = ''
  }
}

function randSize() {
  width = height = Math.floor(Math.random() * 1000) + 5
  // console.log('w : '+width+'  /  h : '+height)
}
function randPos() {
  x = Math.floor(Math.random() * 100) + 0
  y = Math.floor(Math.random() * 100) + 0
  // console.log('x : '+x+'  /  y : '+y);
}
function rawAdjust() {
  nraw = ''
  prev = ''
  for (var i = 0; i < raw.length; i++) {
    switch (raw[i]) {
      case ' ':
      case ',':
        if (prev === '0') {
          nraw += '%'
        }
    }
    nraw += raw[i]
    prev = raw[i]
  }
}
function pointsCreate() {
  points = ''
  value = ''
  wd = false
  prev = ''
  for (var i = 0; i < nraw.length; i++) {
    if (nraw[i] === ' ' && prev === '%') {
      wd = true
    } else if (nraw[i] === '%') {
      if (wd === false) {
        // console.log('W');
        value = parseInt(value) * width / 100
      } else {
        // console.log('H');
        value = parseInt(value) * height / 100
      }
      points += value + ' '
      value = ''
    } else {
      if (nraw[i] === ',') {
        wd = false
        points += nraw[i]
      } else {
        value += nraw[i]
      }
    }
    prev = nraw[i]
  }
}
function shapeCreate() {
  playground.innerHTML += '<svg class="anim" width="' + width + '" height="'+ height +'" viewBox="0 0 ' + width + ' ' + height + '" style="left:calc(' + x + 'vw - ' + width/2 + 'px); top:calc(' + y + 'vh - ' + height/2 + 'px)"> <polygon class="blend" points="' + points + '" stroke="none" fill="'+ color +'"/> </svg>'
  // colorChange()
  TweenMax.from(playground.lastChild, .25, {transform:'scale(0)', opacity:0})
}
function colorChange() {
  if (c < colors.length - 1) {
    c ++
  } else {
    c = 0
  }
}

function noiseFx() {
  var noiseArea = document.querySelector('.noise')
  var i = 1
  window.setInterval(function() {
    // console.log(i);
    noiseArea.style.backgroundImage = 'url(noise'+i+'.png)'
    if (i < 4) {
      i ++
    } else {
      i = 1
    }
  }, 100)
}
function keySpace() {
  window.addEventListener('keydown', function(event) {
    if (event.which === 32) {
      console.log('space');
      gameOn(Math.floor(Math.random() * letters.length) + 0 )
    }
  })
}

function speedToggle() {
  return speed === 50 ? 250 : 50
}
