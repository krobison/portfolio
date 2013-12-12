use kolten;

drop table if exists sites;
create table sites
( id int unsigned not null auto_increment primary key,
  name char(50) not null,
  start_date date not null,
  last_date datetime not null,
  url char(200) not null,
  description char(200)
);