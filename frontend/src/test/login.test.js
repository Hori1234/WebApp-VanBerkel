const puppeteer = require('puppeteer');

describe('React App', () => {

  const noUsername = "asd";
  const noPassword = "asd";

  const username = "test";
  const password = "test";

  

  it('should output an error on invalid accounts', async () => {

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');

    await page.waitForSelector('#basic_username');

    await page.type('#basic_username', 'Oswald John');
    await page.type('#basic_password', 'Invalid Password');

    await page.click('.ant-btn-primary');

    await page.waitForSelector('.ant-message-custom-content.ant-message-info');
    const ErrorMessage = await page.$eval('.ant-message-custom-content.ant-message-info', element => element.textContent);

    expect(ErrorMessage).toEqual('account not valid');

  }, 15000);

  it('should redirect to correct page on succsesful login', async () => {


    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');
    

    await page.waitForSelector('#basic_username');

    await page.type('#basic_username', username);
    await page.type('#basic_password', 'caca');

    await page.click('.ant-btn-primary');

    await page.waitForSelector('.ant-layout-sider');


  }, 10000);
});
