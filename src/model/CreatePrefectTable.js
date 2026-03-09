export const createPrefectTable = `
CREATE TABLE IF NOT EXISTS prefects(
id SERIAL PRIMARY KEY,
role VARCHAR(20),
student_id INT REFERENCES students(id) ON DELETE CASCADE,
status VARCHAR(10) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
school_id INT REFERENCES schools(id) ON DELETE CASCADE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;
