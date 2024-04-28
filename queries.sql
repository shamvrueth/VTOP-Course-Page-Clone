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

