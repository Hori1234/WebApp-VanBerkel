const puppeteer = require('puppeteer');

describe('Google', () => {

  it('should be titled "Google"', async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('http://192.168.178.10:3000');
    await expect(page.title()).resolves.toMatch('Google');
  });
});