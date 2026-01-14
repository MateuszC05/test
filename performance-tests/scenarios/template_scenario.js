// performance-tests/scenarios/template_scenario.js
import http from 'k6/http';
import { check, sleep } from 'k6';
import { config } from '../lib/config.js';
import { getAuthHeader, checkResponse } from '../lib/utils.js';

// Nagłówki z autoryzacją
const params = {
    headers: {
        'Authorization': getAuthHeader(config.username, config.password),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
};

export function runScenario() {
    // 1. Przykład: Pobranie informacji o zalogowanym użytkowniku (myself)
    // To endpoint dostępny zarówno w DC jak i Cloud
    let url = `${config.baseUrl}/rest/api/2/myself`;

    let res = http.get(url, params);

    // Weryfikacja (Checks)
    check(res, {
        'status is 200': (r) => r.status === 200,
        'has correct display name': (r) => r.json('displayName') !== undefined,
    });

    checkResponse(res, 'Get Myself');

    // Symulacja czasu "myślenia" użytkownika (np. czytanie strony)
    sleep(1);

    // 2. Tutaj dodaj wywołania do TWOJEGO pluginu
    // let pluginUrl = `${config.baseUrl}/rest/my-plugin/1.0/something`;
    // let pluginRes = http.get(pluginUrl, params);
    // check(pluginRes, { 'plugin OK': (r) => r.status === 200 });
}
