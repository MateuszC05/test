// performance-tests/lib/utils.js
import { encoding } from 'k6';

/**
 * Tworzy nagłówek Basic Auth
 * Działa zarówno dla Jira DC (User:Pass) jak i Cloud (Email:ApiToken)
 */
export function getAuthHeader(username, password) {
    const encoded = encoding.b64encode(`${username}:${password}`);
    return `Basic ${encoded}`;
}

/**
 * Pomocnicza funkcja do logowania błędów w konsoli jeśli request się nie powiedzie
 */
export function checkResponse(res, contextName) {
    if (res.status >= 400) {
        console.error(`[${contextName}] Błąd: ${res.status} ${res.statusText} - ${res.url}`);
        // Opcjonalnie: log body odpowiedzi, jeśli nie jest za duże
        // console.error(res.body);
    }
}
