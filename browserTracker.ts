import { Browser, chromium } from 'playwright';



const openBrowsers: Browser[] = [];

export function addBrowser(browser: Browser) {
    openBrowsers.push(browser);
}

export async function closeAllBrowsers() {
    for (const browser of openBrowsers) {
        await browser.close();
    }
    openBrowsers.length = 0;
}


