export class InteractionError extends Error {
    constructor(message) {
      super(message);
      this.name = 'InteractionError';
    }
  }