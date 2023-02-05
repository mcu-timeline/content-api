export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Character = {
  __typename?: 'Character';
  image: Scalars['String'];
  name: Scalars['String'];
};

export type Movie = {
  __typename?: 'Movie';
  characters: Array<Maybe<Character>>;
  description: Scalars['String'];
  duration: Scalars['String'];
  id: Scalars['String'];
  image: Scalars['String'];
  imageCenter?: Maybe<Scalars['Float']>;
  imageHero: Scalars['String'];
  note: Scalars['String'];
  tags: Array<Maybe<Scalars['String']>>;
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  timeline?: Maybe<Array<Maybe<Movie>>>;
  timelines?: Maybe<Array<Maybe<Timeline>>>;
};

export type QueryTimelineArgs = {
  currentlyWatching?: InputMaybe<Scalars['String']>;
  timeline: Scalars['String'];
};

export type Timeline = {
  __typename?: 'Timeline';
  description: Scalars['String'];
  id: Scalars['String'];
  image: Scalars['String'];
  name: Scalars['String'];
};
