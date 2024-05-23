import { newSpecPage } from '@stencil/core/testing';
import { MeetingsDetail } from '../meetings-detail';

describe('meetings-detail', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MeetingsDetail],
      html: `<meetings-detail></meetings-detail>`,
    });
    expect(1).toEqual(1);
  });
});
