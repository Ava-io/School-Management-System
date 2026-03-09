export const createClassTable = `
CREATE TABLE IF NOT EXISTS classes(
id SERIAL PRIMARY KEY,
name VARCHAR(50) NOT NULL,
dept_id INT REFERENCES departments(id) ON DELETE SET NULL,
school_id INT REFERENCES schools(id) ON DELETE CASCADE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
)
`;
