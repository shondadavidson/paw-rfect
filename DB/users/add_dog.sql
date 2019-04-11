INSERT INTO dog (dog_name, dog_age, dog_picture, breed, weight, dog_gender, special_notes, owner_id)
VALUES (${dog_name}, ${dog_age}, ${dog_picture}, ${breed}, ${weight}, ${dog_gender}, ${special_notes}, ${owner_id});
SELECT *
FROM dog
WHERE owner_id = ${owner_id};
