import { newSpecPage } from '@stencil/core/testing';
import { MeetingsList } from '../meetings-list';

describe('meetings-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MeetingsList],
      html: `<meetings-list></meetings-list>`,
    });
    expect(page.root).toEqualHtml(`
      <meetings-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </meetings-list>
    `);
  });
});
