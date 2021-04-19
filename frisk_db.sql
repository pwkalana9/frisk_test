CREATE DATABASE frisk_db;
CREATE TABLE message_entry( 
	id SERIAL PRIMARY KEY,
	time_created timestamp NOT NULL, 
	name VARCHAR(30) NOT NULL, 
	email VARCHAR(100) NOT NULL,
	pin VARCHAR(4) NOT NULL,
	message VARCHAR(48) NOT NULL 
	);


