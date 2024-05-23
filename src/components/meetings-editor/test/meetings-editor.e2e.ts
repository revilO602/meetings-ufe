import { newE2EPage } from '@stencil/core/testing';

describe('meetings-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<meetings-editor></meetings-editor>');

    const element = await page.find('meetings-editor');
    expect(element).toHaveClass('hydrated');
  });
});
