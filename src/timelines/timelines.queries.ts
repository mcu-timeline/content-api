export const GET_MOVIES_BY_ID = `
MATCH sequence=(current:Movie {id: $id})<-[:WATCH_NEXT*1..3{timeline: $timeline}]-(prev:Movie)
CALL {
  WITH prev
  MATCH (prev)<-[:APPEARS]-(c:Character)
  RETURN
    prev.id as id,
    prev.title as title,
    prev.duration as duration,
    prev.tags as tags,
    prev.image as image,
    prev.imageHero as imageHero,
    prev.imageCenter as imageCenter,
    prev.description as description,
    prev.note as note,
    collect(c.name) as characters,
    collect(c.image) as charactersImages
}
RETURN id, title, duration, tags, image, imageHero, imageCenter, description, note, characters, charactersImages
ORDER BY length(sequence) DESC
UNION
MATCH (current:Movie {id: $id})<-[:APPEARS]-(c:Character)
RETURN
  current.id as id,
  current.title as title,
  current.duration as duration,
  current.tags as tags,
  current.image as image,
  current.imageHero as imageHero,
  current.imageCenter as imageCenter,
  current.description as description,
  current.note as note,
  collect(c.name) as characters,
  collect(c.image) as charactersImages
UNION
MATCH sequence=(current:Movie {id: $id})-[:WATCH_NEXT*1..3{timeline: $timeline}]->(next:Movie)
CALL {
  WITH next
  MATCH (next)<-[:APPEARS]-(c:Character)
  RETURN
    next.id as id,
    next.title as title,
    next.duration as duration,
    next.tags as tags,
    next.image as image,
    next.imageHero as imageHero,
    next.imageCenter as imageCenter,
    next.description as description,
    next.note as note,
    collect(c.name) as characters,
    collect(c.image) as charactersImages
}
RETURN id, title, duration, tags, image, imageHero, imageCenter, description, note, characters, charactersImages
ORDER BY length(sequence) ASC
`;

export const GET_FIRST_MOVIES = `
MATCH (c:Character)-[:APPEARS]->(current:Movie)-[:WATCH_NEXT{timeline: $timeline}]->(:Movie)
WHERE NOT (:Movie)-[:WATCH_NEXT{timeline: $timeline}]->(current)
RETURN
    current.id as id,
    current.title as title,
    current.duration as duration,
    current.tags as tags,
    current.image as image,
    current.imageHero as imageHero,
    current.imageCenter as imageCenter,
    current.description as description,
    current.note as note,
    collect(c.name) as characters,
    collect(c.image) as charactersImages
UNION
MATCH sequence=(current:Movie)-[:WATCH_NEXT*1..3{timeline: $timeline}]->(next:Movie)
WHERE NOT (:Movie)-[:WATCH_NEXT{timeline: $timeline}]->(current)
CALL {
    WITH next
    MATCH (next)<-[:APPEARS]-(c:Character)
    RETURN
        next.id as id,
        next.title as title,
        next.duration as duration,
        next.tags as tags,
        next.image as image,
        next.imageHero as imageHero,
        next.imageCenter as imageCenter,
        next.description as description,
        next.note as note,
        collect(c.name) as characters,
        collect(c.image) as charactersImages
}
RETURN id, title, duration, tags, image, imageHero, imageCenter, description, note, characters, charactersImages
ORDER BY length(sequence) ASC
`;
