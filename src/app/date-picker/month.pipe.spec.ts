import { MonthPipe } from './month.pipe';

describe('MonthPipe', () => {
  it('create an instance', () => {
    const pipe = new MonthPipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms a list of numbers into month strings', () => {
    // Arrange
    const pipe = new MonthPipe();
    const monthNumbers = [1,2,3];
    const monthStrings = ["January", "February", "March"];

    // Act
    var result = pipe.transform(monthNumbers)

    // Assert
    expect(result).toEqual(monthStrings);
  });

  it('does not transform invalid data', () => {
    // Arrange
    const pipe = new MonthPipe();
    const monthNumbers = [-1,0,13];
    const monthStrings = ["Invalid month", "Invalid month", "Invalid month"];

    // Act
    var result = pipe.transform(monthNumbers)

    // Assert
    expect(result).toEqual(monthStrings);
  });
});
