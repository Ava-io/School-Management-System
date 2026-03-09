export const alterTables = `
ALTER TABLE students
ADD COLUMN IF NOT EXISTS state_of_origin VARCHAR(20)
`;

export const removeUserTables = `
ALTER TABLE students
DROP COLUMN  state_of_origin 
`;

export const alterPrefectTable = `
ALTER TABLE prefects
ADD COLUMN IF NOT EXISTS role VARCHAR(20)
`;
