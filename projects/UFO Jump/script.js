// Elements
const canvas = document.getElementById("flappyBirdCanvas")
const ctx = canvas.getContext("2d")
ctx.strokeStyle = "#FFF"

const birdImage = new Image()
birdImage.src = "images/ufo_bird.png"

// Config
const gravity = 0.25
const jumpPower = 4.5
const bird = {
    x: 50,
    y: canvas.height / 2 - 10,
    width: 40,
    height: 40,
    velocity: 0
}

// Functions
let tubes = []
let alive = false
let loaded = false
let score = 0
let cooldown = 0
let tubeSpeed = 2
let highScore = localStorage.getItem("highScore") || 0

function Tube(x, y, width, height, color) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color < 1/3 && "#F00" || color < 2/3 && "#0F0" || color < 1 && "#00F"
}

let index = 0

function draw() {
    if (!alive) {return}

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw bird
    ctx.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height)

    // Draw tubes
    for (let tube of tubes) {
        ctx.fillStyle = tube.color

        ctx.fillRect(tube.x, tube.y, tube.width, tube.height)
    }

    // Draw score
    ctx.font = "20px Arial"
    ctx.fillStyle = "#FFF"
    ctx.fillText("Score: " + score, 10, 30)
    ctx.fillText("High Score: " + highScore, 10, 55)
    ctx.fillText("Speed: x" + tubeSpeed / 2, 10, 80 )

    // Update bird position
    bird.y += bird.velocity
    bird.velocity += gravity
    
    // Generate tubes
    if (index >= Math.random() * 50 + 150) {
        const tubeHeight = Math.random() * (canvas.height - 200) + 100

        const color = Math.random()

        tubes.push(new Tube(canvas.width, 0, 50, tubeHeight, color))
        tubes.push(new Tube(canvas.width, tubeHeight + 100, 50, canvas.height - tubeHeight - 100, color))

        index = 0
    }
      
    index++

    // Update tube positions
    for (let i = tubes.length - 1; i >= 0; i--) {
        tubes[i].x -= tubeSpeed

        // Check collissions
        if (
          bird.x < tubes[i].x + tubes[i].width &&
          bird.x + bird.width > tubes[i].x &&
          bird.y < tubes[i].y + tubes[i].height &&
          bird.y + bird.height > tubes[i].y
        ) {
          endGame()
        }

        // Remove off-screen tubes
        if (tubes[i].x + tubes[i].width < 0) {
            tubes.splice(i, 1)
            score += 0.5

            const deathSound = new Audio()
            deathSound.src = "sounds/point.mp3"
            deathSound.play()
        }
    }

    // Check for bird out of canvas
    if (bird.y < 0 || bird.y + bird.height > canvas.height) {
        endGame()
    }

    requestAnimationFrame(draw)
}

function endGame() {
    alive = false
    cooldown = performance.now()

    ctx.font = "30px Arial"
    ctx.fillText("Game over!", 430, 40)

    ctx.font = "40px Arial"
    ctx.fillText("Your score was: " + score, 360, 80)

    ctx.font = "60px Arial"
    ctx.fillText("Press space or click to restart!", 110, canvas.height - 50)
    
    if (score > highScore) {
        highScore = score
        localStorage.setItem("flappyBirdHighScore", highScore)
    }
    
    const deathSound = new Audio()
    deathSound.src = "sounds/death.mp3"
    deathSound.play()

    bird.y = canvas.height / 2 - 10
    bird.velocity = 0
    tubeSpeed = 2 
    tubes = []
    score = 0
}

function jump(event) {
    if ((!event.pointerId && event.code != "Space") || !loaded || performance.now() - cooldown <= 1000) {return}
        
    bird.velocity = -jumpPower;

    const jumpSound = new Audio()
    jumpSound.src = "sounds/jump.mp3"
    jumpSound.play()

    if (alive) {return}
    alive = true

    draw()

    const start = new Audio()
    start.src = "sounds/start.mp3"
    start.play()
}

document.addEventListener("keydown", jump)
document.addEventListener("click", jump)

birdImage.onload = function() {
    ctx.fillStyle = "#FFF"
    ctx.font = `49px Arial`
    ctx.fillText("Press space or click to start!", 210, canvas.height / 2)

    const seed = Math.random()
    setInterval(() => tubeSpeed = seed < 1 / 3 && 2 || seed < 2 / 3 && 3 || 4, 10000)

    loaded = true
}