const puppeteer = require('puppeteer');
const path = require('path');


describe('React App', () => {

  
    it('succesfully go to the user management page with the side menu after logging in', async () => {

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

    
        await page.$eval(
            '#nest-messages_user_role',
            element => element.setAttribute("aria-activedescendant", 'nest_messages_user_role_list_0')
          );

        await page.click('.ant-select-item-option-content:nth-child(1)');
  
        const test = page.$("button:contains('Submit')");
        (await test).click;

        await page.waitForSelector('.ant-message-custom-content.ant-message-success');
        const ErrorMessage = await page.$eval('.ant-message-custom-content.ant-message-success', element => element.textContent);

        expect(ErrorMessage).toEqual(`Account created !`);

      }, 120000);

});