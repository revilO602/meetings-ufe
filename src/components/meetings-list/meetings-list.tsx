import { Component, Event, EventEmitter, Host, h } from '@stencil/core';

@Component({
  tag: 'meetings-list',
  styleUrl: 'meetings-list.css',
  shadow: true,
})
export class MeetingsList {
  @Event({ eventName: 'entry-clicked' }) entryClicked: EventEmitter<string>;
  @Event({ eventName: 'creator-clicked' }) creatorClicked: EventEmitter<string>;
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
        <h2>Zoznam online stretnutí</h2>
        <md-list class="list">
          {this.meetings.map((meeting, index) => (
            <md-list-item class="item" onClick={() => this.entryClicked.emit(index.toString())}>
              <md-ripple></md-ripple>
              <div class="content">
                <div class="content-colum">
                  <div slot="headline">
                    <strong>Dátum: </strong>
                    {this.isoDateToLocaleDate(meeting.date)}
                  </div>
                  <div slot="headline">
                    <strong>Čas: </strong>
                    {this.isoDateToLocaleTime(meeting.startTime) + ' - ' + this.isoDateToLocaleTime(meeting.endTime)}
                  </div>
                </div>
                <div class="content-colum">
                  <div slot="headline">
                    <strong>Doktor: </strong>
                    {meeting.doctorName}
                  </div>
                  <div slot="headline">
                    <strong>Pacient: </strong>
                    {meeting.patientName}
                  </div>
                </div>
              </div>
              <md-icon slot="start">contact_phone</md-icon>
            </md-list-item>
          ))}
        </md-list>
        <md-filled-icon-button class="add-button" onclick={() => this.creatorClicked.emit('open')}>
          <md-icon>add</md-icon>
        </md-filled-icon-button>
      </Host>
    );
  }
}
