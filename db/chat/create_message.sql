insert into chat (room, message, user_name, author_id, date_time)
values (${room}, ${message}, ${user_name}, ${author_id}, NOW() );

insert into chat_rooms  (user_id, room, receiver_id)
select ${user_id}, ${room}, ${provider_id}
where not exists (
select user_id from chat_rooms WHERE user_id = ${user_id} and room = ${room} and receiver_id = ${provider_id});

insert into chat_rooms  (user_id, room, receiver_id)
select ${provider_id}, ${room}, ${user_id}
where not exists (
select user_id from chat_rooms WHERE user_id = ${provider_id} and room = ${room} and receiver_id = ${user_id});

update chat_rooms 
set date_time = now(),
message = ${message},
author_id = ${author_id}
where room = ${room};