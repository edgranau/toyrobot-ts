import { Direction } from './types';
import { add, isOnTable, isValidVector } from './util';

describe('isValidVector', () => {
  test('should return true for a valid vector', () => {
    const vector = { x: 2, y: 3, direction: Direction.NORTH };
    const result = isValidVector(vector);
    expect(result).toBe(true);
  });

  test('should return false if x is negative', () => {
    const vector = { x: -1, y: 3, direction: Direction.NORTH };
    const result = isValidVector(vector);
    expect(result).toBe(false);
  });

  test('should return false if y is negative', () => {
    const vector = { x: 2, y: -1, direction: Direction.NORTH };
    const result = isValidVector(vector);
    expect(result).toBe(false);
  });

  test('should return false if direction is undefined', () => {
    const vector = { x: 2, y: 3, direction: undefined };
    const result = isValidVector(vector);
    expect(result).toBe(false);
  });
});

describe('isOnTable', () => {
  let table: any;

  beforeEach(() => {
    table = { dimensions: { x: 5, y: 5 } };
  });

  test('should return true if the position is on the table', () => {
    const position = { x: 2, y: 3, direction: Direction.EAST };
    const result = isOnTable(position, table);
    expect(result).toBe(true);
  });

  test('should return false if x is negative', () => {
    const position = { x: -1, y: 3, direction: Direction.EAST };
    const result = isOnTable(position, table);
    expect(result).toBe(false);
  });

  test('should return false if x is greater than or equal to table dimensions', () => {
    const position = { x: 5, y: 3, direction: Direction.EAST };
    const result = isOnTable(position, table);
    expect(result).toBe(false);
  });

  test('should return false if y is negative', () => {
    const position = { x: 2, y: -1, direction: Direction.EAST };
    const result = isOnTable(position, table);
    expect(result).toBe(false);
  });

  test('should return false if y is greater than or equal to table dimensions', () => {
    const position = { x: 2, y: 5, direction: Direction.EAST };
    const result = isOnTable(position, table);
    expect(result).toBe(false);
  });

  test('should return false if direction is undefined', () => {
    const position = { x: 2, y: 3, direction: undefined };
    const result = isOnTable(position, table);
    expect(result).toBe(false);
  });
});

describe('add', () => {
  test('should add two matrices', () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const result = add(matrix);
    expect(result).toEqual([5, 7, 9]);
  });
});
