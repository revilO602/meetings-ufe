import { newSpecPage } from '@stencil/core/testing';
import { MeetingsCreator } from '../meetings-creator';

describe('meetings-creator', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MeetingsCreator],
      html: `<meetings-creator></meetings-creator>`,
    });
    expect(page).toEqual(page);
  });
});
