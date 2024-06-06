export default class MarsRover {
  constructor() {}

  setGrid(upperRightString) {
    // exmaple 5 5
    const items = upperRightString.split(" ");
    this.upperRightXY = [parseInt(items[0]), parseInt(items[1])];
    return this.upperRightXY;
  }

  setInitalPositonAndDirection(positionAndDirection) {
    // 0 0 N
    const items = positionAndDirection.split(" ");
    const x = items[0];
    const y = items[1];
    const direction = items[2];

    this.currentDirection = direction;
    this.currentXY = [parseInt(x), parseInt(y)];
  }

  getCurentPostionAndDirectionString() {
    return `${this.currentXY[0]} ${this.currentXY[1]} ${this.currentDirection}`;
  }
  executeCommands(commandString) {
    // MRM
    const commands = commandString.split("");
    commands.forEach((command) => {
      if (command === "M") {
        this.move();
      } else {
        this.turn(command);
      }
    });
  }
  turn(leftOrRight) {
    // L R
    if (leftOrRight === "L") {
      if (this.currentDirection === "N") {
        this.currentDirection = "W";
      } else if (this.currentDirection === "E") {
        this.currentDirection = "N";
      } else if (this.currentDirection === "S") {
        this.currentDirection = "E";
      } else if (this.currentDirection === "W") {
        this.currentDirection = "S";
      }
    } else {
      if (this.currentDirection === "N") {
        this.currentDirection = "E";
      } else if (this.currentDirection === "E") {
        this.currentDirection = "S";
      } else if (this.currentDirection === "S") {
        this.currentDirection = "W";
      } else if (this.currentDirection === "W") {
        this.currentDirection = "N";
      }
    }
  }
  move() {
    // take direction and add either +1 or -1 to x y axis
    const x = this.currentXY[0];
    const y = this.currentXY[1];
    if (this.currentDirection === "N") {
      // increase y +1
      this.currentXY = [x, y + 1];
    } else if (this.currentDirection === "S") {
      // increase y +1
      this.currentXY = [x, y - 1];
    } else if (this.currentDirection === "E") {
      // increase y +1
      this.currentXY = [x + 1, y];
    } else if (this.currentDirection === "W") {
      // increase y +1
      this.currentXY = [x - 1, y];
    }
    // TODO: detect if out of bounds, then dont move
  }

  executeEntireInstructions(instructionString) {
    // 5 5
    // 0 0 N
    // MRM
    // 1 1 E
    // RML

    const instructions = instructionString.split("\n");
    let output = "";
    this.setGrid(instructions[0]);

    for (let i = 1; i < instructions.length; i = i + 2) {
      this.setInitalPositonAndDirection(instructions[i]);
      this.executeCommands(instructions[i + 1]);
      output = output + this.getCurentPostionAndDirectionString();
      if (i !== instructions.length - 2) {
        output = output + "\n";
      }
    }

    return output;
  }
}
