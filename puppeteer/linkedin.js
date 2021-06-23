const puppeteer = require('puppeteer');
const axios = require('axios');

axios.get('http://127.0.0.1:9222/json/version')
.then(res => start(res.data.webSocketDebuggerUrl))
.catch(err => err)

const start = async browserWSEndpoint => {
    const browser = await puppeteer.connect({
        browserWSEndpoint,
        defaultViewport: null,
    });

    const page = await browser.newPage();



    await page.goto('https://www.linkedin.com');

    page.on('console', e => console.log(e))


    await page.evaluate(() => {
        document.addEventListener('keydown', () => console.log('okie'))
    });

//     const container = document.querySelector('div[class="jobs-details-top-card__content-container"]');

// const position = container.children[0].textContent.trim();

// const [company, useless, location] = Array.from(container.children[1].getElementsByTagName('a')).map(div => div.textContent.trim());
};