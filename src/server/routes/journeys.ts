import { Request, Response } from 'express';

import journeys from '../fixtures/journeys.json';

/**
 * A simple request handler example, returning the entire list of mocked journeys.
 */
export default (_req: Request, res: Response) => res.json(journeys);
