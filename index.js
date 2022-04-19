const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const decrease = document.querySelector('.decrease')
const increase = document.querySelector('.increase')
const color = document.getElementById('color')
const clear = document.querySelector('.clear')
const size = document.querySelector('.size')

clear.addEventListener('click', clearCanvas)
decrease.addEventListener('click', decreaseSize)
increase.addEventListener('click', increaseSize)

color.addEventListener('change', (e) => {
  shapeSettings.color = e.target.value
})

canvas.addEventListener('mousedown', (e) => {
  mouse.setPosition(e.offsetX, e.offsetY)
  mouse.isPressed = true
})

canvas.addEventListener('mouseup', (e) => {
  mouse.clearPosition()
  mouse.isPressed = false
})

canvas.addEventListener('mousemove', (e) => {

  if (mouse.isPressed) {
    const x2 = e.offsetX
    const y2 = e.offsetY
    circle.draw(x2, y2)
    line.draw(mouse.x, mouse.y, x2, y2)
    mouse.x = x2
    mouse.y = y2
  }
})


function decreaseSize() {
  if (shapeSettings.size > 5) {
    console.log(circle.settings)
    shapeSettings.size--
    size.textContent = shapeSettings.size

  }
}

function increaseSize() {
  if (shapeSettings.size < 30) {
    shapeSettings.size++
    size.textContent = shapeSettings.size
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

const mouse = {
  x: undefined,
  y: undefined,
  isPressed: false,

  setPosition(x, y) {
    this.x = x
    this.y = y
  },

  clearPosition() {
    this.x = undefined
    this.y = undefined
  }
}
const shapeSettings = {
  size: 20,
  color: 'black'
}

const circle = {
  settings: shapeSettings,
  draw(x, y) {
    ctx.beginPath()
    ctx.arc(x, y, this.settings.size, 0, Math.PI * 2)
    ctx.fillStyle = this.settings.color
    ctx.fill()
  }
}
const line = {
  settings: shapeSettings,
  draw(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = this.settings.color
    ctx.lineWidth = this.settings.size * 2
    ctx.stroke()
  }
}


Object.assign(circle, shapeSettings)
Object.assign(line, shapeSettings)