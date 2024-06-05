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

import { describe, it, expect, beforeAll } from "vitest";
import MarsRover from "./MarsRover";

// add inital tests here for all functions of the MarsRover class, use given, when, then structure
// given: the initial state of the rover
// when: the function is called
// then: the expected output is returned
describe("MarsRover", () => {
  describe("given a 5 5 grid", () => {
    const marsRover = new MarsRover();
    beforeAll(() => {
      marsRover.setGrid("5 5");
    });
    describe("given a rover initial position of 0 0 N", () => {
      beforeAll(() => {
        marsRover.setRoverPositionAndDirection("0 0 N");
      });
      describe("when the rover is instructed to turn right", () => {
        beforeAll(() => {
          marsRover.executeRoverInstructions("R");
        });
        it("then the rover should be at 0 0 E", () => {
          expect(marsRover.getPositionAndDirection()).toBe("0 0 E");
        });
        describe("when the rover is instructed to move left", () => {
          beforeAll(() => {
            marsRover.executeRoverInstructions("L");
          });
          it("then the rover should be at 0 0 N", () => {
            expect(marsRover.getPositionAndDirection()).toBe("0 0 N");
          });
          describe("when the rover is instructed to move forward", () => {
            beforeAll(() => {
              marsRover.executeRoverInstructions("M");
            });
            it("then the rover should be at 0 1 N", () => {
              expect(marsRover.getPositionAndDirection()).toBe("0 1 N");
            });
          });
          // TODO: add tests for when the rover is instructed to move to the edge of the grid
          describe("when the rover position is reset", () => {
            beforeAll(() => {
              marsRover.setRoverPositionAndDirection("0 0 W");
            });
            it("then the rover cant move left", () => {
              marsRover.executeRoverInstructions('M')
              expect(marsRover.getPositionAndDirection()).toBe("0 0 W");
            });
          });
        });
      });
    });
  });
});
// TODO: add more tests for executing the full instructions
describe("MarsRover full instrictions", () => {
  describe("given a 10 10 grid and a full set of instructions", () => {
    const marsRover = new MarsRover();
    const fullInstructions = `5 5
    0 0 N
    RM
    0 0 E
    MM
    1 1 N
    RM`;
    it("then the final positions should be 1 0 E, 2 0 E, 2 1 E", () => {
      expect(marsRover.executeAllInstructions(fullInstructions)).toBe(
        "1 0 E\n2 0 E\n2 1 E"
      );
    });
  });
});
