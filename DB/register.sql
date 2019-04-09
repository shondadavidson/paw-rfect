insert into users (email, password)
values (${email}, ${password})

returning id, email