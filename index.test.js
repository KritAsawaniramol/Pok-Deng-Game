const index = require('./index');

describe('test isValidBet', () => {
  test('should return false if bet is not a number', () => {
    expect(index.isValidBet('string')).toBe(false);
  });

  test('should return false if bet is less than 0', () => {
    expect(index.isValidBet(-1)).toBe(false);
  });

  test('should return true if bet is a number greater than 0', () => {
    expect(index.isValidBet(1)).toBe(true);
  });
});

describe('test createDeck', () => {
  test('should return an array of 52 cards', () => {
    expect(index.createDeck().length).toBe(52);
  });
});