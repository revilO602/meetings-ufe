import { Component, Host, Prop, h, EventEmitter, Event, State } from '@stencil/core';
import { MeetingsListApiFactory, MeetingsListEntry } from '../../api/meetings';

@Component({
  tag: 'meetings-detail',
  styleUrl: 'meetings-detail.css',
  shadow: true,
})
export class MeetingsDetail {
  @Prop() entryId: string;
  @Prop() apiBase: string;

  @State() meeting: MeetingsListEntry;
  @State() errorMessage: string;

  @Event({ eventName: 'editor-clicked' }) editorClicked: EventEmitter<string>;
  @Event({ eventName: 'cancel-clicked' }) cancelClicked: EventEmitter<string>;

  private async getMeetingAsync(): Promise<MeetingsListEntry> {
    try {
      const response = await MeetingsListApiFactory(undefined, this.apiBase).getMeeting(this.entryId);

      if (response.status < 299) {
        this.meeting = response.data;
      } else {
        this.errorMessage = `Cannot retrieve meeting: ${response.statusText}`;
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve meeting: ${err.message || 'unknown'}`;
    }
    return undefined;
  }

  async componentWillLoad() {
    this.getMeetingAsync();
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
    if (this.errorMessage) {
      return (
        <Host>
          <div class="error">{this.errorMessage}</div>
        </Host>
      );
    }
    return (
      <Host>
        <h2>Online stretnutie</h2>
        <div class="basic-info">
          {this.meeting?.important ? (
            <p class="important">
              <md-icon slot="leading-icon">priority_high</md-icon>
              <em>Toto stretnutie je dôležité!</em>
            </p>
          ) : (
            <div></div>
          )}
          <p class="title">
            <md-icon slot="leading-icon">stethoscope</md-icon>
            <strong>Doktor:</strong> {this.meeting?.doctorName}
          </p>
          <p class="title">
            <md-icon slot="leading-icon">personal_injury</md-icon>
            <strong>Pacient:</strong> {this.meeting?.patientName}
          </p>
          <p class="title">
            <md-icon slot="leading-icon">schedule</md-icon>
            <strong>Dátum a čas:</strong> {this.isoDateToLocaleDate(this.meeting?.date) + ' ' + this.meeting?.startTime + ' - ' + this.meeting?.endTime}
          </p>
          <p class="title">
            <md-icon slot="leading-icon">podium</md-icon>
            <strong>Platforma:</strong> {this.platformToString(this.meeting?.platform)}
          </p>
        </div>
        <div class="basic-info">
          <p class="title">
            <md-icon slot="leading-icon">sick</md-icon>
            <strong>Symptómy:</strong>
          </p>
          <p>{this.meeting?.symptoms}</p>
        </div>
        <div class="basic-info">
          <p class="title">
            <md-icon slot="leading-icon">ecg_heart</md-icon>
            <strong>Diagnóza:</strong>
          </p>
          <p>{this.meeting?.diagnosis}</p>
        </div>
        <div class="basic-info">
          <p class="title">
            <md-icon slot="leading-icon">clinical_notes</md-icon>
            <strong>Poznámky:</strong>
          </p>
          <p>{this.meeting?.notes}</p>
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
