export const createSchoolTable = `
CREATE TABLE IF NOT EXISTS schools(
id SERIAL PRIMARY KEY,
name VARCHAR(200),
logo_url VARCHAR(255),
address VARCHAR(255),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;
