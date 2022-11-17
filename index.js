const puppeteer = require('puppeteer-extra');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(AdblockerPlugin());
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function getInput(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

//pkg index.js -t node14-win-x64 --public

(async() => {
    const browser = await puppeteer.launch({
        executablePath: './chromium/chrome.exe',
        headless: false,
        devtools: true
    });
    console.log("\n");
    console.log("  /$$$$$$            /$$           /$$             /$$");
    console.log(" /$$__  $$          |__/          | $$            | $$");
    console.log("| $$  \\ $$ /$$   /$$ /$$ /$$$$$$$$| $$  /$$$$$$  /$$$$$$");
    console.log("| $$  | $$| $$  | $$| $$|____ /$$/| $$ /$$__  $$|_  $$_/");
    console.log("| $$  | $$| $$  | $$| $$   /$$$$/ | $$| $$$$$$$$  | $$");
    console.log("| $$/$$ $$| $$  | $$| $$  /$$__/  | $$| $$_____/  | $$ /$$");
    console.log("|  $$$$$$/|  $$$$$$/| $$ /$$$$$$$$| $$|  $$$$$$$  |  $$$$/");
    console.log(" \\____ $$$ \\______/ |__/|________/|__/ \\_______/   \\___/");
    console.log("      \\__/        -- Auto crack for premium --");
    console.log("                                           -Made by Microdust\n\n");
    const URL = await getInput('\x1b[33mYour teacher invite link： \x1b[0m');
    let url = URL || "https://quizlet.com/teacher-referral-invite/microdust__?i=41jk1e&x=16qt";
    let count = 0;
    console.log("Trying to get temporary email ...");
    const emailpage = await browser.newPage();
    await emailpage.goto('http://10minutemail.net');
    await emailpage.waitForTimeout(1000);
    await emailpage.waitForSelector('#fe_text');
    const email = await emailpage.evaluate(async() => {
        return document.querySelector('#fe_text').value;
    });
    console.log("Got mail address: " + email);
    const page = await browser.newPage();
    console.log("Jump to invite link:");
    console.log(`\x1b[32m${url}\x1b[0m`);
    await page.goto(url);
    //await page.waitForTimeout(1000);
    await page.click('#page > section:nth-child(1) > div > div > div.PrismicTextCallout-description > div.UIDiv.PrismicTextCallout-cta.PrismicTextCallout--descriptionLeft > div > a');
    console.log("Accept invite.");
    //await page.waitForNavigation();
    await emailpage.waitForTimeout(1000);
    console.log("Trying to register with email ...");
    await page.waitForSelector('body > div:nth-child(13) > div > div > div.c1yw38c3.c1cv2anc > section > div.avsxyiq > div > form > div.buq5sud > div > div > div');
    await page.select('body > div:nth-child(13) > div > div > div.c1yw38c3.c1cv2anc > section > div.avsxyiq > div > form > div.buq5sud > div > div > div > div:nth-child(2) > select', '6');
    await page.select('body > div:nth-child(13) > div > div > div.c1yw38c3.c1cv2anc > section > div.avsxyiq > div > form > div.buq5sud > div > div > div > div:nth-child(3) > select', '4');
    await page.evaluate(async() => {
        document.querySelector('body > div:nth-child(13) > div > div > div.c1yw38c3.c1cv2anc > section > div.avsxyiq > div > form > div.buq5sud > div > div > div > div:nth-child(1) > select').value = '1989';
    });
    await page.select('body > div:nth-child(13) > div > div > div.c1yw38c3.c1cv2anc > section > div.avsxyiq > div > form > div.buq5sud > div > div > div > div:nth-child(1) > select', '1989');
    await page.type('#email', email);
    console.log(`Account (Email): \x1b[31m${email}\x1b[0m`);
    const password = "IJustWantToCrack";
    await page.type('#password1', password);
    console.log(`Password: \x1b[31m${password}\x1b[0m`);
    await page.click('body > div:nth-child(13) > div > div > div.c1yw38c3.c1cv2anc > section > div.avsxyiq > div > form > div:nth-child(5) > label > input');
    console.log("Choose the teacher identity...");
    await page.click('body > div:nth-child(13) > div > div > div.c1yw38c3.c1cv2anc > section > div.avsxyiq > div > form > div.UIDiv.TosCheckbox.is-prechecked > label > input');
    console.log("Accept policy...");
    await page.evaluate(async() => {
        document.querySelector('body > div:nth-child(13) > div > div > div.c1yw38c3.c1cv2anc > section > div.avsxyiq > div > form > button').disabled = false;
    });
    await page.click('body > div:nth-child(13) > div > div > div.c1yw38c3.c1cv2anc > section > div.avsxyiq > div > form > button');
    console.log("Register finish");
    //await emailpage.bringToFront();
    const varify = await browser.newPage();
    await varify.goto('https://10minutemail.net');
    await varify.waitForTimeout(1000);
    console.log("Wait for verify mail from Quizlet...");
    if (!(await checkEmailFn())) {
        while (!(await checkEmailFn()));
    }
    console.log("Received verify mail");
    await varify.waitForNavigation();
    await varify.waitForSelector('#tab1 > div:nth-child(1) > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > a');
    await varify.click('#tab1 > div:nth-child(1) > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > a');
    console.log("Click for verify");
    //await varify.waitForTimeout();
    async function checkEmailFn() {
        if (count === 60) {
            await varify.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
            console.log("Refreshing website and waiting for mail...");
            count = 0;
        }
        await varify.waitForTimeout(1000);
        count++;
        let success = await varify.evaluate(async() => {
            let mailer = document.querySelector('#maillist > tbody > tr:nth-child(2) > td:nth-child(1) > a');
            if (mailer.innerText != "Quizlet <account@account.quizlet.com>") return false;
            if (mailer.innerText === "Quizlet <account@account.quizlet.com>") mailer.click();
            return true;
        });
        return success;
    }
    console.log("\x1b[32msuccess\x1b[0m");
    await varify.waitForTimeout(1000);
    await page.screenshot({ path: 'result.png' });
    await browser.close();
})();