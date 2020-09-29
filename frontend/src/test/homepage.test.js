const puppeteer = require('puppeteer');

describe('React App', () => {

  const username = "asd";
  const password = "asd";

  it('succesfully go to the planning page with homepage after logging in', async () => {

    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: null,
        args: [`--window-size=${1920},${1080}`]
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');

    await page.waitForSelector('#basic_username');

    await page.type('#basic_username', 'asd');
    await page.type('#basic_password', 'asd');

    await page.click('.ant-btn-primary');

    await page.waitForSelector('#viewButton');
    await page.click('#viewButton');
    const currentPage = page.url();
    expect(currentPage).toEqual('http://localhost:3000/view');
    await page.waitFor(3000);
    await browser.close();
  }, 120000);

  it('succesfully go to the data visualisation page with homepage after logging in', async () => {

    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: null,
        args: [`--window-size=${1920},${1080}`]
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');

    await page.waitForSelector('#basic_username');

    await page.type('#basic_username', 'asd');
    await page.type('#basic_password', 'asd');

    await page.click('.ant-btn-primary');

    await page.waitForSelector('#dataButton');
    await page.click('#dataButton');
    const currentPage = page.url();
    expect(currentPage).toEqual('http://localhost:3000/data');
    await page.waitFor(3000);
    await browser.close();
  }, 120000);

  it('succesfully go to the monthly data analytics page with homepage after logging in', async () => {

    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: null,
        args: [`--window-size=${1920},${1080}`]
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');

    await page.waitForSelector('#basic_username');

    await page.type('#basic_username', 'asd');
    await page.type('#basic_password', 'asd');

    await page.click('.ant-btn-primary');

    await page.waitForSelector('#monthlyButton');
    await page.click('#monthlyButton');
    const currentPage = page.url();
    expect(currentPage).toEqual('http://localhost:3000/montly');
    await page.waitFor(3000);
    await browser.close();
  }, 120000);

  it('succesfully go to the upload page with homepage after logging in', async () => {

    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: null,
        args: [`--window-size=${1920},${1080}`]
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');

    await page.waitForSelector('#basic_username');

    await page.type('#basic_username', 'asd');
    await page.type('#basic_password', 'asd');

    await page.click('.ant-btn-primary');

    await page.waitForSelector('#uploadButton');
    await page.click('#uploadButton');
    const currentPage = page.url();
    expect(currentPage).toEqual('http://localhost:3000/upload');
    await page.waitFor(3000);
    await browser.close();
  }, 120000);

  it('succesfully go to the manual planning page with homepage after logging in', async () => {

    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: null,
        args: [`--window-size=${1920},${1080}`]
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');

    await page.waitForSelector('#basic_username');

    await page.type('#basic_username', 'asd');
    await page.type('#basic_password', 'asd');

    await page.click('.ant-btn-primary');

    await page.waitForSelector('#planningButton');
    await page.click('#planningButton');
    const currentPage = page.url();
    expect(currentPage).toEqual('http://localhost:3000/planning');
    await page.waitFor(3000);
    await browser.close();
  }, 120000);

  

  it('succesfully go to the user account management page with homepage after logging in', async () => {

    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: null,
        args: [`--window-size=${1920},${1080}`]
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');

    await page.waitForSelector('#basic_username');

    await page.type('#basic_username', 'asd');
    await page.type('#basic_password', 'asd');

    await page.click('.ant-btn-primary');

    await page.waitForSelector('#accountButton');
    await page.click('#accountButton');
    const currentPage = page.url();
    expect(currentPage).toEqual('http://localhost:3000/account');
    await page.waitFor(3000);
    await browser.close();
  }, 120000);
 


  
});
