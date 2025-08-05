import { timeout } from "#/configs/settings.js";
import type puppeteer from "puppeteer";

export async function GrabNeededSiteUrl(
    browser: puppeteer.Browser,
    url: string,
): Promise<{ res: string; segment: string }> {
    const page = await browser.newPage();
    try {
        await page.goto(url, { waitUntil: "load", timeout: timeout });
        const divElement = await page.$(
            `#app > div > div.flex.flex-col.gap-2.text-center > div.bg-primary.gap-1.flex.border.border-primary.items-center.justify-center.p-5.px-1.w-full.rounded-2xl.text-white`,
        );
        if (!divElement) {
            throw new Error("Div not found");
        }
        await divElement.click();

        const currentTarget = page.target();
        const newPageTarget = await browser.waitForTarget((target) => target.opener() === currentTarget, {
            timeout: timeout,
        });
        const newPage = await newPageTarget.page();
        if (!newPage) {
            throw new Error("no new page");
        }

        const websiteB = newPage.url();
        await newPage.close();

        const segment = websiteB.split("https://ofd.soliq.uz/epi?")[1];
        if (!segment.includes("t=")) {
            throw new Error("Invalid url");
        }
        return { res: websiteB, segment };
    } catch (err) {
        throw err;
    } finally {
        await page.close();
    }
}
