import { newSpecPage } from '@stencil/core/testing';
import { MeetingsApp } from '../meetings-app';

describe('meetings-app', () => {
  it('renders editor', async () => {
    const page = await newSpecPage({
      url: `http://localhost/create`,
      components: [MeetingsApp],
      html: `<meetings-app base-path="/"></meetings-app>`,
    });
    page.win.navigation = new EventTarget();
    const child = page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLocaleLowerCase()).toEqual('meetings-creator');
  });

  it('renders list', async () => {
    const page = await newSpecPage({
      url: `http://localhost/meetings/`,
      components: [MeetingsApp],
      html: `<meetings-app base-path="/ambulance-wl/"></meetings-app>`,
    });
    page.win.navigation = new EventTarget();
    const child = await page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLocaleLowerCase()).toEqual('meetings-list');
  });
});
