# Content API

We store movies in a graph database called [neo4j]()https://neo4j.com/. We picked this kind of database because it perfectly suited for our case.

Our data model looks the following way:

We have  a `movie` entity with various properties like:

- id

- title

- duration

- image_url

All the movie entities are related to each other through watch next relation.
It would very cumbersome to implement and later query it in the relational or document database. So the graph database was a no-brainer.

We used Nest to implement the service.
