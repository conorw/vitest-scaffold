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

import { describe, it, expect, beforeAll } from "vitest";
import MarsRover from "./MarsRover";

describe("Given a mars rover", () => {
  const rover = new MarsRover();
  describe("When the grid is set to 5 5", () => {
    beforeAll(() => {
      rover.setGridSize("5 5");
    });
    describe("When the rover inital position to 0 0 N", () => {
      beforeAll(() => {
        rover.setRoverPositionAndDirection("0 0 N");
      });
      it("Then the rover XY should be [0, 0]", () => {
        expect(rover.getCurrentXY()).toEqual([0, 0]);
      });
      describe("When the rover instructions are set to MR", () => {
        beforeAll(() => {
          rover.setRoverInstructions("MR");
        });
        it("Then the rover should be at 0 1 E", () => {
          const postion = rover.getCurrentPosition();
          console.log(postion);
          expect(postion).toEqual("0 1 E");
        });
      });
    });
  });
});
describe("Given a mars rover", () => {
  const rover = new MarsRover();
  const instructionSet = `5 5\n0 0 N\nMR\n0 0 E\nMML`;
  describe('when we add a full instruction set', () => {
    it('should return the correct output', () => {
      const output = rover.runAllInstructions(instructionSet);
      expect(output).toEqual('0 1 E\n2 0 N');
    });
  });
});
