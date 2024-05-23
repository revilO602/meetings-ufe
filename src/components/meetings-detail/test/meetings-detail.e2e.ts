import { newE2EPage } from '@stencil/core/testing';

describe('meetings-detail', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<meetings-detail></meetings-detail>');

    const element = await page.find('meetings-detail');
    expect(element).toHaveClass('hydrated');
  });
});
