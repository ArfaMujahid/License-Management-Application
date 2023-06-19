create database LicenseManagementApp;
use LicenseManagementApp;
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  CNIC VARCHAR(13) NOT NULL CHECK (LENGTH(CNIC) = 13) UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(50) NOT NULL
);

INSERT INTO users (username,CNIC,email,password) VALUES ('Aurora','1234567890120','Aurora@gmail.com','123');
SELECT * FROM users;
drop table users;

Create table Officer(
id int primary key auto_increment,
username varchar(50) NOT NULL,
EmployeeID varchar(4) NOT NULL CHECK (LENGTH(EmployeeID) = 4),
password varchar(50) NOT NULL
);

SELECT * FROM Officer;
drop table form;
CREATE TABLE Form (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  FullName VARCHAR(50) NOT NULL,
  CNIC VARCHAR(13) NOT NULL,
  HeadName VARCHAR(255),
  Disabilities VARCHAR(255),
  MarriageStatus varchar(255),
  Education VARCHAR(255),
  FOREIGN KEY (CNIC) REFERENCES Users(CNIC)
);

ALTER TABLE Form
ADD Accepted BOOLEAN DEFAULT false;

select * from audit;
select * from Form;
drop table Form;

select * from USers;


create table Audit(
CNIC VARCHAR(13) NOT NULL CHECK (LENGTH(CNIC) = 13),
fullname varchar(255),
headname varchar(255),
criminalRecord varchar(255),
BirthPlace varchar(255),
dateofbirth date,
Accepted BOOLEAN default false
);

insert into Audit(CNIC, fullname, headname, criminalRecord, BirthPlace, dateofbirth)
VALUES('1234567890111','James Dean','Dean','none','Lahore','1992-01-07');


insert into test(CNIC,testdate,status,drivingteststatus,writtenteststatus,oralteststatus,EmployeeID) 
values('1234567890111', '2023-05-06','pending', 'pending', 'pending', 'pending','1985');

drop table Audit;
SELECT * FROM Audit;
SELECT * FROM Audit WHERE CNIC IN (SELECT CNIC FROM Form WHERE Accepted = true);


insert into audit(cnic,fullname,headname,criminalRecord,BirthPlace,dateofbirth) 
values('1234567890124','James Deam','Deam','none','Lahore','1987-02-12');

ALTER TABLE Officer ADD INDEX (EmployeeID);
drop table Tests;
CREATE TABLE Tests (
  testid INT AUTO_INCREMENT,
  CNIC VARCHAR(13) NOT NULL,
  testdate DATE,
  status VARCHAR(255),
  drivingteststatus varchar(255),
  writtenteststatus varchar(255),
  oralteststatus varchar(255),
  EmployeeID VARCHAR(4) CHECK (LENGTH(EmployeeID) = 4),
  PRIMARY KEY (testid),
  FOREIGN KEY (CNIC) REFERENCES Users(CNIC),
  FOREIGN KEY (EmployeeID) REFERENCES Officer(EmployeeID),
  INDEX (EmployeeID)
);

drop table tests;
SELECT * FROM Form WHERE Accepted = false;
insert into Tests(CNIC,testdate,status,drivingteststatus,writtenteststatus,oralteststatus,EmployeeID)
VALUES('1234567890111','2023-05-07','pending','pending','pending','pending','1287');

SELECT * FROM Tests;

use licensemanegementapp;
drop table form;
drop table Tests;
select * from audit;
select * from users;