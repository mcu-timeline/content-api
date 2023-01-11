export class MoviesNotFoundException extends Error {
  constructor() {
    super('Movies not found');
  }
}
