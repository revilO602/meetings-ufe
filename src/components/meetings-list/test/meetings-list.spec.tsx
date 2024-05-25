import { newSpecPage } from '@stencil/core/testing';
import { MeetingsList } from '../meetings-list';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MeetingsListEntry } from '../../../api/meetings';

describe('meetings-list', () => {
  const sampleEntries: MeetingsListEntry[] = [
    {
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
    },
    {
      id: 'entry-2',
      doctorName: 'Dr. Jozef Mrkva',
      patientName: 'Juraj Druhy',
      date: '2038-02-02',
      startTime: '03:45',
      endTime: '04:45',
      important: true,
      platform: 'ms_teams',
      symptoms: 'deded',
      diagnosis: 'deededed',
      notes: 'ddedee',
    },
  ];

  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });
  afterEach(() => {
    mock.reset();
  });

  it('renders sample entries', async () => {
    // simulate API response using sampleEntries
    mock.onGet().reply(200, sampleEntries);
    const page = await newSpecPage({
      components: [MeetingsList],
      html: `<meetings-list api-base="http://test/api"></meetings-list>`,
    });
    const meetingsList = page.rootInstance as MeetingsList;
    const expectedMeetings = meetingsList?.meetings?.length;

    const items = page.root.shadowRoot.querySelectorAll('md-list-item');
    expect(expectedMeetings).toEqual(sampleEntries.length);
    expect(items.length).toEqual(expectedMeetings);
  });

  it('renders error message on network issues', async () => {
    mock.onGet().networkError();
    const page = await newSpecPage({
      components: [MeetingsList], //
      html: `<meetings-list api-base="http://test/api"></meetings-list>`,
    });

    const meetingsList = page.rootInstance as MeetingsList;
    const expectedMeetings = meetingsList?.meetings?.length;

    const errorMessage = page.root.shadowRoot.querySelectorAll('.error');
    const items = page.root.shadowRoot.querySelectorAll('md-list-item');

    expect(errorMessage.length).toBeGreaterThanOrEqual(1);
    expect(expectedMeetings).toEqual(0);
    expect(items.length).toEqual(expectedMeetings);
  });
});
