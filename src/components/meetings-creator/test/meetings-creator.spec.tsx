import { newSpecPage } from '@stencil/core/testing';
import { MeetingsCreator } from '../meetings-creator';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('meetings-creator', () => {
  let delay = async (miliseconds: number) =>
    await new Promise<void>(resolve => {
      setTimeout(() => resolve(), miliseconds);
    });

  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });
  afterEach(() => {
    mock.reset();
  });

  it('buttons shall be of different type', async () => {
    const page = await newSpecPage({
      components: [MeetingsCreator],
      html: `<meetings-creator api-base="http://sample.test/api"></meetings-creator>`,
    });
    await delay(300);
    await page.waitForChanges();
    let items: any = page.root.shadowRoot.querySelectorAll('md-filled-button');
    expect(items.length).toEqual(1);

    items = page.root.shadowRoot.querySelectorAll('md-outlined-button');
    expect(items.length).toEqual(1);
  });

  it('first text field is date', async () => {
    const page = await newSpecPage({
      components: [MeetingsCreator],
      html: `<meetings-creator api-base="http://sample.test/api"></meetings-creator>`,
    });
    let items: any = await page.root.shadowRoot.querySelectorAll('md-outlined-text-field');

    await delay(300);
    await page.waitForChanges();

    expect(items.length).toBeGreaterThanOrEqual(1);
    expect(items[0].getAttribute('value')).toEqual(new Date().toLocaleDateString('en-CA'));
  });

  it('renders', async () => {
    const page = await newSpecPage({
      components: [MeetingsCreator],
      html: `<meetings-creator></meetings-creator>`,
    });
    expect(page).toEqual(page);
  });
});
