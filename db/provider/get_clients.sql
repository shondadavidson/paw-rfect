select *, (
    select row_to_json(c)
    from (
        select *, (
            select coalesce(json_agg(d), '[]'::json)
            from (
                select *
                from dog
                where owner_id = u.id
            ) d
        ) as dogs
        from users u
        where id = o.owner_id
    ) c 
) as clients
from owner_client as o
where provider_id = ${provider_id} and o.provider_approve = 'approved';