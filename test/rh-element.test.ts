import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import { RhElement } from '../src/RhElement.js';
import '../src/rh-element.js';

describe('RhElement', () => {
  let element: RhElement;
  beforeEach(async () => {
    element = await fixture(html`<rh-element></rh-element>`);
  });

  it('renders a h1', () => {
    const h1 = element.shadowRoot!.querySelector('h1')!;
    expect(h1).to.exist;
    expect(h1.textContent).to.equal('My app');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
