export type DBMovie = {
  id: string;
  title: string;
  duration: string;
  tags: string;
  image: string;
  imageHero: string;
  imageCenter: number | null;
  description: string;
  note: string;
  characters: string[];
  charactersImages: string[];
};

export type DBTimeline = {
  id: string;
  name: string;
  description: string;
  image: string;
};
