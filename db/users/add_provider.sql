insert into owner_client (owner_id, provider_id, client_request)
select ${owner_id}, ${provider_id}, 'approved'
where not exists (Select * from owner_client where owner_id = ${owner_id} and provider_id = ${provider_id});

select * 
from users u
join owner_client o on o.provider_id = u.id
where u.id = ${provider_id} and o.owner_id = ${owner_id} and o.provider_id = ${provider_id};
