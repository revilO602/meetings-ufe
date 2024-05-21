import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'meetings-list',
  styleUrl: 'meetings-list.css',
  shadow: true,
})
export class MeetingsList {
  meetings: any[];

  private async getMeetingsAsync() {
    return await Promise.resolve([
      {
        doctorName: 'Jožko Púčik',
        patientName: 'Jožko Púčik',
        date: new Date(Date.now()).toISOString(),
        startTime: new Date(Date.now() - 10 * 60).toISOString(),
        endTime: new Date(Date.now() + 65 * 60).toISOString(),
        symptoms: 'Kontrola',
        diagnosis: 'Kontrola',
        notes: 'Kontrola',
      },
      {
        doctorName: 'Jožko Púčik',
        patientName: 'Jožko Púčik',
        date: new Date(Date.now()).toISOString(),
        startTime: new Date(Date.now() - 10 * 60).toISOString(),
        endTime: new Date(Date.now() + 65 * 60).toISOString(),
        symptoms: 'Kontrola',
        diagnosis: 'Kontrola',
        notes: 'Kontrola',
      },
      {
        doctorName: 'Jožko Púčik',
        patientName: 'Jožko Púčik',
        date: new Date(Date.now()).toISOString(),
        startTime: new Date(Date.now() - 10 * 60).toISOString(),
        endTime: new Date(Date.now() + 65 * 60).toISOString(),
        symptoms: 'Kontrola',
        diagnosis: 'Kontrola',
        notes: 'Kontrola',
      },
    ]);
  }
  async componentWillLoad() {
    this.meetings = await this.getMeetingsAsync();
  }
  private isoDateToLocaleTime(iso: string) {
    if (!iso) return '';
    return new Date(Date.parse(iso)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  private isoDateToLocaleDate(iso: string) {
    if (!iso) return '';
    return new Date(Date.parse(iso)).toLocaleDateString();
  }
  render() {
    return (
      <Host>
        <md-list>
          {this.meetings.map(meeting => (
            <md-list-item>
              <div slot="headline">{'Doktor: ' + meeting.doctorName}</div>
              <div slot="headline">{'Pacient: ' + meeting.patientName}</div>
              <div slot="supporting-text">
                {this.isoDateToLocaleDate(meeting.date) + ' ' + this.isoDateToLocaleTime(meeting.startTime) + ' - ' + this.isoDateToLocaleTime(meeting.endTime)}
              </div>
              <md-icon slot="start">contact_phone</md-icon>
            </md-list-item>
          ))}
        </md-list>
      </Host>
    );
  }
}
