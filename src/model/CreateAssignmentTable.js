export const createAssignmentTable = `
CREATE TABLE IF NOT EXISTS assignments(
id SERIAL PRIMARY KEY,
title VARCHAR(255) NOT NULL,
content TEXT NOT NULL,
teacher_id INT REFERENCES teachers(id) ON DELETE SET NULL,
school_id INT REFERENCES schools(id) ON DELETE CASCADE,
class_id INT REFERENCES classes(id) ON DELETE SET NULL
)
`;