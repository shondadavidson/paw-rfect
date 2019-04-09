with first_insert as (
insert into user_auth (email, password)
VALUES (${email}, ${password})
RETURNING id
)

insert into users (id, name) 
values((select id from first_insert), ${name})
RETURNING id, name ;