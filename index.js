const puppeteer = require('puppeteer-extra');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(AdblockerPlugin())
const fs = require('fs');
const util = require('util');
const { resolve } = require('path');
const { rejects } = require('assert');
var log_file_err = fs.createWriteStream(__dirname + '/error.log', { flags: 'a' });
process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
    log_file_err.write(util.format('Caught exception: ' + err) + '\n');
});

(async() => {
    const browser = await puppeteer.launch({
        headless: false,
        devtools: true
    });
    let email;
    let url = "https://quizlet.com/teacher-referral-invite/microdust__?i=41jk1e&x=16qt";
    let password = "IJustWantToCrack";
    let count = 0;
    console.log("嘗試獲取臨時信箱...");
    const emailpage = await browser.newPage();
    await emailpage.goto('https://10minutemail.net/?lang=zh-tw');
    await emailpage.waitForTimeout(1000);
    await emailpage.waitForSelector('#fe_text');
    email = await emailpage.evaluate(async() => {
        return document.querySelector('#fe_text').value;
    });
    console.log("獲取到臨時信箱: " + email);
    const page = await browser.newPage();
    console.log("跳轉到邀請網址:");
    console.log(url);
    await page.goto(url);
    //await page.waitForTimeout(1000);
    await page.click('#page > section:nth-child(1) > div > div > div.PrismicTextCallout-description > div.UIDiv.PrismicTextCallout-cta.PrismicTextCallout--descriptionLeft > div > a');
    console.log("接受邀請");
    //await page.waitForNavigation();
    await emailpage.waitForTimeout(1000);
    console.log("嘗試以臨時信箱註冊...");
    await page.waitForSelector('body > div.UIModal.UIModal-container.is-white.is-open.UIModal--fullScreen.SignupPromptModalNew--fullPageExperiment > div > div.UIModalBody > section > div.a1pcnvbg > div > form > div.UIDiv.BirthDateDropdownGroup > div > div > div:nth-child(1) > select');
    await page.select('body > div.UIModal.UIModal-container.is-white.is-open.UIModal--fullScreen.SignupPromptModalNew--fullPageExperiment > div > div.UIModalBody > section > div.a1pcnvbg > div > form > div.UIDiv.BirthDateDropdownGroup > div > div > div:nth-child(2) > select', '6');
    await page.select('body > div.UIModal.UIModal-container.is-white.is-open.UIModal--fullScreen.SignupPromptModalNew--fullPageExperiment > div > div.UIModalBody > section > div.a1pcnvbg > div > form > div.UIDiv.BirthDateDropdownGroup > div > div > div:nth-child(3) > select', '4');
    await page.evaluate(async() => {
        document.querySelector('body > div.UIModal.UIModal-container.is-white.is-open.UIModal--fullScreen.SignupPromptModalNew--fullPageExperiment > div > div.UIModalBody > section > div.a1pcnvbg > div > form > div.UIDiv.BirthDateDropdownGroup > div > div > div:nth-child(1) > select > option:nth-child(34)').value = '1989';
    });
    await page.select('body > div.UIModal.UIModal-container.is-white.is-open.UIModal--fullScreen.SignupPromptModalNew--fullPageExperiment > div > div.UIModalBody > section > div.a1pcnvbg > div > form > div.UIDiv.BirthDateDropdownGroup > div > div > div:nth-child(1) > select', '1989');
    await page.type('#email', email);
    console.log("帳號: " + email);
    await page.type('#password1', password);
    console.log("密碼: " + password);
    await page.click('body > div.UIModal.UIModal-container.is-white.is-open.UIModal--fullScreen.SignupPromptModalNew--fullPageExperiment > div > div.UIModalBody > section > div.a1pcnvbg > div > form > div:nth-child(5) > label > input');
    console.log("勾選教師身分...");
    await page.click('body > div.UIModal.UIModal-container.is-white.is-open.UIModal--fullScreen.SignupPromptModalNew--fullPageExperiment > div > div.UIModalBody > section > div.a1pcnvbg > div > form > div.UIDiv.TosCheckbox > label > input');
    console.log("勾選同意條款...");
    await page.evaluate(async() => {
        document.querySelector('body > div.UIModal.UIModal-container.is-white.is-open.UIModal--fullScreen.SignupPromptModalNew--fullPageExperiment > div > div.UIModalBody > section > div.a1pcnvbg > div > form > button').disabled = false;
    });
    await page.click('body > div.UIModal.UIModal-container.is-white.is-open.UIModal--fullScreen.SignupPromptModalNew--fullPageExperiment > div > div.UIModalBody > section > div.a1pcnvbg > div > form > button');
    console.log("註冊完成");
    //await emailpage.bringToFront();
    const varify = await browser.newPage();
    await varify.goto('https://10minutemail.net/?lang=zh-tw');
    await varify.waitForTimeout(1000);
    console.log("等待驗證信...");
    if (!(await checkEmailFn())) {
        while (!(await checkEmailFn()));
    }
    console.log("收到驗證信");
    await varify.waitForNavigation();
    await varify.waitForSelector('#tab1 > div:nth-child(1) > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > a');
    await varify.click('#tab1 > div:nth-child(1) > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > a');
    console.log("點擊鏈結驗證帳號");
    //await varify.waitForTimeout();
    async function checkEmailFn() {
        if (count === 60) {
            await varify.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
            console.log("刷新網頁");
            console.log("等待驗證信...");
            count = 0;
        }
        await varify.waitForTimeout(1000);
        count++;
        let success = await varify.evaluate(async() => {
            let mailer = document.querySelector('#maillist > tbody > tr:nth-child(2) > td:nth-child(2) > a');
            if (mailer.innerText != "請確認你在Quizlet的電郵位址") return false;
            if (mailer.innerText === "請確認你在Quizlet的電郵位址") mailer.click();
            return true;
        });
        return success;
    }
    console.log("成功驗證");
    await varify.waitForTimeout(1000);
    await page.screenshot({ path: 'result.png' });
    await browser.close();
})();