create table semester(
	id serial primary key,
	name varchar(100)
);

insert into semester(name) values('Fall semester 2023-24');

insert into semester(name) values('Winter semester 2023-24');

create table subject(
	id serial primary key,
	subject_name varchar(100),
	semester_name varchar(100)
);

insert into subject(subject_name, semester_name) values('Python programming','Fall semester 2023-24');
insert into subject(subject_name, semester_name) values('Engineering chemistry','Fall semester 2023-24');
insert into subject(subject_name, semester_name) values('Calculus','Fall semester 2023-24');

insert into subject(subject_name, semester_name) values('Structured and object oriented programming','Winter semester 2023-24');
insert into subject(subject_name, semester_name) values('Engineering physics','Winter semester 2023-24');
insert into subject(subject_name, semester_name) values('Differential equation','Winter semester 2023-24');

create table faculty(
	id serial primary key,
	subject_name varchar(100),
	slot varchar(15),
	faculty varchar(50)
);

insert into faculty(subject_name, slot, faculty) values('Structured and object oriented programming','C2','Sahil');
insert into faculty(subject_name, slot, faculty) values('Structured and object oriented programming','C1','Vedanth');

create table download(
	id serial primary key,
	lecture_topic text,
	reference text
);

ALTER TABLE download
ADD COLUMN faculty_name varchar(50);

insert into download(lecture_topic, reference, faculty_name) values('C programming','https://www.lpude.in/SLMs/Master%20of%20Computer%20Applications/Sem_1/DECAP010_PROGRAMMING_IN_C.pdf','Vedanth Prabhu');
