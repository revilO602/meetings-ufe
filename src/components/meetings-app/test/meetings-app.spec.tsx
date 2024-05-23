import { newSpecPage } from '@stencil/core/testing';
import { MeetingsApp } from '../meetings-app';

describe('meetings-app', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MeetingsApp],
      html: `<meetings-app></meetings-app>`,
    });
    expect(1).toEqual(1);
  });
});
