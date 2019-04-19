select count(*) from owner_client
where provider_id = ${provider_id} and provider_approve = 'pending'