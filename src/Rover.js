// Problem
// A squad of robotic rovers are to be landed by NASA on a plateau on Mars. This plateau, which is curiously rectangular, must be navigated by the rovers so that their on-board cameras can get a complete view of the surrounding terrain to send back to Earth.

// A rover’s position and location is represented by a combination of x and y co-ordinates and a letter representing one of the four cardinal compass points. The plateau is divided up into a grid to simplify navigation. An example position might be 0, 0, N, which means the rover is in the bottom left corner and facing North.

// In order to control a rover, NASA sends a simple string of letters. The possible letters are ‘L’, ‘R’ and ‘M’. ‘L’ and ‘R’ makes the rover spin 90 degrees left or right respectively, without moving from its current spot. ‘M’ means move forward one grid point, and maintain the same heading.

// Assume that the square directly North from (x, y) is (x, y+1).

// INPUT:
// The first line of input is the upper-right coordinates of the plateau, the lower-left coordinates are assumed to be 0,0.

// The rest of the input is information pertaining to the rovers that have been deployed. Each rover has two lines of input. The first line gives the rover’s position, and the second line is a series of instructions telling the rover how to explore the plateau. The position is made up of two integers and a letter separated by spaces, corresponding to the x and y co-ordinates and the rover’s orientation.

// Each rover will be finished sequentially, which means that the second rover won’t start to move until the first one has finished moving.

// OUTPUT:
// The output for each rover should be its final co-ordinates and heading.

// EXAMPLE:
// Test Input:
// 5 5
// 1 2 N
// LMLMLMLMM
// 3 3 E
// MMRMMRMRRM
// Expected Output:

export default class Rover {
    // initialize the rover with the current position and direction
    currentDirection = 'N';
    gridSize = [5, 5];
    currentPosition = [0, 0];

    constructor() {
    }
    setGridSize(gridSize) {
        this.gridSize = gridSize;
    }
    reset(currentPositionAndDirection) {
        // split based on space, first 2 items is x and y, last item is direction
        let items = currentPositionAndDirection.split(' ');
        this.currentPosition = [parseInt(items[0]), parseInt(items[1])];
        this.currentDirection = items[2];
    }
    // turn function. turn the current rover to left or right
    turn(direction) {
        let directions = ['N', 'E', 'S', 'W'];
        let currentIndex = directions.indexOf(this.currentDirection);
        if (direction === 'L') {
            this.currentDirection = directions[(currentIndex + 3) % 4];
        } else if (direction === 'R') {
            this.currentDirection = directions[(currentIndex + 1) % 4];
        }
        return this.currentDirection;
    }
    move(){
        // move 1 space in the direction we are facing, 
        // no negative values or values greater than the grid size
        if(this.currentDirection === 'N'){
            if(this.currentPosition[1] < this.gridSize[1]){
                this.currentPosition[1]++;
            }
        } else if(this.currentDirection === 'E'){
            if(this.currentPosition[0] < this.gridSize[0]){
                this.currentPosition[0]++;
            }
        } else if(this.currentDirection === 'S'){
            if(this.currentPosition[1] > 0){
                this.currentPosition[1]--;
            }
        }
        else if(this.currentDirection === 'W'){
            if(this.currentPosition[0] > 0){
                this.currentPosition[0]--;
            }
        }
        return this.currentPosition;
    }
    command(command){
        // take in a string of commands and execute them, split by character
        const commands = command.split('');

        commands.forEach(command => {
            if(command === 'L' || command === 'R'){
                this.turn(command);
            } else if(command === 'M'){
                this.move();
            }
        });
    }

    submitInstructions(instructions) {
        let output = '';
        //split instuctions based on line break
        let instructionsArray = instructions.split('\n');
        // get the grid size from the first line
        let gridSize = instructionsArray[0];
        this.setGridSize(gridSize);
        instructionsArray.shift();
        // loop the next lines and execute the commands
        for (let i = 0; i < instructionsArray.length; i++) {
            // the new line is the starting position and direction of the rover
            this.reset(instructionsArray[i]);
            i++;
            let command = instructionsArray[i];
            this.command(command);
            output += this.currentPosition.join(' ') + ' ' + this.currentDirection + '\n';
        }
        return  output;

    }

    // move function. move the current rover to left or right

}
