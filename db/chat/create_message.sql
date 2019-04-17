insert into chat (room, message, user_name, author_id, date_time)
values (${room}, ${message}, ${user_name}, ${author_id}, NOW() );

insert into chat_rooms  (user_id, room)
select ${user_id}, ${room}
where not exists (
select user_id from chat_rooms WHERE user_id = ${user_id} and room = ${room});

insert into chat_rooms  (user_id, room)
select ${user_id}, ${room}
where not exists (
select user_id from chat_rooms WHERE user_id = ${provider_id} and room = ${room});

update chat_rooms 
set date_time = now(),
message = ${message},
author_id = ${author_id}
where room = ${room};