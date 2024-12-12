const ConvertToJson = require('../Help/convertToJSON')

test('1 equals 1', () => {
    // Arrange
    const obj = { status: "start" };

    // Act
    const result = ConvertToJson(obj);

    // Assert
    expect(result).toBe("{\"status\":\"start\"}");
})