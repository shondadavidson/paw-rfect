insert into walk (provider_id, owner_id, start_time)
values (${provider_id}, ${owner_id}, now());

update users
set dogs_are_on_walk = true
where user_id = ${user_id};

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
        ) as dogs,
        -- (
        --     select json_agg(w)
        --     from (
        --         select *
        --         from walk
        --         where o.owner_id = walk.owner_id and walk.provider_id = ${provider_id} 
        --     ) w 
        -- ) as walks
        from users u
        where id = o.owner_id
    ) c 
) as clients
from owner_client as o
where provider_id = ${provider_id} and o.provider_approve = 'approved';