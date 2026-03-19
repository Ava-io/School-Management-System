export const createStudentTable = `
CREATE TABLE IF NOT EXISTS students(
id SERIAL PRIMARY KEY,
first_name VARCHAR(100),
last_name VARCHAR(100),
state_of_origin VARCHAR(20),
gender VARCHAR(20) CHECK (gender IN ('male', 'female')),
age DATE,
school_id INT REFERENCES schools(id) ON DELETE CASCADE,
user_id INT REFERENCES users(id) ON DELETE CASCADE,

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

)
`;
