export const createSubmissionTable = `
CREATE TABLE IF NOT EXISTS submissions(
id SERIAL PRIMARY KEY,
assignment_id INT REFERENCES assignment(id) ON DELETE SET NULL,
content TEXT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;
