insert into app_user(user_name,password,full_name) values('admin','123','Phan Đình Hoàng');
insert into app_user(user_name,password,full_name) values('webadmin','123','Tran Thi Bich Ngoc');

insert into department(department_name,start_date) values('Humann Resource','2019-01-18');
insert into department(department_name,start_date) values('ICT','2018-02-18');
insert into department(department_name,start_date) values('Marketing','2020-06-18');
insert into department(department_name,start_date) values('Information Technology','2018-11-18');

insert into position(position_name) values('Cong nhan');
insert into position(position_name) values('Nhan vien van phong');

insert into employee(code,first_name,last_name,start_date,end_date,create_date,create_by,gender,dep_id,pos_id,is_deleted) values('CND1001','Tran Van','An','2015-01-01',getdate(),getdate(),1,1,1,1,0);
insert into employee(code,first_name,last_name,start_date,end_date,create_date,create_by,gender,dep_id,pos_id,is_deleted) values('CND1002','Le Thi','Binh','2016-01-01',getdate(),getdate(),2,0,1,1,0);
insert into employee(code,first_name,last_name,start_date,end_date,create_date,create_by,gender,dep_id,pos_id,is_deleted) values('NVD1001','Le Van','Huy','2017-01-01',getdate(),getdate(),2,1,1,2,0);
insert into employee(code,first_name,last_name,start_date,end_date,create_date,create_by,gender,dep_id,pos_id,is_deleted) values('CND2001','Phan Quoc','Hoang','2013-01-01',getdate(),getdate(),2,1,2,1,0);
insert into employee(code,first_name,last_name,start_date,end_date,create_date,create_by,gender,dep_id,pos_id,is_deleted) values('NVD2001','Tran Thi','Anh','2018-01-01',getdate(),getdate(),1,0,2,2,0);

insert into holiday(day_name,from_date,to_date,num_of_day_off,coefficient) values('Le 30/4','2020-04-30 00:01','2020-04-30 23:59',1,2)
insert into holiday(day_name,from_date,to_date,num_of_day_off,coefficient) values('Le 1/5','2020-05-01 00:01','2020-05-01 23:59',1,2)
insert into holiday(day_name,from_date,to_date,num_of_day_off,coefficient) values('Quoc Khanh Viet Nam','2020-09-02 00:01','2020-09-02 23:59',1,2)
