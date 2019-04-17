update chat_rooms
set read = now()
where room = ${room};

select c.user_id, c.room, c.date_time, c.message, c.author_id, c.read, c.receiver_id, u.name as receiver_name, u.picture 
from chat_rooms c
join users u on id = receiver_id
where user_id = ${user_id}
order by c.date_time asc;