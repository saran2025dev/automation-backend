import { Page } from 'playwright';

class PlaywrightUtils {
  constructor() {}

  methods = [
    'gotoPage',
    'fillInput',
    'fillInputIframe',
    'clickElement',
    'clickElementIFrame',
    'clickElementByText',
    'selectDropdown',
    'selectDropdownIFrame',
    'explicitWait',
    'keyboardPressTAB',
    'radioAndCheckBoxIFrame',
    'typeInput',
  ];

  /**
   * Navigates to a specified URL with optional wait options.
   */
  async gotoPage(
    page: Page,
    url: string,
    waitUntil:
      | 'load'
      | 'domcontentloaded'
      | 'networkidle'
      | 'commit' = 'networkidle',
  ) {
    try {
      await page.goto(url, { waitUntil });
      console.log(`✅ Successfully navigated to ${url}`);
    } catch (error) {
      console.error(`❌ Failed to navigate to ${url}:`, error);
    }
  }

  /**
   * Fills an input field after waiting for the XPath to be visible.
   */
  async fillInput(page: Page, xpath: string, text: string) {
    await page.waitForSelector(xpath, { state: 'visible' });
    await page.fill(xpath, text);
  }

  async typeInput(page: Page, xpath: string, text: string) {
    await page.waitForSelector(xpath, { state: 'visible' });
    await page.locator(xpath).pressSequentially(text, { delay: 200 });
  }

  async fillInputIframe(
    page: Page,
    xpath: string,
    text: string,
    iframeSelector: string,
  ) {
    const iframe = await this.getFrame(page, iframeSelector);
    let element = iframe.locator(xpath);
    await element.fill(text);
  }

  async keyboardPressTAB(page: Page) {
    await page.keyboard.press('Tab');
  }

  async keyboardPressENTER(page: Page) {
    await page.keyboard.press('Enter');
  }

  async explicitWait(page: Page, time: number = 5000) {
    await page.waitForTimeout(time);
  }

  /**
   * Clicks on an element after waiting for the XPath to be visible.
   */
  async clickElement(page: Page, xpath: string) {
    const element = page.locator(xpath);

    // Wait until the element is visible and enabled
    await element.waitFor({ state: 'attached', timeout: 30000 });
    await element.waitFor({ state: 'visible', timeout: 30000 });
    console.log(
      ' element clicking ',
      xpath,
      'is visible : ',
      await element.isVisible(),
    );

    // Adding a small delay before clicking (optional)
    await page.waitForTimeout(200);

    await element.click();
  }

  async coverFoxSelectAddOns(page: Page, xpath: string) {
    const element = page.locator(xpath);

    const lastAddOnCount = await element.count();
    console.log('lastAddOnCount : ', lastAddOnCount);

    for (let i = 0; i < lastAddOnCount; i++) {
      element.nth(i).waitFor({ state: 'attached', timeout: 60000 });
      element.nth(i).waitFor({ state: 'visible', timeout: 60000 });
      console.log(
        ' element clicking ',
        xpath + [i],
        'is visible : ',
        await element.nth(i).isVisible(),
      );
      await element.nth(i).click();
    }
  }

  async clickElementIFrame(page: Page, xpath: string, iframeSelector: string) {
    const iframe = await this.getFrame(page, iframeSelector);

    const element = iframe.locator(xpath);
    await element.waitFor({ state: 'visible', timeout: 60000 });

    console.log(`Element ${xpath} is visible inside iframe.`);
    await element.click();
  }

  async getFrame(page: Page, iframeSelector: string) {
    await page.waitForSelector(iframeSelector, {
      state: 'visible',
      timeout: 60000,
    });
    const iframeLocator = page.frameLocator(iframeSelector);
    const isIframeVisible = await iframeLocator.locator('body').isVisible();
    console.log(`Iframe ${iframeSelector} visibility:`, isIframeVisible);
    return iframeLocator;
  }

  /**
   * Clicks an element based on text content (Common Approach).
   */
  async clickElementByText(page: Page, tag: string, text: string) {
    const element = page.locator(tag).filter({ hasText: text });
    await element.waitFor({ state: 'visible' });
    await element.click();
  }

  /**
   * Selects an option from a dropdown after waiting for the XPath to be visible.
   */
  async selectDropdown(page: Page, xpath: string, value: string) {
    await page.waitForSelector(xpath, { state: 'visible' });
    await page.selectOption(xpath, value);
  }

  async selectDropdownIFrame(
    page: Page,
    xpath: string,
    value: string,
    iframeSelector: string,
  ) {
    const iframe = await this.getFrame(page, iframeSelector);
    const dd = iframe.locator(xpath);
    await dd.waitFor({ state: 'visible', timeout: 60000 });
    await dd.selectOption(value);
  }

  async radioAndCheckBoxIFrame(
    page: Page,
    xpath: string,
    iframeSelector: string,
  ) {
    const iframe = await this.getFrame(page, iframeSelector);
    const dd = iframe.locator(xpath);
    await dd.waitFor({ state: 'visible', timeout: 60000 });
    await dd.check();
  }

  async scrollIntoViewIFrame(
    page: Page,
    xpath: string,
    iframeSelector: string,
  ) {
    const iframe = await this.getFrame(page, iframeSelector);

    const element = iframe.locator(xpath);
    await element.waitFor({ state: 'visible', timeout: 60000 });
    await element.scrollIntoViewIfNeeded();
    console.log(`Element ${xpath} is visible inside iframe.`);
  }

  async simpleAlert(page: Page) {
    page.on('dialog', async (dialog) => {
      try {
        console.log('Confirm Message:', dialog.message());
        await dialog.accept(); // Try to accept the alert
      } catch (error) {
        console.warn('Dialog was already handled:', error.message);
      }
    });
  }

  async getValue(page: Page, xpath: string, iframeSelector: string) {
    const iframe = await this.getFrame(page, iframeSelector);

    const element = iframe.locator(xpath);
    const value = await element.getAttribute('value');
    console.log("it's value we are getting : ", value);
    return value;
  }

  async performActions(
    page: Page,
    actions: { id: string; name: string; product: string; steps: any[] },
  ) {
    for (const action of actions.steps) {
      try {
        switch (action.method) {
          case 'gotoPage':
            await this.gotoPage(page, action.url ?? '', 'networkidle');
            break;

          case 'fillInput':
            await this.fillInput(
              page,
              action.selector ?? '',
              action.value ?? '',
            );
            break;

          case 'typeInput':
            await this.typeInput(
              page,
              action.selector ?? '',
              action.value ?? '',
            );
            break;

          case 'fillInputIframe':
            await this.fillInputIframe(
              page,
              action.selector ?? '',
              action.value ?? '',
              action.iframeSelector ?? '',
            );
            break;

          case 'clickElement':
            await this.clickElement(page, action.selector ?? '');
            break;

          case 'coverFoxSelectAddOns':
            await this.coverFoxSelectAddOns(page, action.selector ?? '');
            break;

          case 'clickElementIFrame':
            await this.clickElementIFrame(
              page,
              action.selector ?? '',
              action.iframeSelector ?? '',
            );
            break;

          case 'clickElementByText':
            await this.clickElementByText(
              page,
              action.selector ?? '',
              action.text ?? '',
            );
            break;

          case 'selectDropdown':
            await this.selectDropdown(
              page,
              action.selector ?? '',
              action.value ?? '',
            );
            break;

          case 'selectDropdownIFrame':
            await this.selectDropdownIFrame(
              page,
              action.selector ?? '',
              action.value ?? '',
              action.iframeSelector ?? '',
            );
            break;

          case 'explicitWait':
            await this.explicitWait(page, action.ms);
            break;

          case 'keyboardPressTAB':
            await this.keyboardPressTAB(page);
            break;

          case 'radioAndCheckBoxIFrame':
            await this.radioAndCheckBoxIFrame(
              page,
              action.selector ?? '',
              action.iframeSelector ?? '',
            );
            break;

          case 'scrollIntoViewIFrame':
            await this.scrollIntoViewIFrame(
              page,
              action.selector ?? '',
              action.iframeSelector ?? '',
            );
            break;

          case 'simpleAlert':
            await this.simpleAlert(page);
            break;

          case 'getValue':
            await this.getValue(
              page,
              action.selector ?? '',
              action.iframeSelector ?? '',
            );
            break;

          case 'keyboardPressENTER':
            await this.keyboardPressENTER(page);
            break;

          default:
            console.warn(`Unknown method: ${action.method}`);
            break;
        }
      } catch (error) {
        console.error(
          `❌ Error in action: ${action.method} (Attempt 1)`,
          error,
        );
      }
    }
  }
}

// Export an instance of the class
export default new PlaywrightUtils();
