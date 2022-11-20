
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface IQuery {
    timeline(currentlyWatching?: Nullable<string>): Nullable<Nullable<Movie>[]> | Promise<Nullable<Nullable<Movie>[]>>;
}

export interface Movie {
    id: string;
    name: string;
    duration: string;
}

type Nullable<T> = T | null;
