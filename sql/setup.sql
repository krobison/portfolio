use kolten;

drop table if exists sites;
create table sites
( id int unsigned not null auto_increment primary key,
  name char(50) not null,
  start_date date not null,
  last_date date not null,
  url char(200) not null,
  description char(200)
);

drop table if exists apps;
create table apps
( id int unsigned not null auto_increment primary key,
  name char(50) not null,
  start_date date not null,
  last_date date not null,
  description char(200),
  genre char(200),
  apptype char(200)
);