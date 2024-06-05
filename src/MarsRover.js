// Problem
// A SQUAD of robotic rovers are to be landed by NASA on a plateau on Mars.
// This plateau, which is curiously RECTANGULAR,
// must be navigated by the rovers so that their on-board cameras can get a complete view of the surrounding terrain to send back to Earth.

// A rover’s position and location is represented by a combination of x and y co-ordinates and a letter representing one of the four cardinal compass points.
// N for NORTH, S for SOUTH, E for EAST, and W for WEST.
// The plateau is divided up into a GRID to simplify navigation.
// An example position might be "0 0 N", which means the rover is in the bottom left corner and facing North.

// In order to control a rover, NASA sends a simple string of letters.
//  The possible letters are ‘L’, ‘R’ and ‘M’. ‘L’ and ‘R’ makes the rover spin 90 degrees left or right respectively, without moving from its current spot.
// ‘M’ means move forward one grid point, and maintain the same heading.

// Assume that the square directly North from (x, y) is (x, y+1).

// INPUT:
// The FIRST LINE of input is the upper-right coordinates of the plateau,
// the lower-left coordinates are assumed to be 0,0.

// The rest of the input is information pertaining to the rovers that have been deployed.
// Each rover has TWO LINES of input.
// The FIRST LINE gives the rover’s position, e.g "1 2 N" means the rover is in the square directly North of (1, 2) facing NORTH.
// and the SECOND line is a series of instructions telling the rover how to explore the plateau.
// The position is made up of two integers and a letter separated by spaces, corresponding to the x and y co-ordinates and the rover’s orientation.

// Each rover will be finished SEQUENTIALLY, which means that the second rover won’t start to move until the first one has finished moving.

// QUESTIONS:
// What happens when a rover reaches the edge of the plateau?
// A rover that reaches the edge of the plateau will not move any further.
// Collisions?
// Rovers will not collide with each other. If a rover is instructed to move to a position that is already occupied by another rover, it will also occupy that space.

// OUTPUT:
// The output for each rover should be its final co-ordinates and heading.

// EXAMPLE:
// Test Input:
// 5 5
// 0 0 N
// RM
// 0 0 E
// MM
// 1 1 N
// RM

// Expected Output:
// 1 0 E
// 2 0 E
// 2 1 E

// functions:
// setGrid(string)
// setRoverPositionAndDirection(string)
// executeRoverInstructions(string)
// setDirection(string)
// getPositionAndDirection(string)
// executeAllInstructions(string)

export default class MarsRover {
  setGrid(grid) {
    this.grid = grid.split(" ").map(Number);
  }
  setRoverPositionAndDirection(roverPositionAndDirection) {
    const items = roverPositionAndDirection.trim().split(" ");
    this.roverPositionXY = [parseInt(items[0]), parseInt(items[1])];
    this.roverDirection = items[2];
  }
  executeRoverInstructions(instructions) {
    instructions.split("").forEach((instruction) => {
      if (instruction === "M") {
        this.move();
      } else {
        this.setDirection(instruction);
      }
    });
  }
  setDirection(direction) {
    const directions = ["N", "E", "S", "W"];
    const index = directions.indexOf(this.roverDirection);
    if (direction === "L") {
      this.roverDirection = directions[(index + 3) % 4];
    } else {
      this.roverDirection = directions[(index + 1) % 4];
    }
  }
  move() {
    const [x, y] = this.roverPositionXY;
    // the rover will not move if it reaches the edge of the plateau
    if (this.roverDirection === "N" && y < this.grid[1]) {
      this.roverPositionXY[1] = y + 1;
    } else if (this.roverDirection === "E" && x < this.grid[0]) {
      this.roverPositionXY[0] = x + 1;
    } else if (this.roverDirection === "S" && y > 0) {
      this.roverPositionXY[1] = y - 1;
    } else if (this.roverDirection === "W" && x > 0) {
      this.roverPositionXY[0] = x - 1;
    }
    // return the string output
    return this.getPositionAndDirection();
  }
  getPositionAndDirection() {
    console.log(this.roverPositionXY);
    return this.roverPositionXY.join(" ") + " " + this.roverDirection;
  }
  executeAllInstructions(input) {
    const instructions = input.split("\n");
    let output = "";
    // first line is the grid
    this.setGrid(instructions[0]);
    for (let i = 1; i < instructions.length; i += 2) {
      this.setRoverPositionAndDirection(instructions[i]);
      this.executeRoverInstructions(instructions[i + 1]);
      output += this.getPositionAndDirection() + "\n";
    }
    return output.trim();
  }
}
