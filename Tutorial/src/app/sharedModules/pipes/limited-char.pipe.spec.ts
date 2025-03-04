import { LimitedCharPipe } from './limited-char.pipe';

describe('LimitedCharPipe', () => {
  it('create an instance', () => {
    const pipe = new LimitedCharPipe();
    expect(pipe).toBeTruthy();
  });
});
