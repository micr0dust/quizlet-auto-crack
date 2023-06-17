const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
const checkUpdate = require('check-update-github');
const pkg = require('./package.json');
puppeteer.use(AdblockerPlugin());
puppeteer.use(StealthPlugin());
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
//nexe -t windows-x64-12.15.0
//pkg index.js -t node14-win-x64 --public
checkUpdate({
    name: pkg.name,
    currentVersion: pkg.version,
    user: 'micr0dust',
    branch: 'main'
}, function(err, latestVersion, defaultMessage) {
    if (!err) {
        if (latestVersion != pkg.version) {
            console.log("\x1b[44m");
            console.log("\x1b[0m");
            console.log("\x1b[44m  \x1b[0m");
            console.log(`\x1b[44m  \x1b[0m     \x1b[33mNew releases! \x1b[32m(${latestVersion})`);
            console.log("\x1b[44m  \x1b[0m     \x1b[0mhttps://github.com/micr0dust/quizlet-auto-crack");
            console.log("\x1b[44m  \x1b[0m\n\x1b[44m");
            console.log("\x1b[0m");
        } else if (latestVersion == pkg.version) {
            console.log("\x1b[42m");
            console.log("\x1b[0m");
            console.log("\x1b[42m  \x1b[0m");
            console.log(`\x1b[42m  \x1b[0m     \x1b[33mAlready the latest version! \x1b[32m(${latestVersion})`);
            console.log("\x1b[42m  \x1b[0m     \x1b[0mhttps://github.com/micr0dust/quizlet-auto-crack");
            console.log("\x1b[42m  \x1b[0m\n\x1b[42m");
            console.log("\x1b[0m");
        }
    } else {
        console.log("\x1b[41m");
        console.log("\x1b[0m");
        console.log("\x1b[41m  \x1b[0m");
        console.log(`\x1b[41m  \x1b[0m     \x1b[33mAn error occurred in version detection, please check whether the current version is the latest`);
        console.log("\x1b[41m  \x1b[0m     \x1b[0mhttps://github.com/micr0dust/quizlet-auto-crack");
        console.log("\x1b[41m  \x1b[0m\n\x1b[41m");
        console.log("\x1b[0m");
    }
(async() => {
    const browser = await puppeteer.launch({
        headless: true,
        devtools: true
    });
    const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36";
    console.log(userAgent);
    console.log("\n");
    console.log("  /$$$$$$            /$$           /$$             /$$");
    console.log(" /$$__  $$          |__/          | $$            | $$");
    console.log("| $$  \\ $$ /$$   /$$ /$$ /$$$$$$$$| $$  /$$$$$$  /$$$$$$");
    console.log("| $$  | $$| $$  | $$| $$|____ /$$/| $$ /$$__  $$|_  $$_/");
    console.log("| $$  | $$| $$  | $$| $$   /$$$$/ | $$| $$$$$$$$  | $$");
    console.log("| $$/$$ $$| $$  | $$| $$  /$$__/  | $$| $$_____/  | $$ /$$");
    console.log("|  $$$$$$/|  $$$$$$/| $$ /$$$$$$$$| $$|  $$$$$$$  |  $$$$/");
    console.log(" \\____ $$$ \\______/ |__/|________/|__/ \\_______/   \\___/");
    console.log("      \\__/        -- Auto get Quizlet Plus 30 days --");
    console.log("                                           -Made by Microdust\n\n");
    try {
        console.log("Trying to get temporary email ...");
        const emailPage = await browser.newPage();
        await emailPage.setUserAgent(userAgent);
        const email1 = await getNewEmail(emailPage);
        console.log(`Got mail address: \x1b[33m${email1}\x1b[0m`);
        
        const quizletPage1 = await browser.newPage();
        await quizletPage1.setUserAgent(userAgent);
        await quizletPage1.goto("https://quizlet.com/sign-up");
        const account = await createAccount(quizletPage1,email1);
        const inviteCode = await getInviteCode(quizletPage1);
        await verifyEmail(emailPage);
        
        const context = await browser.createIncognitoBrowserContext();

        const emailPage2 = await context.newPage();
        await emailPage2.setUserAgent(userAgent);
        const email2 = await getNewEmail(emailPage2);
        console.log(`Got mail address: \x1b[33m${email2}\x1b[0m`);
        const quizletPage2 = await context.newPage();
        await quizletPage2.setUserAgent(userAgent);
        await quizletPage2.goto(inviteCode);
        await quizletPage2.waitForSelector('div.PrismicCallToAction--container > a');
        await quizletPage2.click('div.PrismicCallToAction--container > a');
        const account2 = await createAccount(quizletPage2,email2);
        await verifyEmail(emailPage2);
        console.log(account);
        
        //await emailpage.bringToFront();
        await browser.close();
        //await page.screenshot({ path: 'result.png' });
    } catch (error) {
        console.log(error);
    }
})();
});
async function getNewEmail(page){
    await page.bringToFront();
    await page.goto('https://10minutemail.net/new.html');
    await page.waitForTimeout(1000);
    await page.waitForSelector('#fe_text');
    return await page.evaluate(async() => {
        return document.querySelector('#fe_text').value;
    });
}
async function createAccount(page,email){
    await page.bringToFront();
    //await page.waitForTimeout(1000);
    try {
        await page.evaluate(async() => {
            document.querySelector('button[aria-label="Continue with email"]').click();
        });
    } catch (error) {
    }
    console.log("Trying to register with email ...");
    const yearStr=(new Date().getFullYear()-23).toString();
    const monthStr=(Math.floor((Math.random() * 12) + 1)).toString();
    const dayStr=(Math.floor((Math.random() * 28) + 1)).toString();
    // await page.evaluate(async() => {
    //     document.querySelector('body > div:nth-child(11) > div > div > div.c1i2nkrh > section > div.a1731mpn > div > form > div.b19yogmb > div > div > div > div:nth-child(1) > select').value = yearStr;
    // });
    await page.waitForSelector('select[name="birth_year"]');
    await page.select('select[name="birth_year"]', yearStr);
    await page.waitForSelector('select[name="birth_month"]');
    await page.select('select[name="birth_month"]', monthStr);
    await page.waitForSelector('select[name="birth_day"]');
    await page.select('select[name="birth_day"]', dayStr);
    await page.waitForSelector('#email');
    await page.type('#email', email);
    console.log(`Account (Email): \x1b[33m${email}\x1b[0m`);
    const password = "1Ju5tWantAn5wer";
    await page.waitForSelector('#password1');
    await page.type('#password1', password);
    console.log(`Password: \x1b[33m${password}\x1b[0m`);
    try {
        await page.click('input[name="is_free_teacher"]');
    } catch {
        await page.click('#is_teacher');
    }
    console.log("Choose the teacher identity...");
    await page.waitForSelector('input[name="TOS"]');
    //await page.waitForTimeout(1000000);
    //await page.click('input[name="TOS"]');
    await page.evaluate(async() => {
        document.querySelector('input[name="TOS"]').click();
    });
    console.log("Accept policy...");
    await page.waitForSelector('button[type="submit"]:not([disabled])');
    await page.click('button[type="submit"]');
    console.log("Register finish");
    try {
        await page.waitForSelector('button[aria-label="Create class"]');
    } catch (error) {
    }
    //await page.waitForTimeout(1000000);
    return {
        email: email,
        name: email.split('@')[0],
        password: password
    }
}
async function getInviteCode(page){
    await page.goto('https://quizlet.com/refer-a-teacher');
    console.log("Getting invite code");
    await page.waitForSelector('input.AssemblyInput-input[readonly]');
    const inviteCode = await page.evaluate(async() => {
        return document.querySelector('input.AssemblyInput-input[readonly]').value;
    });
    console.log("invite code got");
    return inviteCode;
}
async function verifyEmail(page){
    await page.bringToFront();
    console.log("Wait for verify mail from Quizlet...");
    if (!(await checkEmailFn())) {
        while (!(await checkEmailFn()));
    }
    async function checkEmailFn() {
        let count = 0;
        if (count === 60) {
            await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
            console.log("Refreshing website and waiting for mail...");
            count = 0;
        }
        await page.waitForTimeout(1000);
        count++;
        let success = await page.evaluate(async() => {
            let mailer = document.querySelector('#maillist > tbody > tr:nth-child(2) > td:nth-child(1) > a');
            if (mailer.innerText != "Quizlet <account@account.quizlet.com>") return false;
            if (mailer.innerText === "Quizlet <account@account.quizlet.com>") mailer.click();
            return true;
        });
        return success;
    }
    console.log("Received verify mail");
    await page.waitForNavigation();
    await page.waitForSelector('td.em_defaultlink.em_cta > a');
    //await page.click('td.em_defaultlink.em_cta > a');
    const verifyLink = await page.evaluate(async() => {
        return document.querySelector('td.em_defaultlink.em_cta > a').href;
    });
    await page.goto(verifyLink);
    console.log("Click for verify");
    await page.waitForSelector('.UILink');
    console.log("\x1b[32msuccess\x1b[0m");
    
}
