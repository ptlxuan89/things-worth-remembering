/**
 * GoatCounter site code. Currently disabled — views moved to the Worker.
 * To re-enable the GoatCounter dashboard, set this back to 'xuan'.
 */
export const GOATCOUNTER_CODE = '';

/**
 * Cloudflare Worker that stores heart + view counts.
 * Endpoints: GET/POST {HEARTS_API}/hearts/<id> and {HEARTS_API}/views/<id>
 */
export const HEARTS_API = 'https://hearts.ptlxuan-89.workers.dev';
