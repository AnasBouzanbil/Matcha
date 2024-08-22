CREATE TABLE IF NOT EXISTS Users (
    id SERIAL PRIMARY KEY,
    FirstName VARCHAR(20),
    LastName VARCHAR(20),
    Username VARCHAR(20),
    Email VARCHAR(30),
    PhoneNumber VARCHAR(17),
    Locations VARCHAR(50),
    Password VARCHAR(255),
    gender VARCHAR(6),
    age INT,
    gender_preference VARCHAR(100),
    bio VARCHAR(255),
    profileimg TEXT
);

-- Create Pictures table
CREATE TABLE IF NOT EXISTS Pictures (
    id SERIAL PRIMARY KEY,
    userid INT REFERENCES Users(id),
    img_path TEXT
);

-- Create Friend table
CREATE TABLE IF NOT EXISTS Friend (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(id),
    friend_id INT REFERENCES Users(id)
);

-- Create Lovers table
CREATE TABLE IF NOT EXISTS Lovers (
    id SERIAL PRIMARY KEY,
    user1_id INT REFERENCES Users(id),
    user2_id INT REFERENCES Users(id)
);


-- Create Chat table
CREATE TABLE IF NOT EXISTS Chat (
    id SERIAL PRIMARY KEY,
    user1_id INT REFERENCES Users(id),
    user2_id INT REFERENCES Users(id),
    message TEXT,
    timestamp TIMESTAMP
);

-- Create Tags table
CREATE TABLE IF NOT EXISTS Tags (
    id SERIAL PRIMARY KEY,
    TagName VARCHAR(20)
);


-- Create Preference table
CREATE TABLE IF NOT EXISTS Preference (
    id SERIAL PRIMARY KEY,
    TagId INT REFERENCES Tags(id),
    userId INT REFERENCES Users(id)
);


INSERT INTO Tags (TagName) VALUES ('Humor');
INSERT INTO Tags (TagName) VALUES ('Fun');
INSERT INTO Tags (TagName) VALUES ('Study');
INSERT INTO Tags (TagName) VALUES ('Traveling');
INSERT INTO Tags (TagName) VALUES ('Gym');
INSERT INTO Tags (TagName) VALUES ('Movies');
INSERT INTO Tags (TagName) VALUES ('Music');
INSERT INTO Tags (TagName) VALUES ('Reading');
INSERT INTO Tags (TagName) VALUES ('Cooking');
INSERT INTO Tags (TagName) VALUES ('Sports');
INSERT INTO Tags (TagName) VALUES ('Fitness');
INSERT INTO Tags (TagName) VALUES ('Yoga');
INSERT INTO Tags (TagName) VALUES ('Hiking');
INSERT INTO Tags (TagName) VALUES ('Gaming');
INSERT INTO Tags (TagName) VALUES ('Photography');
INSERT INTO Tags (TagName) VALUES ('Art');
INSERT INTO Tags (TagName) VALUES ('Dancing');
INSERT INTO Tags (TagName) VALUES ('Theater');
INSERT INTO Tags (TagName) VALUES ('Volunteering');
INSERT INTO Tags (TagName) VALUES ('Pets');
INSERT INTO Tags (TagName) VALUES ('Nature');
INSERT INTO Tags (TagName) VALUES ('Meditation');
INSERT INTO Tags (TagName) VALUES ('Technology');
INSERT INTO Tags (TagName) VALUES ('DIY Projects');
INSERT INTO Tags (TagName) VALUES ('Fashion');
INSERT INTO Tags (TagName) VALUES ('Shopping');
INSERT INTO Tags (TagName) VALUES ('Wine Tasting');
INSERT INTO Tags (TagName) VALUES ('Craft Beer');
INSERT INTO Tags (TagName) VALUES ('Foodie');
INSERT INTO Tags (TagName) VALUES ('History');
INSERT INTO Tags (TagName) VALUES ('Science');
INSERT INTO Tags (TagName) VALUES ('Politics');
INSERT INTO Tags (TagName) VALUES ('Environmentalism');
INSERT INTO Tags (TagName) VALUES ('Cars');
INSERT INTO Tags (TagName) VALUES ('Motorcycles');
INSERT INTO Tags (TagName) VALUES ('Beach');
INSERT INTO Tags (TagName) VALUES ('Mountains');
INSERT INTO Tags (TagName) VALUES ('Skiing');
INSERT INTO Tags (TagName) VALUES ('Snowboarding');
INSERT INTO Tags (TagName) VALUES ('Running');
INSERT INTO Tags (TagName) VALUES ('Cycling');
INSERT INTO Tags (TagName) VALUES ('Swimming');
INSERT INTO Tags (TagName) VALUES ('Surfing');
INSERT INTO Tags (TagName) VALUES ('Camping');
INSERT INTO Tags (TagName) VALUES ('Astronomy');
INSERT INTO Tags (TagName) VALUES ('Languages');
INSERT INTO Tags (TagName) VALUES ('Writing');
INSERT INTO Tags (TagName) VALUES ('Poetry');
INSERT INTO Tags (TagName) VALUES ('Anime');
INSERT INTO Tags (TagName) VALUES ('Comics');
INSERT INTO Tags (TagName) VALUES ('Board Games');
INSERT INTO Tags (TagName) VALUES ('Card Games');
INSERT INTO Tags (TagName) VALUES ('Travel Planning');
INSERT INTO Tags (TagName) VALUES ('Architecture');
INSERT INTO Tags (TagName) VALUES ('Interior Design');
INSERT INTO Tags (TagName) VALUES ('Collecting');
INSERT INTO Tags (TagName) VALUES ('Fishing');
INSERT INTO Tags (TagName) VALUES ('Bird Watching');
INSERT INTO Tags (TagName) VALUES ('Gardening');
INSERT INTO Tags (TagName) VALUES ('Martial Arts');
INSERT INTO Tags (TagName) VALUES ('Self-Improvement');
INSERT INTO Tags (TagName) VALUES ('+18');
INSERT INTO Tags (TagName) VALUES ('Other');
