
export function numberOfDaysBetweenDates(firstDate, secondDate) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const diff =  Math.round(Math.abs((firstDate - secondDate) / oneDay));
    return diff;
}