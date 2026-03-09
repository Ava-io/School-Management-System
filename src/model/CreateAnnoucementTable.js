export const createAnnouncementTable = `
CREATE TABLE IF NOT EXISTS announcement(
id SERIAL PRIMARY KEY,
title VARCHAR(225) NOT NULL,
content TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
school_id INT REFERENCES schools(id) ON DELETE CASCADE
)
`;
