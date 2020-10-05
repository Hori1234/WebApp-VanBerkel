const puppeteer = require('puppeteer');

const username = 'test';
const password = 'test';


describe('React App', () => {

  
    it('shall succesfully create an account', async () => {

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
    

        await page.click('#root > section > section > section > section > main > section > section > div.ant-row.ant-row-space-around.ant-row-middle > div.ant-col.ant-col-12 > button:nth-child(5)')
        await page.waitFor(1500);
        await browser.close();

      }, 120000);


    });