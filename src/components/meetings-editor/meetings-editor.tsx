import { Component, Host, Prop, h, EventEmitter, Event } from '@stencil/core';
@Component({
  tag: 'meetings-editor',
  styleUrl: 'meetings-editor.css',
  shadow: true,
})
export class MeetingsEditor {
  @Prop() entryId: string;

  @Event({ eventName: 'editor-closed' }) editorClosed: EventEmitter<string>;
  @Event({ eventName: 'cancel-clicked' }) cancelClicked: EventEmitter<string>;

  meeting = {
    doctorName: 'Jožko Púčik',
    patientName: 'John Doe',
    date: new Date(Date.now()).toISOString(),
    startTime: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() + 65 * 60 * 1000).toISOString(),
    platform: 'ms_teams',
    important: false,
    symptoms: 'Persistent cough, mild fever, fatigue',
    diagnosis: 'Viral upper respiratory infection',
    notes: 'Patient advised to rest, stay hydrated, and take over-the-counter medications as needed. Follow-up in one week if symptoms persist or worsen.',
  };

  private isoDateToLocaleTime(iso: string) {
    if (!iso) return '';
    return new Date(Date.parse(iso)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  private isoToDate(iso: string) {
    if (!iso) return '';
    return iso.split('T')[0];
  }

  render() {
    return (
      <Host>
        <h2>Upraviť online stretnutie</h2>
        <div class="meeting-form">
          <div class="form-row">
            <md-outlined-text-field class="form-half-item" type="date" label="Dátum stretnutia" value={this.isoToDate(this.meeting.date)}>
              <md-icon slot="leading-icon">event</md-icon>
            </md-outlined-text-field>
          </div>

          <div class="form-row">
            <md-outlined-text-field class="form-half-item" type="time" label="Začiatok stretnutia" value={this.isoDateToLocaleTime(this.meeting.startTime)}>
              <md-icon slot="leading-icon">schedule</md-icon>
            </md-outlined-text-field>
            <md-outlined-text-field class="form-half-item" type="time" label="Koniec stretnutia" value={this.isoDateToLocaleTime(this.meeting.endTime)}>
              <md-icon slot="leading-icon">schedule</md-icon>
            </md-outlined-text-field>
          </div>
          <div class="form-row">
            <md-outlined-text-field class="form-half-item" label="Meno doktora" value={this.meeting.doctorName}>
              <md-icon slot="leading-icon">stethoscope</md-icon>
            </md-outlined-text-field>
            <md-outlined-text-field class="form-half-item" label="Meno pacienta" value={this.meeting.patientName}>
              <md-icon slot="leading-icon">personal_injury</md-icon>
            </md-outlined-text-field>
          </div>

          <div class="form-row">
            <div class="platforms">
              <h4>Vyberte platformu</h4>
              <div class="radio-item">
                <md-radio id="google_meets_radio" name="platforms" value="google_meets" checked={this.meeting.platform == 'google_meets'}></md-radio>
                <label class="label" htmlFor="google_meet_radio">
                  Google Meets
                </label>
              </div>
              <div class="radio-item">
                <md-radio id="ms_teams_radio" name="platforms" value="ms_teams" checked={this.meeting.platform == 'ms_teams'}></md-radio>
                <label class="label" htmlFor="ms_teams_radio">
                  MS Teams
                </label>
              </div>
              <div class="radio-item">
                <md-radio id="skype_radio" name="platforms" value="skype" checked={this.meeting.platform == 'skype'}></md-radio>
                <label class="label" htmlFor="skype_radio">
                  Skype
                </label>
              </div>
            </div>

            <label>
              <h4>Je toto stretnutie dôležité?</h4>
              <div class="switch-container">
                <h4>Nie</h4>
                <md-switch icons selected={this.meeting.important}></md-switch>
                <h4>Áno</h4>
              </div>
            </label>
          </div>

          <div class="gap"></div>

          <md-outlined-text-field class="form-row" type="textarea" rows="3" label="Symptómy" value={this.meeting.symptoms}>
            <md-icon slot="leading-icon">sick</md-icon>
          </md-outlined-text-field>

          <md-outlined-text-field class="form-row" type="textarea" rows="3" label="Diagnóza" value={this.meeting.diagnosis}>
            <md-icon slot="leading-icon">ecg_heart</md-icon>
          </md-outlined-text-field>

          <md-outlined-text-field class="form-row" type="textarea" rows="3" label="Poznámky" value={this.meeting.notes}>
            <md-icon slot="leading-icon">clinical_notes</md-icon>
          </md-outlined-text-field>
        </div>
        <md-divider></md-divider>
        <div class="actions">
          <md-filled-tonal-button id="delete" onClick={() => this.editorClosed.emit('delete')}>
            <md-icon slot="icon">delete</md-icon>
            Zmazať
          </md-filled-tonal-button>
          <span class="stretch-fill"></span>
          <md-outlined-button id="cancel" onClick={() => this.cancelClicked.emit('cancel')}>
            Zrušiť
          </md-outlined-button>
          <md-filled-button id="confirm" onClick={() => this.editorClosed.emit('store')}>
            <md-icon slot="icon">save</md-icon>
            Uložiť
          </md-filled-button>
        </div>
      </Host>
    );
  }
}
