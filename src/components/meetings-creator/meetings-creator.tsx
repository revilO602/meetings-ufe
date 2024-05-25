import { Component, Host, h, EventEmitter, Event, Prop, State } from '@stencil/core';
import { MeetingsListApiFactory, NewMeeting } from '../../api/meetings';

@Component({
  tag: 'meetings-creator',
  styleUrl: 'meetings-creator.css',
  shadow: true,
})
export class MeetingsCreator {
  @Prop() apiBase: string;

  @Event({ eventName: 'creator-closed' }) creatorClosed: EventEmitter<string>;
  @Event({ eventName: 'cancel-clicked' }) cancelClicked: EventEmitter<string>;

  @State() entry: NewMeeting = {
    doctorName: '',
    patientName: '',
    date: new Date().toLocaleDateString('en-CA'),
    startTime: '',
    endTime: '',
    important: false,
    platform: 'google_meets',
    symptoms: '',
    diagnosis: '',
    notes: '',
  };
  @State() errorMessage: string;
  @State() isValid: boolean;

  private formElement: HTMLFormElement;

  private checkFormValidity(parent: Element) {
    // check validity of elements
    this.isValid = true;
    for (let i = 0; i < parent.children.length; i++) {
      const element = parent.children[i];
      this.checkFormValidity(element);
      if ('reportValidity' in element) {
        const valid = (element as HTMLInputElement).reportValidity();
        this.isValid &&= valid;
      }
    }
  }

  private handleInputEvent(ev: InputEvent): string {
    const target = ev.target as HTMLInputElement;
    return target.value;
  }

  private handleChangeEvent(ev: Event): string {
    const target = ev.target as HTMLInputElement;
    return target.value;
  }

  private async storeEntry() {
    this.checkFormValidity(this.formElement);
    if (this.isValid) {
      try {
        const response = await MeetingsListApiFactory(undefined, this.apiBase).createMeeting(this.entry);
        if (response.status < 299) {
          this.creatorClosed.emit('store');
        } else {
          this.errorMessage = `Cannot store entry: ${response.statusText}`;
        }
      } catch (err: any) {
        this.errorMessage = `Cannot store entry: ${err.message || 'unknown'}`;
      }
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
        <h2>Vytvoriť online stretnutie</h2>
        <form ref={el => (this.formElement = el)}>
          <div class="meeting-form">
            <div class="form-row">
              <md-outlined-text-field
                class="form-half-item"
                type="date"
                label="Dátum stretnutia"
                required
                value={this.entry?.date}
                oninput={(ev: InputEvent) => {
                  if (this.entry) {
                    this.entry.date = this.handleInputEvent(ev);
                  }
                }}
              >
                <md-icon slot="leading-icon">event</md-icon>
              </md-outlined-text-field>
            </div>

            <div class="form-row">
              <md-outlined-text-field
                class="form-half-item"
                type="time"
                label="Začiatok stretnutia"
                required
                value={this.entry?.startTime}
                oninput={(ev: InputEvent) => {
                  if (this.entry) {
                    this.entry.startTime = this.handleInputEvent(ev);
                  }
                }}
              >
                <md-icon slot="leading-icon">schedule</md-icon>
              </md-outlined-text-field>
              <md-outlined-text-field
                class="form-half-item"
                type="time"
                label="Koniec stretnutia"
                required
                value={this.entry?.endTime}
                oninput={(ev: InputEvent) => {
                  if (this.entry) {
                    this.entry.endTime = this.handleInputEvent(ev);
                  }
                }}
              >
                <md-icon slot="leading-icon">schedule</md-icon>
              </md-outlined-text-field>
            </div>
            <div class="form-row">
              <md-outlined-text-field
                class="form-half-item"
                label="Meno doktora"
                required
                value={this.entry?.doctorName}
                oninput={(ev: InputEvent) => {
                  if (this.entry) {
                    this.entry.doctorName = this.handleInputEvent(ev);
                  }
                }}
              >
                <md-icon slot="leading-icon">stethoscope</md-icon>
              </md-outlined-text-field>
              <md-outlined-text-field
                class="form-half-item"
                label="Meno pacienta"
                required
                value={this.entry?.patientName}
                oninput={(ev: InputEvent) => {
                  if (this.entry) {
                    this.entry.patientName = this.handleInputEvent(ev);
                  }
                }}
              >
                <md-icon slot="leading-icon">personal_injury</md-icon>
              </md-outlined-text-field>
            </div>

            <div class="form-row">
              <div class="platforms">
                <h4>Vyberte platformu</h4>
                <div class="radio-item">
                  <md-radio
                    id="google_meets_radio"
                    name="platforms"
                    value="google_meets"
                    checked={this.entry?.platform == 'google_meets'}
                    onchange={(ev: Event) => {
                      if (this.entry) {
                        this.entry.platform = this.handleChangeEvent(ev);
                      }
                    }}
                  ></md-radio>
                  <label class="label" htmlFor="google_meet_radio">
                    Google Meets
                  </label>
                </div>
                <div class="radio-item">
                  <md-radio
                    id="ms_teams_radio"
                    name="platforms"
                    value="ms_teams"
                    checked={this.entry?.platform == 'ms_teams'}
                    onchange={(ev: Event) => {
                      if (this.entry) {
                        this.entry.platform = this.handleChangeEvent(ev);
                      }
                    }}
                  ></md-radio>
                  <label class="label" htmlFor="ms_teams_radio">
                    MS Teams
                  </label>
                </div>
                <div class="radio-item">
                  <md-radio
                    id="skype_radio"
                    name="platforms"
                    value="skype"
                    checked={this.entry?.platform == 'skype'}
                    onchange={(ev: Event) => {
                      if (this.entry) {
                        this.entry.platform = this.handleChangeEvent(ev);
                      }
                    }}
                  ></md-radio>
                  <label class="label" htmlFor="skype_radio">
                    Skype
                  </label>
                </div>
              </div>

              <label>
                <h4>Je toto stretnutie dôležité?</h4>
                <div class="switch-container">
                  <h4>Nie</h4>
                  <md-switch
                    icons
                    onchange={() => {
                      if (this.entry) {
                        this.entry.important = !this.entry.important;
                      }
                    }}
                  ></md-switch>
                  <h4>Áno</h4>
                </div>
              </label>
            </div>

            <div class="gap"></div>

            <md-outlined-text-field
              class="form-row"
              type="textarea"
              rows="3"
              label="Symptómy"
              value={this.entry?.symptoms}
              oninput={(ev: InputEvent) => {
                if (this.entry) {
                  this.entry.symptoms = this.handleInputEvent(ev);
                }
              }}
            >
              <md-icon slot="leading-icon">sick</md-icon>
            </md-outlined-text-field>

            <md-outlined-text-field
              class="form-row"
              type="textarea"
              rows="3"
              label="Diagnóza"
              value={this.entry?.diagnosis}
              oninput={(ev: InputEvent) => {
                if (this.entry) {
                  this.entry.diagnosis = this.handleInputEvent(ev);
                }
              }}
            >
              <md-icon slot="leading-icon">ecg_heart</md-icon>
            </md-outlined-text-field>

            <md-outlined-text-field
              class="form-row"
              type="textarea"
              rows="3"
              label="Poznámky"
              value={this.entry?.notes}
              oninput={(ev: InputEvent) => {
                if (this.entry) {
                  this.entry.notes = this.handleInputEvent(ev);
                }
              }}
            >
              <md-icon slot="leading-icon">clinical_notes</md-icon>
            </md-outlined-text-field>
          </div>
        </form>
        <md-divider></md-divider>
        <div class="actions">
          <md-outlined-button id="cancel" onClick={() => this.cancelClicked.emit('cancel')}>
            Zrušiť
          </md-outlined-button>
          <md-filled-button id="confirm" onClick={() => this.storeEntry()}>
            <md-icon slot="icon">save</md-icon>
            Uložiť
          </md-filled-button>
        </div>
      </Host>
    );
  }
}
