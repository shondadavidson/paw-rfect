UPDATE users
SET name=${name}, zip=${zip}, picture=${picture}, short_desc=${short_desc}, bio=${bio}, experience=${experience}, provider_walker=${provider_walker}, provider_sitter=${provider_sitter}, provider_boarder=${provider_boarder}
WHERE id = ${id}
RETURNING * ;