SELECT name, zip, short_desc, picture, bio, experience, provider_walker, provider_sitter, provider_boarder
FROM users
WHERE id = ${id};