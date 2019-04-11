select users.name, user_auth.id, user_auth.email, user_auth.password
from user_auth
join users on  user_auth.id = users.id
where user_auth.email = ${email}
