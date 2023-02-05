export class MoviesNotFoundException extends Error {
  constructor() {
    super('Movies not found');
  }
}

export class TimelinesNotFoundException extends Error {
  constructor() {
    super('Timelines not found');
  }
}
