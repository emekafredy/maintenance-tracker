\c mtracker;

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
 userId serial PRIMARY KEY,
 firstName VARCHAR (50) NOT NULL,
 lastName VARCHAR (50) NOT NULL,
 signupDate date NOT NULL DEFAULT CURRENT_DATE,
 email VARCHAR (50) NOT NULL UNIQUE,
 pass VARCHAR (20) NOT NULL,
 isAdmin boolean NOT NULL default false
);

DROP TABLE IF EXISTS requests;
CREATE TABLE requests (
 requestId serial PRIMARY KEY,
 userId INT NOT NULL,
 requestDate date NOT NULL DEFAULT CURRENT_DATE,
 product VARCHAR (20) NOT NULL,
 requestType VARCHAR (20) NOT NULL,
 lastCheck date,
 issue VARCHAR (255) NOT NULL,
 requestStatus VARCHAR (20) NOT NULL DEFAULT 'pending',
 imageUrl VARCHAR (255) DEFAULT 'https://www.mountaineers.org/images/placeholder-images/placeholder-400-x-400/image_preview',
 FOREIGN KEY (userId) REFERENCES users (userId)
);

-- seeding
INSERT INTO users (firstName,lastName,email,pass,isAdmin) 
  VALUES ('Emeka', 'Chinedu','emekaadmin@gmail.com','01234', true);
INSERT INTO users (firstName,lastName,email,pass) 
  VALUES ('Tomiwa','Olaniyi','tomiwa0456@gmail.com','56789');
INSERT INTO users (firstName,lastName,email,pass) 
  VALUES ('Mercy','Rose','mercy@gmail.com','56789');


INSERT INTO requests (userId,product,requestType,issue,imageUrl) 
  VALUES (3,'Laptop','Repair','It shuts down on its own',
          'https://www.asus.com/media/global/products/Slb3ZUQCNmiKi66c/P_setting_F5F5F5_1_90_end_765.png');
INSERT INTO requests (userId,product,requestType,issue) 
  VALUES (2,'Headphone','Replace','The speaker is bad');
INSERT INTO requests (userId,product,requestType,issue,imageUrl) 
  VALUES (3,'Monitor','Repair','Broken screen',
          'https://www.asus.com/media/global/products/Slb3ZUQCNmiKi66c/P_setting_F5F5F5_1_90_end_765.png');
INSERT INTO requests (userId,product,requestType,issue) 
  VALUES (2,'Laptop charger','Repair','Does not charge my laptop anymore');
