UPDATE users
SET name = ${name}, picture = ${picture}, zip = ${zip}, owner_desc = ${owner_desc}
WHERE id = ${id}
RETURNING * ;