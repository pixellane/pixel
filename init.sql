-- Portfolio Database Schema

CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    technologies TEXT[],
    github_url VARCHAR(255),
    demo_url VARCHAR(255),
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    level INTEGER CHECK (level >= 1 AND level <= 100),
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial skills
INSERT INTO skills (name, level, category) VALUES
('HTML', 75, 'Frontend'),
('CSS', 70, 'Frontend'),
('JavaScript', 65, 'Frontend');

-- Insert sample projects
INSERT INTO projects (title, description, technologies, github_url) VALUES
('Personal Portfolio', 'A modern portfolio website built with React and Node.js', ARRAY['React', 'Node.js', 'PostgreSQL'], 'https://github.com/jereme-paragoso'),
('Todo Application', 'A simple todo app to practice JavaScript fundamentals', ARRAY['HTML', 'CSS', 'JavaScript'], 'https://github.com/jereme-paragoso'),
('Landing Page', 'Responsive landing page with modern CSS', ARRAY['HTML', 'CSS'], 'https://github.com/jereme-paragoso');