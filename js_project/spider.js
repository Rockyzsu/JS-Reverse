const puppeteer = require('puppeteer');

(async () => {
    // 启动浏览器
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // 导航到目标URL
    await page.goto('https://data.10jqka.com.cn/funds/hyzjl/#refCountId=data_55f13c2c_254');

    // 等待页面加载完成
    await page.waitForSelector('body');

    // 抓取所需的数据
    const data = await page.evaluate(() => {
        return document.querySelector('body').innerText;
    });

    // 打印抓取的数据
    console.log(data);

    // 关闭浏览器
    await browser.close();
})();