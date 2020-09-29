const puppeteer = require('puppeteer');

describe('React App', () => {

  const noUsername = "asd";
  const noPassword = "asd";

  const username = "test";
  const password = "test";



  it('correct error message after failed upload', async () => {

    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: null,
        args: [`--window-size=${1920},${1080}`]
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');

    await page.waitForSelector('#basic_username');

    await page.type('#basic_username', 'test');
    await page.type('#basic_password', 'test');

    await page.click('.ant-btn-primary');

    await page.waitForSelector('#uploadButton');
    await page.click('#uploadButton');
    const currentPage = page.url();
    expect(currentPage).toEqual('http://localhost:3000/upload');

    let fileToUpload = 'testDoc.txt';

    await page.waitForSelector('input[type=file]');
    await page.waitFor(1000);
    const inputUploadHandle = await page.$('input[type=file]');

    inputUploadHandle.uploadFile(fileToUpload);

    
    await page.waitForSelector('.ant-message-custom-content.ant-message-error');
    
    const ErrorMessage = await page.$eval('.ant-message-custom-content.ant-message-error:nth-of-type(1)', element => element.textContent);
    //const ErrorMessage2 = await page.$eval('.ant-message:last-child.ant-message-custom-content:last-child', element => element.textContent);

    expect(ErrorMessage).toEqual(`${fileToUpload} file upload failed.`);
    //expect(ErrorMessage2).toEqual('File type not supported.');


  }, 120000);

});