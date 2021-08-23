/**
 * [parses an object into a css selector]
 * @param {object} i object to parse
 */
export const jcss = (i) =>
  Object.keys(i)
    .filter((f) => !!i[f])
    .join(" ");
