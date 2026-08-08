/**
 * GoatCounter site code (the "xxx" in https://xxx.goatcounter.com).
 * Leave empty to disable view tracking.
 */
export const GOATCOUNTER_CODE = 'xuan';

/**
 * Cloudflare Worker that stores synced heart counts.
 * Endpoints: GET/POST {HEARTS_API}/hearts/<post-id>
 * Leave empty to fall back to device-local hearts.
 */
export const HEARTS_API = 'https://hearts.ptlxuan-89.workers.dev';
