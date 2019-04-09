select *
from users u 
join owner_client o on o.provider_id = u.id 
where o.owner_id = ${owner_id} and o.provider_approve = 'approved'