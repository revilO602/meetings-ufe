import { newSpecPage } from '@stencil/core/testing';
import { MeetingsEditor } from '../meetings-editor';

describe('meetings-editor', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MeetingsEditor],
      html: `<meetings-editor></meetings-editor>`,
    });
    expect(page).toEqual(page);
  });
});
