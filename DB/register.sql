insert into users_auth (email, password)
values (${email}, ${password});
returning id;
insert into users (id, name)
values (${id}, ${name})

returning id, email