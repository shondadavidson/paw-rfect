update owner_client
set provider_approve = 'deny'
where owner_id = ${owner_id} and provider_id = ${provider_id};
