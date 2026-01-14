// performance-tests/scenarios/apptime_scenario.js
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
    // --------------------------------------------------------------------------
    // Krok 1: Weryfikacja dostępności API Jira (Smoke Test)
    // Sprawdzamy, czy w ogóle mamy dostęp do API (np. /myself)
    // --------------------------------------------------------------------------
    let myselfUrl = `${config.baseUrl}/rest/api/2/myself`;
    let res = http.get(myselfUrl, params);

    check(res, { 'Jira API connected': (r) => r.status === 200 });
    checkResponse(res, 'Get Myself');

    // Krótka pauza (użytkownik wchodzi na dashboard)
    sleep(1);


    // --------------------------------------------------------------------------
    // Krok 2: Symulacja AppTime - Pobranie Timesheetu (READ)
    // Użytkownik otwiera panel AppTime, aby zobaczyć swoje godziny.
    // Endpoint: GET /rest/apptime/1.0/timesheet (Przykładowy endpoint)
    // --------------------------------------------------------------------------

    // TODO: Zmień ten URL na faktyczny endpoint Twojej wtyczki AppTime
    let timesheetUrl = `${config.baseUrl}/rest/apptime/1.0/timesheet?period=currentWeek`;

    let timesheetRes = http.get(timesheetUrl, params);

    // Jeśli endpoint jeszcze nie istnieje, k6 zwróci 404.
    // Zakładamy w teście, że chcemy 200.
    check(timesheetRes, {
        'AppTime Timesheet loaded (200)': (r) => r.status === 200,
        'Response time < 1s': (r) => r.timings.duration < 1000
    });

    // Opcjonalne logowanie błędów dla AppTime
    // checkResponse(timesheetRes, 'Get AppTime Timesheet');

    sleep(2); // Użytkownik przegląda grafik (2 sekundy)


    // --------------------------------------------------------------------------
    // Krok 3: Symulacja AppTime - Logowanie Czasu (WRITE)
    // Użytkownik dodaje wpis czasu pracy.
    // Endpoint: POST /rest/apptime/1.0/worklog
    // --------------------------------------------------------------------------

    // TODO: Dostosuj payload do wymagań AppTime
    let worklogPayload = JSON.stringify({
        issueKey: "TEST-1",
        timeSpent: "1h",
        date: new Date().toISOString().split('T')[0], // Dzisiejsza data YYYY-MM-DD
        comment: "Testy wydajnościowe k6"
    });

    let worklogUrl = `${config.baseUrl}/rest/apptime/1.0/worklog`;

    // Wykonujemy tylko jeśli testujemy zapis (można sterować zmienną, aby nie śmiecić w bazie ciągle)
    // Dla testu:
    let worklogRes = http.post(worklogUrl, worklogPayload, params);

    check(worklogRes, {
        'AppTime Worklog created (201/200)': (r) => r.status === 200 || r.status === 201
    });

    // checkResponse(worklogRes, 'Post AppTime Worklog');

    sleep(1);
}
