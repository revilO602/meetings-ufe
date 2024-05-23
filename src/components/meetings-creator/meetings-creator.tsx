import { Component, Host, h, EventEmitter, Event } from '@stencil/core';

@Component({
  tag: 'meetings-creator',
  styleUrl: 'meetings-creator.css',
  shadow: true,
})
export class MeetingsCreator {
  @Event({ eventName: 'creator-closed' }) creatorClosed: EventEmitter<string>;
  @Event({ eventName: 'cancel-clicked' }) cancelClicked: EventEmitter<string>;

  render() {
    return (
      <Host>
        <h2>Vytvoriť online stretnutie</h2>
        <div class="meeting-form">
          <div class="form-row">
            <md-outlined-text-field class="form-half-item" type="date" label="Dátum stretnutia">
              <md-icon slot="leading-icon">event</md-icon>
            </md-outlined-text-field>
          </div>

          <div class="form-row">
            <md-outlined-text-field class="form-half-item" type="time" label="Začiatok stretnutia">
              <md-icon slot="leading-icon">schedule</md-icon>
            </md-outlined-text-field>
            <md-outlined-text-field class="form-half-item" type="time" label="Koniec stretnutia">
              <md-icon slot="leading-icon">schedule</md-icon>
            </md-outlined-text-field>
          </div>
          <div class="form-row">
            <md-outlined-text-field class="form-half-item" label="Meno doktora">
              <md-icon slot="leading-icon">stethoscope</md-icon>
            </md-outlined-text-field>
            <md-outlined-text-field class="form-half-item" label="Meno pacienta">
              <md-icon slot="leading-icon">personal_injury</md-icon>
            </md-outlined-text-field>
          </div>

          <div class="form-row">
            <div class="platforms">
              <h4>Vyberte platformu</h4>
              <div class="radio-item">
                <md-radio id="google_meets_radio" name="platforms" value="google_meets"></md-radio>
                <label class="label" htmlFor="google_meet_radio">
                  Google Meets
                </label>
              </div>
              <div class="radio-item">
                <md-radio id="ms_teams_radio" name="platforms" value="ms_teams"></md-radio>
                <label class="label" htmlFor="ms_teams_radio">
                  MS Teams
                </label>
              </div>
              <div class="radio-item">
                <md-radio id="skype_radio" name="platforms" value="skype"></md-radio>
                <label class="label" htmlFor="skype_radio">
                  Skype
                </label>
              </div>
            </div>

            <label>
              <h4>Je toto stretnutie dôležité?</h4>
              <div class="switch-container">
                <h4>Nie</h4>
                <md-switch icons></md-switch>
                <h4>Áno</h4>
              </div>
            </label>
          </div>

          <div class="gap"></div>

          <md-outlined-text-field class="form-row" type="textarea" rows="3" label="Symptómy">
            <md-icon slot="leading-icon">sick</md-icon>
          </md-outlined-text-field>

          <md-outlined-text-field class="form-row" type="textarea" rows="3" label="Diagnóza">
            <md-icon slot="leading-icon">ecg_heart</md-icon>
          </md-outlined-text-field>

          <md-outlined-text-field class="form-row" type="textarea" rows="3" label="Poznámky">
            <md-icon slot="leading-icon">clinical_notes</md-icon>
          </md-outlined-text-field>
        </div>
        <md-divider></md-divider>
        <div class="actions">
          <md-outlined-button id="cancel" onClick={() => this.cancelClicked.emit('cancel')}>
            Zrušiť
          </md-outlined-button>
          <md-filled-button id="confirm" onClick={() => this.creatorClosed.emit('store')}>
            <md-icon slot="icon">save</md-icon>
            Uložiť
          </md-filled-button>
        </div>
      </Host>
    );
  }
}
