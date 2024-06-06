// Problem
// A squad of robotic rovers are to be landed by NASA on a plateau on Mars.
// This plateau, which is curiously RECTANGULAR,
//  must be navigated by the rovers so that their on-board cameras can get a complete view of the surrounding terrain to send back to Earth.

// A rover’s position and location is represented by a combination of x and y co-ordinates and a letter representing one of the four cardinal compass points.
// The plateau is divided up into a grid to simplify navigation. An example position might be 0, 0, N, which means the rover is in the bottom left corner and facing North.

// INITIAL POSTION: 0 0 N

// In order to control a rover, NASA sends a simple string of letters.
// The possible letters are ‘L’, ‘R’ and ‘M’. ‘L’ and ‘R’ makes the rover spin 90 degrees left or right respectively, without moving from its current spot. ‘M’ means move forward one grid point, and maintain the same heading.

// CONTROL: LMMRMM

// Assume that the square directly North from (x, y) is (x, y+1).

// INPUT:
// The first line of input is the upper-right coordinates of the plateau, the lower-left coordinates are assumed to be 0,0.
// SET GRID: 5 5

// The rest of the input is information pertaining to the rovers that have been deployed.
// Each rover has two lines of input. The first line gives the rover’s position, and the second line is a series of instructions telling the rover how to explore the plateau.
// The position is made up of two integers and a letter separated by spaces, corresponding to the x and y co-ordinates and the rover’s orientation.

// ROVER COMMANDS
// LINE 1: 0 0 N
// LINE 2: MMRMM

// Each rover will be finished sequentially,
// which means that the second rover won’t start to move until the first one has finished moving.

// OUTPUT:
// The output for each rover should be its final co-ordinates and heading.

// EXAMPLE:
// Test Input:
// setGrid
// 5 5
// setInitalPositonAndDirection rover 1
// 0 0 N
// executeCommands rover 1
// MRM
// setInitalPositonAndDirection rover 2
// 3 3 E
// executeCommands rover 2
// MMRMMRMRRM

// Expected Output:
// 1 3 N
// 5 1 E

import { describe, it, expect, beforeAll } from "vitest";
import MarsRover from "./MarsRover";
describe("Given a 5 by 5 grid", () => {
  const rover = new MarsRover();
  beforeAll(() => {
    rover.setGrid("5 5");
  });

  it("the grid xy should now be an int array", () => {
    expect(rover.upperRightXY).toStrictEqual([5, 5]);
  });

  describe("Given a start position of 0 0 N", () => {
    beforeAll(() => {
      rover.setInitalPositonAndDirection("0 0 N");
    });
    it("the current direction should be N", () => {
      expect(rover.currentDirection).toEqual("N");
    });
    it("the current position should be [0, 0]", () => {
      expect(rover.currentXY).toStrictEqual([0, 0]);
    });
    describe("When the rover moves MRM", () => {
      beforeAll(() => {
        rover.executeCommands("MRM");
      });
      it("the current position of the rover should now be 1 1", () => {
        expect(rover.currentXY).toStrictEqual([1, 1]);
      });
      it("the current direction of the rover should now be E", () => {
        expect(rover.currentDirection).toEqual("E");
      });
      it("the current positon and direction string of the rover should now be 1 1 E", () => {
        expect(rover.getCurentPostionAndDirectionString()).toEqual("1 1 E");
      });
    });
  });
});

describe("given a full set of instructions", () => {
  const instructions = `5 5
0 0 N
M
1 1 E
M`;
  const rover = new MarsRover();
  let output = "";
  beforeAll(() => {
    output = rover.executeEntireInstructions(instructions);
  });
  it("should return a valid output", () => {
    console.log(output);
    expect(output).toEqual("0 1 N\n2 1 E");
  });
});
