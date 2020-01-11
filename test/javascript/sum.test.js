const sum = require('../../app/react/sum');
test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});