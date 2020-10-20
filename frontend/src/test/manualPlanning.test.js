const puppeteer = require('puppeteer');

const username = 'test';
const password = 'test';


describe('React App', () => {

    
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

        await browser.close();

      }, 120000);

      
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
    
        await page.waitFor(500);
        await page.click('#root > section > section > section > section > main > section > section > div.ant-row.ant-row-space-around.ant-row-middle > div.ant-col.ant-col-12 > div > div > div > div > div > div.ant-table-body > table > tbody > tr:nth-child(2) > td.ant-table-cell.ant-table-cell-fix-right.ant-table-cell-fix-right-first > a')
        await page.waitFor(1000);

        await page.click('#Booking');
        await page.evaluate( () => document.getElementById("Booking").value = '');
        

        await page.type('#Booking', '167506H');
        // await page.type('#bookingNr', 'test');
        // await page.type('#customer', 'test');
        // await page.type('#truckId', 'test');
        // await page.type('#deliveryDeadline', 'test');
        // await page.type('#processTime', 'test');
        // await page.type('#drivingTime', 'test');
        // await page.type('#serviceTime', 'test');

        await page.click('#root > section > section > section > section > main > section > section > div.ant-row.ant-row-space-around.ant-row-middle > div.ant-col.ant-col-12 > div > div > div > div > div > div.ant-table-body > table > tbody > tr:nth-child(2) > td.ant-table-cell.ant-table-cell-fix-right.ant-table-cell-fix-right-first > span > a:nth-child(1)');
        
        await page.waitForSelector('.ant-message-custom-content.ant-message-success');
        const ErrorMessage = await page.$eval('.ant-message-custom-content.ant-message-success', element => element.textContent);

        expect(ErrorMessage).toEqual('Order updated succesfully');
        
        await browser.close();

      }, 120000);

      
      it('shall succesfully edit a truck', async () => {

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
        await page.click('#root > section > section > section > section > main > section > section > div.ant-row.ant-row-space-around.ant-row-middle > div.ant-col.ant-col-9 > div > div > div > div > div > div.ant-table-body > table > tbody > tr:nth-child(2) > td.ant-table-cell.ant-table-cell-fix-right.ant-table-cell-fix-right-first > a')
        await page.waitFor(1000);

        await page.click('#truck_type');
        await page.evaluate( () => document.getElementById("truck_type").value = '');
        await page.waitFor(500);

        await page.type('#truck_type', 'regional');
        // await page.type('#bookingNr', 'test');
        // await page.type('#customer', 'test');
        // await page.type('#truckId', 'test');
        // await page.type('#deliveryDeadline', 'test');
        // await page.type('#processTime', 'test');
        // await page.type('#drivingTime', 'test');
        // await page.type('#serviceTime', 'test');

        await page.click('#root > section > section > section > section > main > section > section > div.ant-row.ant-row-space-around.ant-row-middle > div.ant-col.ant-col-9 > div > div > div > div > div > div.ant-table-body > table > tbody > tr:nth-child(2) > td.ant-table-cell.ant-table-cell-fix-right.ant-table-cell-fix-right-first > span > a:nth-child(1)');
        

        await page.waitForSelector('.ant-message-custom-content.ant-message-success');
        const ErrorMessage = await page.$eval('.ant-message-custom-content.ant-message-success', element => element.textContent);

        expect(ErrorMessage).toEqual('Order updated succesfully');
        
        await browser.close();

      }, 120000);

      
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

        await page.type('#nest-messages_Inl_terminal', 'ITV');
        await page.type("#nest-messages_truckType", 'regional');
        await page.type('#nest-messages_Hierarchy', '2');
        await page.type('#nest-messages_drivingTime', '55');
        await page.type('#nest-messages_processTime', '20');
        await page.type('#nest-messages_deliveryDeadline', '16:00:00');

        await page.click('.ant-modal-footer > button:nth-child(2)');
        
        await page.waitForSelector('.ant-message-custom-content.ant-message-success');
        const ErrorMessage = await page.$eval('.ant-message-custom-content.ant-message-success', element => element.textContent);

        expect(ErrorMessage).toEqual('Order:  added succesfully');
        
        await browser.close();

      }, 120000);

      
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

        await page.type('#truckID', 'TT2');
        await page.type('#Availability', 'yes');
        await page.type('#truckType', 'regional');
        await page.type('#Terminal', 'ITV');
        await page.type('#Hierarchy', '2');
        await page.type('#useCost', '1');
        await page.type('#startingTime', '06:00:00');
        await page.type('#Date', '2020-09-07');
        await page.type('#businessType', 'ITV');

        await page.click('.ant-modal-footer > button:nth-child(2)');

        await page.waitForSelector('.ant-message-custom-content.ant-message-success');
        const ErrorMessage = await page.$eval('.ant-message-custom-content.ant-message-success', element => element.textContent);

        expect(ErrorMessage).toEqual('Truck: added succesfully');

        await browser.close();

      }, 120000);


      
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
    
        await page.waitFor(1500);
        //await page.click('.ant-table-tbody.ant-checkbox-input');
        await page.click('#root > section > section > section > section > main > section > section > div.ant-row.ant-row-space-around.ant-row-middle > div.ant-col.ant-col-12 > div > div > div > div > div > div.ant-table-body > table > tbody > tr:nth-child(2) > td.ant-table-cell.ant-table-selection-column > label > span > input');
        //await page.click('#root > section > section > section > section > main > section > section > div.ant-row.ant-row-space-around.ant-row-middle > div.ant-col.ant-col-12 > div > div > div > div > div > div.ant-table-body > table > tbody > tr:nth-child(3) > td.ant-table-cell.ant-table-selection-column > label > span > input');


        await page.click('#root > section > section > section > section > main > section > section > div.ant-row.ant-row-space-around.ant-row-middle > div.ant-col.ant-col-12 > button:nth-child(4)');
        
        await page.waitFor(500);
        await page.click('body > div:nth-child(8) > div > div > div > div.ant-popover-inner > div > div.ant-popover-buttons > button.ant-btn.ant-btn-primary.ant-btn-sm > span');
        
        await page.waitForSelector('.ant-message-custom-content.ant-message-success');
        const ErrorMessage = await page.$eval('.ant-message-custom-content.ant-message-success', element => element.textContent);

        expect(ErrorMessage).toEqual('Order succesfully deleted');

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
    

        await page.waitFor(1500);
        await page.click('#root > section > section > section > section > main > section > section > div.ant-row.ant-row-space-around.ant-row-middle > div.ant-col.ant-col-9 > div > div > div > div > div > div.ant-table-body > table > tbody > tr:nth-child(2) > td.ant-table-cell.ant-table-selection-column > label > span > input');

        await page.click('#root > section > section > section > section > main > section > section > div.ant-row.ant-row-space-around.ant-row-middle > div.ant-col.ant-col-9 > button:nth-child(4) > span');
        await page.waitFor(1000);
        await page.click('body > div:nth-child(8) > div > div > div > div.ant-popover-inner > div > div.ant-popover-buttons > button.ant-btn.ant-btn-primary.ant-btn-sm');


        await page.waitForSelector('.ant-message-custom-content.ant-message-success');
        const ErrorMessage = await page.$eval('.ant-message-custom-content.ant-message-success', element => element.textContent);

        expect(ErrorMessage).toEqual('Truck succesfully deleted');

        await browser.close();

      }, 120000);

    });