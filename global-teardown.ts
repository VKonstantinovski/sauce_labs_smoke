import { closeAllBrowsers } from './browserTracker';

export default async function globalTeardown() {
    await closeAllBrowsers();
}
