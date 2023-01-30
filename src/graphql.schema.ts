/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface IQuery {
  timeline(
    currentlyWatching?: Nullable<string>,
  ): Nullable<Nullable<Movie>[]> | Promise<Nullable<Nullable<Movie>[]>>;
}

export interface Movie {
  id: string;
  title: string;
  duration: string;
  tags: string[];
  image: string;
  imageHero: string;
  imageCenter: Nullable<number>;
  description: string;
  note: string;
  characters: Character[];
}

export interface Character {
  name: string;
  image: string;
}

type Nullable<T> = T | null;
