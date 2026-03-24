export const createAssignmentTable = `
CREATE TABLE  assignments(
id SERIAL PRIMARY KEY,
title VARCHAR(255) NOT NULL,
content TEXT NOT NULL,
teacher_id INT REFERENCES teachers(id) ON DELETE SET NULL,
school_id INT REFERENCES schools(id) ON DELETE CASCADE,
class_id INT REFERENCES classes(id) ON DELETE SET NULL,
subject_id INT REFERENCES subjects(id) ON DELETE SET NULL,
filePath TEXT NOT NULL,
due_date TIMESTAMP NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;
