const puppeteer = require('puppeteer');
const path = require('path');

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
    
        await page.waitForSelector('.ant-menu-item.ant-menu-item-only-child:nth-child(2)');
        await page.click('.ant-menu-item.ant-menu-item-only-child:nth-child(2)');
        await page.waitFor(300);
        const currentPage = page.url();
        expect(currentPage).toEqual('http://localhost:3000/account');

        
        await page.click('.ant-btn.ant-btn-primary');

        await page.waitForSelector('.ant-modal-content');
        await page.type('#nest-messages_user_name', 'Oswald');
        await page.type('#nest-messages_user_password', 'pOswald');

        await page.click('.ant-select.ant-select-single.ant-select-allow-clear.ant-select-show-arrow');
        
        await page.waitFor(1000);
        await page.click('body > div:nth-child(8) > div > div > div > div.rc-virtual-list > div > div > div > div.ant-select-item.ant-select-item-option:nth-child(1) > div')

        await page.waitFor(2000);

        await page.click('#nest-messages > div:nth-child(5) > div > div > div > button');

        await page.waitForSelector('.ant-message-custom-content.ant-message-success');
        const ErrorMessage = await page.$eval('.ant-message-custom-content.ant-message-success', element => element.textContent);

        expect(ErrorMessage).toEqual(`Account created !`);

      }, 120000);


      it('shall succesfully edit an account', async () => {

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

        
        await page.click('#root > section > section > section > section > main > section > section > section:nth-child(3) > section > div > div > div > div > div > ul > li:nth-child(4) > div:nth-child(2) > button:nth-child(1)');

        await page.waitForSelector('.ant-modal-content');
        await page.type('#nest-messages_user_Username', 'OswaldChange');
        await page.type('#nest-messages_user_Password', 'pOswaldChange');

        await page.click('.ant-select.ant-select-single.ant-select-allow-clear.ant-select-show-arrow');
        
        await page.waitFor(1000);
        await page.click('body > div:nth-child(8) > div > div > div > div.rc-virtual-list > div > div > div > div.ant-select-item.ant-select-item-option:nth-child(2) > div')

        await page.waitFor(2000);

        await page.click('#nest-messages > div:nth-child(5) > div > div > div > button');

        await page.waitForSelector('.ant-message-custom-content.ant-message-success');
        const ErrorMessage = await page.$eval('.ant-message-custom-content.ant-message-success', element => element.textContent);

        expect(ErrorMessage).toEqual(`Account updated succesfully`);

      }, 120000);



      it('shall successfully delete an account', async () => {

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

        
        await page.click('#root > section > section > section > section > main > section > section > section:nth-child(3) > section > div > div > div > div > div > ul > li:nth-child(4) > div:nth-child(2) > button:nth-child(2)');

        await page.waitForSelector('.ant-message-custom-content.ant-message-success');
        const ErrorMessage = await page.$eval('.ant-message-custom-content.ant-message-success', element => element.textContent);

        expect(ErrorMessage).toEqual(`Account succesfully deleted`);

      }, 120000);

});



