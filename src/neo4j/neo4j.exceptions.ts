export class FailedToExecuteQueryException extends Error {
  constructor() {
    super('Failed to execute Neo4j query');
  }
}
