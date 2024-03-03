import { getMaxDateInFormat, getTodayInFormat } from "../app/lib/dates";

describe("date functions", () => {
  it("return a date in the future with given duration, in string format", () => {
    const today = new Date("2024-03-03");
    const laterDay = getMaxDateInFormat(today, 10);
    expect(laterDay).toBe("2024-03-13");
  });
});
