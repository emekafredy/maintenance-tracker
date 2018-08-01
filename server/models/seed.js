import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const adminPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10);
const userPassword = bcrypt.hashSync(process.env.USER_PASSWORD, 10);

const seedAdmin = `
  INSERT INTO users (firstName,lastName,email,password,isAdmin) 
    VALUES ('Emeka', 'Chinedu','emekaadmin@gmail.com','${adminPassword}', true);
`;
const seedUser = `
  INSERT INTO users (firstName,lastName,email,password) 
    VALUES ('Tomiwa','Olaniyi','tomiwa0456@gmail.com','${userPassword}');
`;

const seedRequests = `
  INSERT INTO requests (userId,product,requestDate,requestType,issue,imageUrl) 
  VALUES (2,'laptop','May 29th 2018, 5:11:58 am','repair','It shuts down on its own',
          'http://res.cloudinary.com/dgbmeqmyf/image/upload/v1528128949/My_Post.jpg');
  INSERT INTO requests (userId,product,requestDate,requestType,issue,imageUrl) 
  VALUES (2,'headphone','May 29th 2018, 5:11:58 am','replace','The speaker is bad',
          'http://res.cloudinary.com/dgbmeqmyf/image/upload/v1528128949/My_Post.jpg');
  INSERT INTO requests (userId,product,requestDate,requestType,issue,imageUrl) 
  VALUES (2,'monitor','May 29th 2018, 5:11:58 am','repair','Broken screen',
          'http://res.cloudinary.com/dgbmeqmyf/image/upload/v1528128949/My_Post.jpg');
  INSERT INTO requests (userId,product,requestDate,requestType,issue,imageUrl) 
  VALUES (2,'charger','May 29th 2018, 5:11:58 am','repair','Does not charge my laptop anymore',
          'http://res.cloudinary.com/dgbmeqmyf/image/upload/v1528128949/My_Post.jpg');
`;
const query = `${seedAdmin} ${seedUser} ${seedRequests}`;

export default query;
