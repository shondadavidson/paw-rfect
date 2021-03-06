
update walk
set end_time = now()
where walk_id = ${walk_id};

select walk_id, provider_id, owner_id, name as owner_name from walk
join users on id = walk.owner_id
where 
provider_id = ${provider_id} and
end_time is null;