select count(*) from chat_rooms
where read is null and user_id = ${user_id}