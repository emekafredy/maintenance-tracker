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
 requestDate VARCHAR NOT NULL,
 product product NOT NULL,
 requestType requestType NOT NULL,
 issue VARCHAR (255) NOT NULL,
 requestStatus requestStatus NOT NULL DEFAULT 'pending',
 imageUrl VARCHAR (255) DEFAULT 'https://www.mountaineers.org/images/placeholder-images/placeholder-400-x-400/image_preview',
 approvedAt VARCHAR DEFAULT 'N/A',
 disapprovedAt VARCHAR DEFAULT 'N/A',
 resolvedAt VARCHAR DEFAULT 'N/A',
 FOREIGN KEY (userId) REFERENCES users (userId)
);

-- seeding
INSERT INTO users (firstName,lastName,email,password,isAdmin) 
  VALUES ('Emeka', 'Chinedu','emekaadmin@gmail.com','01234', true);
INSERT INTO users (firstName,lastName,email,password) 
  VALUES ('Tomiwa','Olaniyi','tomiwa0456@gmail.com','56789');
INSERT INTO users (firstName,lastName,email,password) 
  VALUES ('Mercy','Rose','mercy@gmail.com','56789');


INSERT INTO requests (userId,product,requestDate,requestType,issue,imageUrl) 
  VALUES (3,'laptop','May 29th 2018, 5:11:58 am','repair','It shuts down on its own',
          'https://www.asus.com/media/global/products/Slb3ZUQCNmiKi66c/P_setting_F5F5F5_1_90_end_765.png');
INSERT INTO requests (userId,product,requestDate,requestType,issue) 
  VALUES (2,'headphone','May 29th 2018, 5:11:58 am','replace','The speaker is bad');
INSERT INTO requests (userId,product,requestDate,requestType,issue,imageUrl) 
  VALUES (3,'monitor','May 29th 2018, 5:11:58 am','repair','Broken screen',
          'https://www.asus.com/media/global/products/Slb3ZUQCNmiKi66c/P_setting_F5F5F5_1_90_end_765.png');
INSERT INTO requests (userId,product,requestDate,requestType,issue) 
  VALUES (2,'charger','May 29th 2018, 5:11:58 am','repair','Does not charge my laptop anymore');
