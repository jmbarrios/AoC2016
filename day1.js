var myPath = "L2, L5, L5, R5, L2, L4, R1, R1, L4, R2, R1, L1, L4, R1, L4, L4, R5, R3, R1, L1, R1, L5, L1, R5, L4, R2, L5, L3, L3, R3, L3, R4, R4, L2, L5, R1, R2, L2, L1, R3, R4, L193, R3, L5, R45, L1, R4, R79, L5, L5, R5, R1, L4, R3, R3, L4, R185, L5, L3, L1, R5, L2, R1, R3, R2, L3, L4, L2, R2, L3, L2, L2, L3, L5, R3, R4, L5, R1, R2, L2, R4, R3, L4, L3, L1, R3, R2, R1, R1, L3, R4, L5, R2, R1, R3, L3, L2, L2, R2, R1, R2, R3, L3, L3, R4, L4, R4, R4, R4, L3, L1, L2, R5, R2, R2, R2, L4, L3, L4, R4, L5, L4, R2, L4, L4, R4, R1, R5, L2, L4, L5, L3, L2, L4, L4, R3, L3, L4, R1, L2, R3, L2, R1, R2, R5, L4, L2, L1, L3, R2, R3, L2, L1, L5, L2, L1, R4"

myPath = myPath.split(/,\s/)

var re = /(L|R)/

function distance(x1, y1, x2, y2) {
  return Math.abs(x1-x2) + Math.abs(y1-y2)
}

var Peg = function (x, y, dx, dy) {
  this.position = {x: Number(x), y: Number(y)}
  this.direction = {x: Number(dx), y: Number(dy)}
  this.visited = [[x, y]]
  this.already_visited = []
}
 
Peg.prototype.turnLeft = function () {
  var current_direction = JSON.parse(JSON.stringify(this.direction))
  this.direction.x = -1*current_direction.y 
  this.direction.y = current_direction.x
}

Peg.prototype.turnRight = function () {
  var current_direction = JSON.parse(JSON.stringify(this.direction))
  this.direction.x = current_direction.y 
  this.direction.y = -1*current_direction.x
}

Peg.prototype.walk = function (n) {
  for (i=1; i <= n; i++){
    this.position.x +=  this.direction.x
    this.position.y +=  this.direction.y
    
    var pos = [this.position.x, this.position.y]
    var pos_helper = JSON.stringify(pos)    
    var helper = JSON.stringify(this.visited)
    if (helper.indexOf(pos_helper) > -1) {
      this.already_visited.push(pos)
    }
    this.visited.push(pos)
  }
}

Player1 = new Peg(0, 0, 0, 1)

for (idx in myPath) {
  var vec
  // Regresa el arreglo ["", "(L|R)", "n+" ]
  step = myPath[idx].split(re)

  if (step[1] == "L") Player1.turnLeft() 
  else Player1.turnRight()

  Player1.walk(step[2])
}

console.log('Final position: ' + JSON.stringify(Player1.position))
console.log('You are ' + 
  distance(Player1.position.x, Player1.position.y, 0, 0) +
  ' blocks away')
console.log('The first place revisited was ' + 
  JSON.stringify(Player1.already_visited[0]) + 
  ' that was ' + 
  distance(Player1.already_visited[0][0], Player1.already_visited[0][1], 0, 0) + 
  ' blocks away')
