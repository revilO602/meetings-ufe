import { Component, Host, Prop, h, EventEmitter, Event } from '@stencil/core';

@Component({
  tag: 'meetings-detail',
  styleUrl: 'meetings-detail.css',
  shadow: true,
})
export class MeetingsDetail {
  meeting = {
    doctorName: 'Jožko Púčik',
    patientName: 'John Doe',
    date: new Date(Date.now()).toISOString(),
    startTime: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() + 65 * 60 * 1000).toISOString(),
    platform: 'ms_teams',
    important: true,
    symptoms: 'Persistent cough, mild fever, fatigue',
    diagnosis: 'Viral upper respiratory infection',
    notes: 'Patient advised to rest, stay hydrated, and take over-the-counter medications as needed. Follow-up in one week if symptoms persist or worsen.',
  };

  @Prop() entryId: string;

  @Event({ eventName: 'editor-clicked' }) editorClicked: EventEmitter<string>;
  @Event({ eventName: 'cancel-clicked' }) cancelClicked: EventEmitter<string>;

  private isoDateToLocaleTime(iso: string) {
    if (!iso) return '';
    return new Date(Date.parse(iso)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  private isoDateToLocaleDate(iso: string) {
    if (!iso) return '';
    return new Date(Date.parse(iso)).toLocaleDateString();
  }
  private platformToString(platform: string) {
    switch (platform) {
      case 'ms_teams':
        return 'MS Teams';
      case 'google_meets':
        return 'Google Meets';
      case 'skype':
        return 'Skype';
      default:
        return '';
    }
  }
  render() {
    return (
      <Host>
        <h2>Online stretnutie</h2>
        <div class="basic-info">
          {this.meeting.important ? (
            <p class="important">
              <md-icon slot="leading-icon">priority_high</md-icon>
              <em>Toto stretnutie je dôležité!</em>
            </p>
          ) : (
            <div></div>
          )}
          <p class="title">
            <md-icon slot="leading-icon">stethoscope</md-icon>
            <strong>Doktor:</strong> {this.meeting.doctorName}
          </p>
          <p class="title">
            <md-icon slot="leading-icon">personal_injury</md-icon>
            <strong>Pacient:</strong> {this.meeting.patientName}
          </p>
          <p class="title">
            <md-icon slot="leading-icon">schedule</md-icon>
            <strong>Dátum a čas:</strong>{' '}
            {this.isoDateToLocaleDate(this.meeting.date) + ' ' + this.isoDateToLocaleTime(this.meeting.startTime) + ' - ' + this.isoDateToLocaleTime(this.meeting.endTime)}
          </p>
          <p class="title">
            <md-icon slot="leading-icon">podium</md-icon>
            <strong>Platforma:</strong> {this.platformToString(this.meeting.platform)}
          </p>
        </div>
        <div class="basic-info">
          <p class="title">
            <md-icon slot="leading-icon">sick</md-icon>
            <strong>Symptómy:</strong>
          </p>
          <p>{this.meeting.symptoms}</p>
        </div>
        <div class="basic-info">
          <p class="title">
            <md-icon slot="leading-icon">ecg_heart</md-icon>
            <strong>Diagnóza:</strong>
          </p>
          <p>{this.meeting.diagnosis}</p>
        </div>
        <div class="basic-info">
          <p class="title">
            <md-icon slot="leading-icon">clinical_notes</md-icon>
            <strong>Poznámky:</strong>
          </p>
          <p>{this.meeting.notes}</p>
        </div>
        <md-divider></md-divider>
        <div class="actions">
          <md-outlined-button id="cancel" onClick={() => this.cancelClicked.emit('cancel')}>
            Zrušiť
          </md-outlined-button>
          <md-filled-button id="edit" onClick={() => this.editorClicked.emit(this.entryId)}>
            <md-icon slot="icon">edit</md-icon>
            Upraviť
          </md-filled-button>
        </div>
      </Host>
    );
  }
}
