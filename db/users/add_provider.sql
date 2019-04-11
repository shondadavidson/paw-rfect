insert into owner_client (owner_id, provider_id, client_request)
select ${owner_id}, ${provider_id}, 'approved'
where not exists (Select * from owner_client where owner_id = ${owner_id} and provider_id = ${provider_id});

select 
    (
        select row_to_json(u)
        from (
            select * from users
            where id = ${id}
        ) u
    ) as user,
    (
        select row_to_json(r)
        from (
            select * from owner_client
            where owner_id = ${owner_id} and
            provider_id = ${id}
        ) r
    ) as relation
from users 
where id = ${id};
