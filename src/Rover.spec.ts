import {describe , it, expect, beforeAll} from 'vitest';
import Rover from './Rover';

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


describe('Given a 5 5 grid', ()=>{
  const rover = new Rover();
  let maxX = 5;
  let maxY = 5;
  beforeAll(()=>{
    rover.setGridSize(`${maxX} ${maxY}`);
  });
  describe('When the rover starts at position 0 0 N', ()=>{
    beforeAll(()=>{
      rover.reset('0 0 N');
    });
    it('Then the rover should be at position 0 0 N', ()=>{
      expect(rover.currentPosition).toStrictEqual([0, 0]);
    });
    it('Then the rover should be facing North', ()=>{
      expect(rover.currentDirection).toBe('N');
    });
    describe('When the rover receives the instructions RM', ()=>{
      beforeAll(()=>{
        rover.command('RM');
      });
      it('Then the rover should be at position 1 0', ()=>{
        expect(rover.currentPosition).toStrictEqual([1, 0]);
      });
      it('Then the rover should be facing East', ()=>{
        expect(rover.currentDirection).toBe('E');
      });
    });
  });

  describe('When the rover starts at position 0 0 S', ()=>{
    beforeAll(()=>{
      rover.reset('0 0 S');
    });
    it('Then the rover should be at position 0 0', ()=>{
      expect(rover.currentPosition).toStrictEqual([0, 0]);
    });
    it('Then the rover should be facing South', ()=>{
      expect(rover.currentDirection).toBe('S');
    });
    describe('When the rover receives the instructions RM', ()=>{
      beforeAll(()=>{
        rover.command('RM');
      });
      it('Then the rover should not have moved', ()=>{
        expect(rover.currentPosition).toStrictEqual([0, 0]);
      });
      it('Then the rover should be facing west', ()=>{
        expect(rover.currentDirection).toBe('W');
      });
    });
  });
});

describe('given a full instuction set', ()=>{
  const rover = new Rover();
  const instructionSet =`5 5
  1 2 N
  LMLMLMLMM
  3 3 E
  MMRMMRMRRM`;
  it('should return the correct final position', ()=>{
    expect(rover.submitInstructions(instructionSet)).toBe('1 3 N\n5 1 E');
  });
});