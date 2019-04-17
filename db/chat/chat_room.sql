insert into chat_rooms  (user_id, room_id)
select ${user_id}, ${room_id}
where not exists (
select user_id from chat_rooms WHERE user_id = ${user_id});

insert into chat_rooms  (user_id, room_id)
select ${provider_id}, ${room_id}
where not exists (
select user_id from chat_rooms WHERE user_id = ${provider_id});

update chat_rooms 
set date_time = now()
where chat_room = ${room_id};
