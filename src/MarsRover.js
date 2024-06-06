// Problem
// A squad of robotic rovers are to be landed by NASA on a plateau on Mars.
// This plateau, which is curiously RECTANGULAR, must be navigated by the ROVERS
// so that their on-board cameras can get a complete view of the surrounding terrain to send back to Earth.

// A rover’s POSITION and LOCATION is represented by a combination of
// X Y co-ordinates and a letter representing one of the four cardinal COMPASS points.
// N S E W. The plateau is divided up into a grid to simplify navigation.
// The plateau is divided up into a GRID to simplify navigation.
// An example position might be 0, 0, N,
// which means the rover is in the bottom left corner and facing North.

// In order to control a rover, NASA sends a simple string of letters.
// The possible letters are ‘L’, ‘R’ and ‘M’.
// ‘L’ and ‘R’ makes the rover spin 90 degrees left or right respectively, without moving from its current spot.
// ‘M’ means move FORWARD ONE grid point, and maintain the same heading.

// Assume that the square directly North from (x, y) is (x, y+1).

// INPUT:
// The first line of input is the UPPER-right coordinates of the plateau,
// the lower-left coordinates are assumed to be 0,0.

// The rest of the input is information pertaining to the rovers that have been deployed.
// Each rover has TWO lines of input.
// The first line gives the rover’s position,
// and the second line is a series of instructions telling the rover how to explore the plateau.
// The position is made up of two integers and a letter separated by spaces,
// corresponding to the x and y co-ordinates and the rover’s orientation.

// Each rover will be finished SEQUENTIALLY, which means that the second rover won’t start to move until the first one has finished moving.

// OUTPUT:
// The output for each rover should be its final co-ordinates and heading.

// EXAMPLE:
// Test Input:
// 5 5
// 0 0 N
// MR
// 0 0 E
// MML
// Expected Output:
// 0 1 E
// 2 0 N

// TODO: test for when you hit the grid wall

// Function:
// setGridSize(5, 5);
// setRoverPositionAndDirection('0 0 N');
// setRoverInstructions('LMLMLMLMM');
// setRoverDirection('N');
// runAllInstructions(lineDelinitedString);

// Assumtions:
// The rover will not go out of bounds
// if it hits the edge it doesnt move

export default class MarsRover {
  // Function:
  // setGridSize(5, 5);
  // setRoverPositionAndDirection('0 0 N');
  // setRoverInstructions('LMLMLMLMM');
  // setRoverDirection('N');
  // getCurrentPosition();
  // runAllInstructions(lineDelinitedString);

  constructor() {}

  setGridSize(upperRightCorner) {
    this.gridSize = upperRightCorner;
  }
  getCurrectDirection() {
    return this.currentDirection;
  }
  getCurrentXY() {
    return this.currentXY;
  }
  setRoverPositionAndDirection(positionAndDirection) {
    // 0 0 N
    this.roverPositionAndDirection = positionAndDirection;
    const items = positionAndDirection.split(" ");
    this.currentDirection = items[2];
    this.currentXY = [parseInt(items[0]), parseInt(items[1])];
  }
  setRoverInstructions(instructionString) {
    // eample 'MR' or 'LMLMLMLMM' M = Move R = Right L = Left
    // loop through the instructions and call the correct function
    this.roverInstructions = instructionString;
    const instructions = instructionString.split("");

    instructions.forEach((instruction) => {
      if (instruction === "M") {
        this.move();
      } else {
        this.turn(instruction);
      }
    });
  }
  turn(direction) {
    // L means spin 90 degrees left
    // R means spin 90 degrees right
    if (this.currentDirection === "N") {
      if (direction === "L") {
        this.currentDirection = "W";
      } else if (direction === "R") {
        this.currentDirection = "E";
      }
    } else if (this.currentDirection === "S") {
      if (direction === "L") {
        this.currentDirection = "E";
      } else if (direction === "R") {
        this.currentDirection = "W";
      }
    } else if (this.currentDirection === "E") {
      if (direction === "L") {
        this.currentDirection = "N";
      } else if (direction === "R") {
        this.currentDirection = "S";
      }
    } else if (this.currentDirection === "W") {
      if (direction === "L") {
        this.currentDirection = "S";
      } else if (direction === "R") {
        this.currentDirection = "N";
      }
    }
    this.roverPositionAndDirection = `${this.currentXY[0]} ${this.currentXY[1]} ${this.currentDirection}`;
    return this.currentDirection;
  }
  move() {
    // M means move FORWARD ONE grid point, and maintain the same heading.
    // Assume that the square directly North from (x, y) is (x, y+1).
    // TODO: test for when you hit the grid wall
    if (this.currentDirection === "N") {
      this.currentXY[1] += 1;
    } else if (this.currentDirection === "S") {
      this.currentXY[1] -= 1;
    } else if (this.currentDirection === "E") {
      this.currentXY[0] += 1;
    } else if (this.currentDirection === "W") {
      this.currentXY[0] -= 1;
    }
    this.roverPositionAndDirection = `${this.currentXY[0]} ${this.currentXY[1]} ${this.currentDirection}`;
    return this.roverPositionAndDirection;
  }
  setRoverDirection(direction) {
    this.roverDirection = direction;
  }
  runAllInstructions(lineDelinitedString) {
    let output = "";
    let instructions = lineDelinitedString.split("\n");
    this.setGridSize(instructions[0]);
    // loop through the instructions and call the correct function
    for (let i = 1; i < instructions.length; i += 2) {
      this.setRoverPositionAndDirection(instructions[i]);
      this.setRoverInstructions(instructions[i + 1]);
      output += this.getCurrentPosition() + "\n";
    }
    return output.trim();
  }
  getCurrentPosition() {
    return this.roverPositionAndDirection;
  }
}
