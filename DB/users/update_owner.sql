UPDATE users
SET name = ${name}, picture = ${picture}, zip = ${zip}, short_desc = ${short_desc}
WHERE id = ${id};