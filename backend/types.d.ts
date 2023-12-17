// This file used to extend the type definitions for the Express framework.

declare namespace Express {
    export interface Request {
        file?: Multer.File;
    }
}
