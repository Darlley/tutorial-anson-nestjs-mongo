import { SetMetadata } from '@nestjs/common';

export const IsMongoIdValid = (...args: string[]) => SetMetadata('is-mongo-id-valid', args);
