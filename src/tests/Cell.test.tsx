import '@testing-library/jest-dom';
import {Cell} from "../Models/Cell";

test('TestCellCenterComment1', () => {
    let cell = new Cell("", "123456789", [""])
    expect(cell.getCenterComment()).toBe("123456789");
});

test('TestCellCenterComment2', () => {
    let cell = new Cell("", "123456781", [""])
    expect(cell.getCenterComment()).toBe("12345678");
});

test('TestCellCenterComment3', () => {
    let cell = new Cell("", "121345676", [""])
    expect(cell.getCenterComment()).toBe("1234567");
});

test('TestCellCenterComment4', () => {
    let cell = new Cell("", "1234445", [""])
    expect(cell.getCenterComment()).toBe("12345");
});

test('TestCellCenterComment5', () => {
    let cell = new Cell("", "", [""])
    expect(cell.getCenterComment()).toBe("");
});

test('TestCellCenterComment6', () => {
    let cell = new Cell("", "123123123", [""])
    expect(cell.getCenterComment()).toBe("123");
});

test('TestCellCenterComment7', () => {
    let cell = new Cell("", "123d56", [""])
    expect(cell.getCenterComment()).toBe("12356");
});

test('TestCellCenterComment8', () => {
    let cell = new Cell("", "12305df3", [""])
    expect(cell.getCenterComment()).toBe("1235");
});

test('TestCellCornerComment1', () => {
    let cell = new Cell("", "", ["1", "2", "3", "4"])
    expect(cell.getCornerComments()).toStrictEqual(["1", "2", "3", "4"])
});

test('TestCellCornerComment2', () => {
    let cell = new Cell("", "", ["1", "", "3", "4"])
    expect(cell.getCornerComments()).toStrictEqual(["1", "", "3", "4"])
});

test('TestCellCornerComment3', () => {
    let cell = new Cell("", "", ["1", "2", "3", "1"])
    expect(cell.getCornerComments()).toStrictEqual(["1", "2", "3", ""])
});

test('TestCellCornerComment4', () => {
    let cell = new Cell("", "", ["", "2", "", "2"])
    expect(cell.getCornerComments()).toStrictEqual(["", "2", "", ""])
});

test('TestCellCornerComment5', () => {
    let cell = new Cell("", "", ["", "", "", ""])
    expect(cell.getCornerComments()).toStrictEqual(["", "", "", ""])
});

test('TestCellCornerComment6', () => {
    let cell = new Cell("", "", ["3", "3", "3", "3"])
    expect(cell.getCornerComments()).toStrictEqual(["3", "", "", ""])
});

test('TestCellCornerComment7', () => {
    let cell = new Cell("", "", ["1", "d", "1", "0"])
    expect(cell.getCornerComments()).toStrictEqual(["1", "", "", ""])
});

test('TestCellCornerComment8', () => {
    let cell = new Cell("", "", ["f", "4", "1", "2"])
    expect(cell.getCornerComments()).toStrictEqual(["", "4", "1", "2"])
});

test('TestCellCornerComment9', () => {
    let cell = new Cell("", "", ["d", "", "0", ""])
    expect(cell.getCornerComments()).toStrictEqual(["", "", "", ""])
});

test('TestCellValue', () => {
    let cell = new Cell("6", "", [])
    expect(cell.getValue()).toBe("6")
});

test('TestCellValue2', () => {
    let cell = new Cell("2", "", [])
    expect(cell.getValue()).toBe("2")
});

test('TestCellValue3', () => {
    let cell = new Cell("d", "", [])
    expect(cell.getValue()).toBe("")
});

test('TestCellValue4', () => {
    let cell = new Cell("0", "", [])
    expect(cell.getValue()).toBe("")
});
