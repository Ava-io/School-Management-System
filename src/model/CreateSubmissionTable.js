export const createSubmissionTable = `
CREATE TABLE IF NOT EXISTS submission(
id SERIAL PRIMARY KEY,
assignment_id INT REFERENCES assignments(id) ON DELETE SET NULL,
student_id INT REFERENCES students(id) ON DELETE SET NULL,
status VARCHAR(20) DEFAULT 'submitted' CHECK (status IN ('graded')),
content TEXT,
filepath TEXT NOT NULL,
feedback TEXT,
school_id INT REFERENCES schools(id) ON DELETE CASCADE,
grade VARCHAR(225),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;

 // grade and feedback are for teacher, the rest for student