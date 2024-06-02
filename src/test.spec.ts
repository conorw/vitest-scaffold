import {describe , it, expect} from 'vitest';
import { MarsRover } from './MarsRover';

describe('Turning', ()=>{

  it('turn right', () =>{
    const rover = new MarsRover([0, 0], 'N');
    rover.turn('r');
    expect(rover.direction).toBe('E');
    rover.turn('r');
    expect(rover.direction).toBe('S');
  });
  it('turn left', () =>{
    const rover = new MarsRover([0, 0], 'N');
    rover.turn('l');
    expect(rover.direction).toBe('W');
    rover.turn('l');
    expect(rover.direction).toBe('S');
  });
});

describe('Moving', ()=>{
  it('move forward', () =>{
    const rover = new MarsRover([0, 0], 'N');
    rover.move('f');
    expect(rover.location).toEqual([0, 1]);
  });
  it('move backward', () =>{
    const rover = new MarsRover([0, 1], 'N');
    rover.move('b');
    expect(rover.location).toEqual([0, 0]);
  });

});

describe('Moving and turning', ()=>{
  it('move and turn right', () =>{
    const rover = new MarsRover([0, 0], 'N');
    rover.commands(['f', 'r','f']);
    expect(rover.location).toEqual([1, 1]);
  });
  it('move and turn left', () =>{
    const rover = new MarsRover([0, 0], 'N');
    rover.commands(['f', 'l','f']);
    expect(rover.location).toEqual([-1, 1]);
  });
})
