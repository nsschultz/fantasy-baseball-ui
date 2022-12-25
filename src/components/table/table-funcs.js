/**
 * Gets the alignment based on attributes on the column.
 * Right now, column.type === "numeric" is the only value that results in a right alignment. Everything else is left alignment.
 * @param {object} column The column object that determines the alignment.
 * @returns Right if they type is numeric, left for everything else.
 */
export const getAlign = (column) => (column && column.type === "numeric" ? "right" : "left");
