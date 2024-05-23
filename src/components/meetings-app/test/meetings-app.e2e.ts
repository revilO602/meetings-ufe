import { newE2EPage } from '@stencil/core/testing';

describe('meetings-app', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<meetings-app></meetings-app>');

    const element = await page.find('meetings-app');
    expect(element).toHaveClass('hydrated');
  });
});
