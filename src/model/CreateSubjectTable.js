export const createSubjectTable = `
CREATE TABLE IF NOT EXISTS subjects(
id SERIAL PRIMARY KEY,
name VARCHAR(100),
code VARCHAR(10) NOT NULL,
dept_id INT REFERENCES departments(id) ON DELETE SET NULL,
school_id INT REFERENCES schools(id) ON DELETE CASCADE,
status VARCHAR(10) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;
