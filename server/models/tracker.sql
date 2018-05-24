\c mtracker;

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
 userId serial PRIMARY KEY,
 firstName VARCHAR (50) NOT NULL,
 lastName VARCHAR (50) NOT NULL,
 signupDate date NOT NULL DEFAULT CURRENT_DATE,
 email VARCHAR (50) NOT NULL UNIQUE,
 password VARCHAR (20) NOT NULL,
 isAdmin boolean NOT NULL default false
);

DROP TABLE IF EXISTS requests;
DROP TYPE product;
DROP TYPE requestType;
DROP TYPE requestStatus;

CREATE TYPE product AS ENUM ('laptop', 'monitor', 'chair', 'desk', 'charger', 'headphone');
CREATE TYPE requestType AS ENUM ('repair', 'maintenance', 'replace');
CREATE TYPE requestStatus AS ENUM ('pending', 'disapproved', 'approved', 'resolved');
CREATE TABLE requests (
 requestId serial PRIMARY KEY,
 userId INT NOT NULL,
 requestDate date NOT NULL DEFAULT CURRENT_DATE,
 product product NOT NULL,
 requestType requestType NOT NULL,
 issue VARCHAR (255) NOT NULL,
 requestStatus requestStatus NOT NULL DEFAULT 'pending',
 imageUrl VARCHAR (255) DEFAULT 'https://www.mountaineers.org/images/placeholder-images/placeholder-400-x-400/image_preview',
 FOREIGN KEY (userId) REFERENCES users (userId)
);

-- seeding
INSERT INTO users (firstName,lastName,email,password,isAdmin) 
  VALUES ('Emeka', 'Chinedu','emekaadmin@gmail.com','01234', true);
INSERT INTO users (firstName,lastName,email,password) 
  VALUES ('Tomiwa','Olaniyi','tomiwa0456@gmail.com','56789');
INSERT INTO users (firstName,lastName,email,password) 
  VALUES ('Mercy','Rose','mercy@gmail.com','56789');


INSERT INTO requests (userId,product,requestType,issue,imageUrl) 
  VALUES (3,'laptop','repair','It shuts down on its own',
          'https://www.asus.com/media/global/products/Slb3ZUQCNmiKi66c/P_setting_F5F5F5_1_90_end_765.png');
INSERT INTO requests (userId,product,requestType,issue) 
  VALUES (2,'headphone','replace','The speaker is bad');
INSERT INTO requests (userId,product,requestType,issue,imageUrl) 
  VALUES (3,'monitor','repair','Broken screen',
          'https://www.asus.com/media/global/products/Slb3ZUQCNmiKi66c/P_setting_F5F5F5_1_90_end_765.png');
INSERT INTO requests (userId,product,requestType,issue) 
  VALUES (2,'charger','repair','Does not charge my laptop anymore');
