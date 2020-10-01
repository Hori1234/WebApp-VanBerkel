const puppeteer = require('puppeteer');

describe('React App', () => {

  const username = "test";
  const password = "test";

  it('shall succesfully go to the user management page with the side menu after logging in', async () => {

    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: null,
        args: [`--window-size=${1920},${1080}`]
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');

    await page.waitForSelector('#basic_username');

    await page.type('#basic_username', username);
    await page.type('#basic_password', password);

    await page.click('.ant-btn-primary');

    await page.waitForSelector('.ant-menu-item.ant-menu-item-only-child:nth-child(2)');
    await page.click('.ant-menu-item.ant-menu-item-only-child:nth-child(2)');
    await page.waitFor(300);
    const currentPage = page.url();
    expect(currentPage).toEqual('http://localhost:3000/account');
    await page.waitFor(3000);
    await browser.close();
  }, 20000);

  it('shall succesfully go to the upload page with the side menu after logging in', async () => {

    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: null,
        args: [`--window-size=${1920},${1080}`]
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');

    await page.waitForSelector('#basic_username');

    await page.type('#basic_username', username);
    await page.type('#basic_password', password);

    await page.click('.ant-btn-primary');

    await page.waitForSelector('.ant-menu-item.ant-menu-item-only-child:nth-child(3)');
    await page.click('.ant-menu-item.ant-menu-item-only-child:nth-child(3)');
    await page.waitFor(300);
    const currentPage = page.url();
    expect(currentPage).toEqual('http://localhost:3000/upload');
    await page.waitFor(3000);
    await browser.close();
  }, 20000);


  it('shall succesfully go to the manual planning page with the side menu after logging in', async () => {

    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: null,
        args: [`--window-size=${1920},${1080}`]
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');

    await page.waitForSelector('#basic_username');

    await page.type('#basic_username', username);
    await page.type('#basic_password', password);

    await page.click('.ant-btn-primary');

    await page.waitForSelector('.ant-menu-item.ant-menu-item-only-child:nth-child(4)');
    await page.click('.ant-menu-item.ant-menu-item-only-child:nth-child(4)');
    await page.waitFor(300);
    const currentPage = page.url();
    expect(currentPage).toEqual('http://localhost:3000/planning');
    await page.waitFor(3000);
    await browser.close();
  }, 20000);

  it('shall succesfully go to the view planning page with the side menu after logging in', async () => {

    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: null,
        args: [`--window-size=${1920},${1080}`]
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');

    await page.waitForSelector('#basic_username');

    await page.type('#basic_username', username);
    await page.type('#basic_password', password);

    await page.click('.ant-btn-primary');

    await page.waitForSelector('.ant-menu-item.ant-menu-item-only-child:nth-child(5)');
    await page.click('.ant-menu-item.ant-menu-item-only-child:nth-child(5)');
    await page.waitFor(300);
    const currentPage = page.url();
    expect(currentPage).toEqual('http://localhost:3000/view');
    await page.waitFor(3000);
    await browser.close();
  }, 20000);

  it('shall succesfully go to the data visualisation page with the side menu after logging in', async () => {

    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: null,
        args: [`--window-size=${1920},${1080}`]
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');

    await page.waitForSelector('#basic_username');

    await page.type('#basic_username', username);
    await page.type('#basic_password', password);

    await page.click('.ant-btn-primary');

    await page.waitForSelector('.ant-menu-item.ant-menu-item-only-child:nth-child(6)');
    await page.click('.ant-menu-item.ant-menu-item-only-child:nth-child(6)');
    await page.waitFor(300);
    const currentPage = page.url();
    expect(currentPage).toEqual('http://localhost:3000/data');
    await page.waitFor(3000);
    await browser.close();
  }, 20000);

  it('shall succesfully go to the monthly data analytics page with the side menu after logging in', async () => {

    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: null,
        args: [`--window-size=${1920},${1080}`]
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');

    await page.waitForSelector('#basic_username');

    await page.type('#basic_username', username);
    await page.type('#basic_password', password);

    await page.click('.ant-btn-primary');

    await page.waitForSelector('.ant-menu-item.ant-menu-item-only-child:nth-child(7)');
    await page.click('.ant-menu-item.ant-menu-item-only-child:nth-child(7)');
    await page.waitFor(300);
    const currentPage = page.url();
    expect(currentPage).toEqual('http://localhost:3000/montly');
    await page.waitFor(3000);
    await browser.close();
  }, 20000);
});