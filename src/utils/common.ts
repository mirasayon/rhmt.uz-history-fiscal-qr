import delay from "delay";
import { rm } from "node:fs/promises";
/** Lazy deleting folder */
export const deleteFolderLazy = (path: string): void => {
    const main = async () => {
        await delay(2000);
        await rm(path, { recursive: true, force: true });
    };
    main();
};
