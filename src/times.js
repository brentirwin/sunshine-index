export const times = time => {
  return [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][time % 12].toString()
          + ' ' + (time < 12 ? 'am' : 'pm');
}
