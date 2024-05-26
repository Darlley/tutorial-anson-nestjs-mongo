import { IsMongoIdValidGuard } from './is-mongo-id-valid.guard';

describe('IsMongoIdValidGuard', () => {
  it('should be defined', () => {
    expect(new IsMongoIdValidGuard()).toBeDefined();
  });
});
