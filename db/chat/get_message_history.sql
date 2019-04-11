select user_name, message
from chat
where room = ${room}
order by chat_id asc;