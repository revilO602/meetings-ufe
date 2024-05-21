import { newSpecPage } from '@stencil/core/testing';
import { MeetingsList } from '../meetings-list';

describe('meetings-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MeetingsList],
      html: `<meetings-list></meetings-list>`,
    });
    const meetingsList = page.rootInstance as MeetingsList;
    const expectedMeetings = meetingsList?.meetings?.length;

    const items = page.root.shadowRoot.querySelectorAll('md-list-item');
    expect(items.length).toEqual(expectedMeetings);
  });
});
