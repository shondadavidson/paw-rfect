select * from users
where zip = ${zip} and 
(provider_walker = 'defaultChecked' or provider_sitter = 'defaultChecked' or provider_boarder = 'defaultChecked')