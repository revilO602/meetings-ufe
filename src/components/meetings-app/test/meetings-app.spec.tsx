import { newSpecPage } from '@stencil/core/testing';
import { MeetingsApp } from '../meetings-app';

describe('meetings-app', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MeetingsApp],
      html: `<meetings-app></meetings-app>`,
    });
    expect(page.root).toEqualHtml(`
      <meetings-app>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </meetings-app>
    `);
  });
});
