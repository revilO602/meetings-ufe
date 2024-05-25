import { newSpecPage } from '@stencil/core/testing';
import { MeetingsEditor } from '../meetings-editor';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MeetingsListEntry } from '../../../api/meetings';

describe('meetings-editor', () => {
  const sampleEntry: MeetingsListEntry = {
    id: 'entry-1',
    doctorName: 'Dr. Jozef Mrkva',
    patientName: 'Juraj Prvý',
    date: '2038-02-02',
    startTime: '03:45',
    endTime: '04:45',
    important: false,
    platform: 'ms_teams',
    symptoms: 'deded',
    diagnosis: 'deededed',
    notes: 'ddedee',
  };

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
    mock.onGet(/^.*\/meetings\/.+/).reply(200, sampleEntry);

    const page = await newSpecPage({
      components: [MeetingsEditor],
      html: `<meetings-editor entry-id="test-entry"
          ambulance-id="test-ambulance" api-base="http://sample.test/api">
       </meetings-editor>`,
    });
    await delay(300);
    await page.waitForChanges();
    let items: any = page.root.shadowRoot.querySelectorAll('md-filled-button');
    expect(items.length).toEqual(1);

    items = page.root.shadowRoot.querySelectorAll('md-filled-tonal-button');
    expect(items.length).toEqual(1);

    items = page.root.shadowRoot.querySelectorAll('md-outlined-button');
    expect(items.length).toEqual(1);
  });

  it('first text field is date', async () => {
    mock.onGet(/^.*\/meetings\/.+/).reply(200, sampleEntry);

    const page = await newSpecPage({
      components: [MeetingsEditor],
      html: `<meetings-editor entry-id="test-entry" ambulance-id="test-ambulance" api-base="http://sample.test/api"></meetings-editor>`,
    });
    let items: any = await page.root.shadowRoot.querySelectorAll('md-outlined-text-field');

    await delay(300);
    await page.waitForChanges();

    expect(items.length).toBeGreaterThanOrEqual(1);
    expect(items[0].getAttribute('value')).toEqual(sampleEntry.date);
  });

  it('renders', async () => {
    const page = await newSpecPage({
      components: [MeetingsEditor],
      html: `<meetings-editor></meetings-editor>`,
    });
    expect(page).toEqual(page);
  });
});
