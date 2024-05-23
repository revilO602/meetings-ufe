import { newE2EPage } from '@stencil/core/testing';

describe('meetings-creator', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<meetings-creator></meetings-creator>');

    const element = await page.find('meetings-creator');
    expect(element).toHaveClass('hydrated');
  });
});
