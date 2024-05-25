import { Component, Host, Prop, State, h } from '@stencil/core';
declare global {
  interface Window {
    navigation: any;
  }
}
@Component({
  tag: 'meetings-app',
  styleUrl: 'meetings-app.css',
  shadow: true,
})
export class MeetingsApp {
  @State() private relativePath = '';

  @Prop() basePath: string = '';
  @Prop() apiBase: string;

  componentWillLoad() {
    const baseUri = new URL(this.basePath, document.baseURI || '/').pathname;

    const toRelative = (path: string) => {
      if (path.startsWith(baseUri)) {
        this.relativePath = path.slice(baseUri.length);
      } else {
        this.relativePath = '';
      }
    };

    window.navigation?.addEventListener('navigate', (ev: Event) => {
      if ((ev as any).canIntercept) {
        (ev as any).intercept();
      }
      let path = new URL((ev as any).destination.url).pathname;
      toRelative(path);
    });

    toRelative(location.pathname);
  }

  render() {
    let element = 'list';
    let entryId = '';

    if (this.relativePath.endsWith('edit')) {
      element = 'editor';
      entryId = this.relativePath.split('/')[1];
    } else if (this.relativePath.endsWith('create')) {
      element = 'creator';
    } else if (this.relativePath.startsWith('entry/')) {
      element = 'detail';
      entryId = this.relativePath.split('/')[1];
    }

    const navigate = (path: string) => {
      const absolute = new URL(path, new URL(this.basePath, document.baseURI)).pathname;
      window.navigation.navigate(absolute);
    };

    return (
      <Host>
        {element === 'detail' ? (
          <meetings-detail
            entry-id={entryId}
            api-base={this.apiBase}
            oneditor-clicked={(ev: CustomEvent<string>) => navigate('./entry/' + ev.detail + '/edit')}
            oncancel-clicked={() => navigate('./list')}
          ></meetings-detail>
        ) : element === 'editor' ? (
          <meetings-editor entry-id={entryId} oncancel-clicked={() => navigate('./entry/' + entryId)} api-base={this.apiBase}></meetings-editor>
        ) : element === 'creator' ? (
          <meetings-creator oncancel-clicked={() => navigate('./list')} api-base={this.apiBase}></meetings-creator>
        ) : (
          <meetings-list
            api-base={this.apiBase}
            onentry-clicked={(ev: CustomEvent<string>) => navigate('./entry/' + ev.detail)}
            oncreator-clicked={() => navigate('./create')}
          ></meetings-list>
        )}
      </Host>
    );
  }
}
