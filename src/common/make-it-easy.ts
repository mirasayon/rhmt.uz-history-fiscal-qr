import puppeteer from "puppeteer";
import { GrabNeededSiteUrl } from "#/common/find-needed-site-url.js";
import { join } from "node:path";
import { PathsConfig } from "#/configs/paths.js";
import { fetchAndSaveQRCode } from "#/common/download-qr.js";
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import type { Doit_ReturnType } from "#/types/app.js";
import { timeout } from "#/configs/settings.js";

export async function MakeItEasy(target: string): Doit_ReturnType {
    const browser = await puppeteer.launch({ timeout: timeout });

    const { res, segment } = await GrabNeededSiteUrl(browser, target);

    const Path = join(PathsConfig.static, "qrcodes", segment);
    if (!existsSync(Path)) {
        await mkdir(Path, { recursive: true });
    }
    const { final_path } = await fetchAndSaveQRCode(res, Path);

    await browser.close();
    return {
        final_path,
        segment,
        target,
    };
}
