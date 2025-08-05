import { load } from "cheerio";
import { writeFile } from "node:fs/promises";
import { join } from "path";
export type fetchAndSaveQRCodeReturn = Promise<{
    final_path: string;
}>;
export async function fetchAndSaveQRCode(target_url: string, download_dir: string): fetchAndSaveQRCodeReturn {
    const res = await fetch(target_url);
    if (!res.ok) {
        throw new Error(`Failed to fetch ${target_url}: ${res.status} ${res.statusText}`);
    }
    const html = await res.text();
    const cheer = load(html, {});

    const dataImgs = cheer("img")
        // const dataImgs = cheer('img[src^="data:image/png;base64"]')
        .toArray()
        .map((el) => cheer(el).attr("src")!);

    if (dataImgs.length < 2) {
        throw new Error(`Expected at least 2 base64 PNG images, but found ${dataImgs.length}`);
    }

    const secondDataUri = dataImgs[1];
    const base64 = secondDataUri.split(",", 2)[1];
    if (!base64) {
        throw new Error("Malformed data URI");
    }
    const buffer = Buffer.from(base64, "base64");

    const final_path = join(download_dir, "img.png");
    await writeFile(final_path, buffer);

    return { final_path };
}
