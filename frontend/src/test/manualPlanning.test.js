const puppeteer = require('puppeteer');

const username = 'test';
const password = 'test';


describe('React App', () => {

    /*
    it('shall succesfully magnify the orders', async () => {

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

        const elementStyle = await page.$eval('#rcDialogTitle5', element => element);

        //expect(page.waitForSelector('body > div:nth-child(7) > div > div.ant-modal-wrap').style.toEqual(''));
        console.log(elementStyle);

        await browser.close();

      }, 120000);*/

      /*
      it('shall succesfully edit an order', async () => {

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
    

        await page.click('#root > section > section > section > section > main > section > section > div.ant-row.ant-row-space-around.ant-row-middle > div.ant-col.ant-col-12 > div > div > div > div > div > div.ant-table-body > table > tbody > tr:nth-child(2) > td.ant-table-cell.ant-table-cell-fix-right.ant-table-cell-fix-right-first > a')
        await page.waitFor(1500);

        await page.type('#city', 'test');
        // await page.type('#bookingNr', 'test');
        // await page.type('#customer', 'test');
        // await page.type('#truckId', 'test');
        // await page.type('#deliveryDeadline', 'test');
        // await page.type('#processTime', 'test');
        // await page.type('#drivingTime', 'test');
        // await page.type('#serviceTime', 'test');
        
        await page.waitFor(2000);

        await browser.close();

      }, 120000);*/

      /*
      it('shall succesfully add an entry in orders table', async () => {

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
    
        await page.waitFor(500);
        await page.click('#root > section > section > section > section > main > section > section > div.ant-row.ant-row-space-around.ant-row-middle > div.ant-col.ant-col-12 > button:nth-child(3)');
        await page.waitFor(500);

        await page.type('#nest-messages_bookingNumber', 'test');
        await page.type('#nest-messages_Inl_terminal', 'test');
        await page.type('#nest-messages_latestDepTime', 'test');  
        await page.type('#nest-messages_truckType', 'test');
        await page.type('#nest-messages_Hierarchy', 'test');
        await page.type('#nest-messages_drivingTime', 'test');
        await page.type('#nest-messages_processTime', 'test');
        await page.type('#nest-messages_serviceTime', 'test');
        await page.type('#nest-messages_deliveryDeadline', 'test');

        await page.click('.ant-modal-footer > button:nth-child(2)');
        
        await page.waitForSelector('.ant-message-custom-content.ant-message-success');
        const ErrorMessage = await page.$eval('.ant-message-custom-content.ant-message-success', element => element.textContent);

        expect(ErrorMessage).toEqual('Order: added succesfully');
        
        await browser.close();

      }, 120000);*/

      
      it('shall succesfully add an entry in truck table', async () => {

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
    
        await page.waitFor(500);
        await page.click('#root > section > section > section > section > main > section > section > div.ant-row.ant-row-space-around.ant-row-middle > div.ant-col.ant-col-9 > button:nth-child(3)');
        await page.waitFor(500);

        await page.type('#truckID', 'test');
        await page.type('#truckSNo', 'test');
        await page.type('#Availability', 'test');
        await page.type('#truckType', 'test');
        await page.type('#Terminal', 'test');
        await page.type('#Hierarchy', 'test');
        await page.type('#useCost', 'test');
        await page.type('#startingTime', 'test');
        await page.type('#Date', 'test');

        await page.click('.ant-modal-footer > button:nth-child(2)');

        //await page.waitForSelector('.ant-message-custom-content.ant-message-success');
        //const ErrorMessage = await page.$eval('.ant-message-custom-content.ant-message-success', element => element.textContent);

        //expect(ErrorMessage).toEqual('Order: added succesfully');

        await browser.close();

      }, 120000);


      /*
      it('shall succesfully delete an item from order list table', async () => {

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
    
        //to be changed
        //await page.click('.ant-table-tbody:nth-child(2) > input.ant-checkbox');


        // await page.click('#root > section > section > section > section > main > section > section > div.ant-row.ant-row-space-around.ant-row-middle > div.ant-col.ant-col-12 > button:nth-child(4)');
        // await page.waitForSelector('.ant-message-custom-content.ant-message-success');
        // const ErrorMessage = await page.$eval('.ant-message-custom-content.ant-message-success', element => element.textContent);

        // expect(ErrorMessage).toEqual('Account succesfully deleted');

        await browser.close();

      }, 120000);

      
      it('shall succesfully delete an item from truck availability table', async () => {

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
    
        //to be changed
        //await page.click('#root > section > section > section > section > main > section > section > div.ant-row.ant-row-space-around.ant-row-middle > div.ant-col.ant-col-9 > div > div > div > div > div > div.ant-table-body > table > tbody > tr:nth-child(2) > td.ant-table-cell.ant-table-selection-column > label > span');


        // await page.click('#root > section > section > section > section > main > section > section > div.ant-row.ant-row-space-around.ant-row-middle > div.ant-col.ant-col-9 > button:nth-child(4)');
        // await page.waitForSelector('.ant-message-custom-content.ant-message-success');
        // const ErrorMessage = await page.$eval('.ant-message-custom-content.ant-message-success', element => element.textContent);

        // expect(ErrorMessage).toEqual('Account succesfully deleted');

        await browser.close();

      }, 120000);*/

    });