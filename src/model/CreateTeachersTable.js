export const createTeachersTable = `
CREATE TABLE IF NOT EXISTS teachers(
id SERIAL PRIMARY KEY,
school_id INT REFERENCES schools(id) ON DELETE CASCADE,
user_id INT REFERENCES users(id) ON DELETE CASCADE,
first_name VARCHAR(50) NOT NULL,
last_name VARCHAR(50) NOT NULL,
gender VARCHAR(20) CHECK (gender IN ('male', 'female')),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;
