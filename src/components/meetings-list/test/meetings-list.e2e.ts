import { newE2EPage } from '@stencil/core/testing';

describe('meetings-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<meetings-list></meetings-list>');

    const element = await page.find('meetings-list');
    expect(element).toHaveClass('hydrated');
  });
});
