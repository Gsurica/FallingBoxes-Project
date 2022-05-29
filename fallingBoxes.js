// HTML 
let score = document.querySelector('#score').innerHTML
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

console.log(canvas)

// Variables
canvas.width = 1024
canvas.height = 570
const gravity = 0.5
const enemyGravity = 0.3

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

// Classes
class Player {
    constructor() {

        this.position = {
            x: canvas.width / 2,
            y: canvas.height / 2
        }

        this.width = 100
        this.height = 100

        this.velocity = {
            x: 0,
            y: 0
        }
    }

    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()

        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        if(this.position.y + this.velocity.y + this.height <= canvas.height){
            this.velocity.y += gravity
        } else this.velocity.y = 0

        if(keys.right.pressed){
            this.velocity.x += 5
        } else if (keys.left.pressed) {
            this.velocity.x -= 5
        } else this.velocity.x = 0

        if(this.position.x > canvas.width){
            this.position.x = canvas.width - 100
        } else if (this.position.x < 0){
            this.position.x = 0
        }
    }
}

class Enemy {
    constructor({ x, y }){
        this.position = {
            x: x,
            y: y
        }

        this.velocity = {
            x: 0,
            y: 0
        }

        this.width = 100
        this.height = 100
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y

        if(this.position.y + this.velocity.y + this.height <= canvas.height){
            this.velocity.y += enemyGravity
        }

        if(this.height > canvas.height){
            this.height = 0
        }

        if(this.height + this.position.y  > canvas.height){
            enemies.splice(0, 4)
            spawnEnemies()
        }
    }
}

// class calls
const player = new Player
const enemies = [new Enemy({x: 100, y: 0})]

function spawnEnemies() {
    const spawn = 2
    for(let i = 0; i <= spawn; i++){
        enemies.push(new Enemy({ x: Math.floor(Math.random() * canvas.width), y: -100}))
    } 
}

function point() {
    setInterval(() => {
        score++
        document.querySelector("#score").innerHTML = score
    }, 1000)
}

// Functions
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemies.forEach(enemy => {
        // checking collisions
        if(enemy.position.x < player.position.x + player.height &&
           enemy.position.x + enemy.height > player.position.x &&
           enemy.position.y < player.position.y + player.height &&
           enemy.position.y + enemy.height > player.position.y
        ){
            window.location.reload()
            alert("voce morreu!")
        }
        enemy.update()
    })

    if(score === 20){
        window.location.reload()
        alert("voce ganhou!")
    }
}

// Functions calls
spawnEnemies()
animate()
point()

// eventsListeners

window.addEventListener('keydown', ({ keyCode }) => {
    switch(keyCode) {
        case 68:
            keys.right.pressed = true
            break
        case 65:
            keys.left.pressed = true
            break
        case 32:
            player.velocity.y -= 10
            break
    }
})

window.addEventListener('keyup', ({ keyCode }) => {
    switch(keyCode) {
        case 68:
            keys.right.pressed = false
            break
        case 65:
            keys.left.pressed = false
            break
        case 32:
            console.log('up')
            break
    }
})

