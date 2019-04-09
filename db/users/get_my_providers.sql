select u.id, u.name, u.picture, u.zip, u.short_desc, u.bio, u.experience
from users u 
join owner_client o on o.provider_id = u.id 
where o.owner_id = ${owner_id} and o.provider_approve = 'approved'