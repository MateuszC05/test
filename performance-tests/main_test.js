import { runScenario } from './scenarios/apptime_scenario.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// Konfiguracja scenariusza testowego (Options)
export const options = {
    // Progi akceptacji (Thresholds)
    thresholds: {
        http_req_failed: ['rate<0.01'], // Mniej niż 1% błędów ogólnie
        http_req_duration: ['p(95)<500'], // 95% zapytań szybciej niż 500ms

        // Specyficzne progi dla AppTime (przykład tagowania, wymagałby dodania tagów w requests)
        // Można też po prostu polegać na ogólnych, lub zdefiniować grupy.
    },
    // Definicja etapów obciążenia (Stages)
    stages: [
        { duration: '30s', target: 5 },   // Rozgrzewka (Ramp-up)
        { duration: '1m', target: 10 },   // Test właściwy (10 użytkowników klika w AppTime)
        { duration: '30s', target: 0 },   // Wygaszanie (Ramp-down)
    ],
};

// Główna funkcja uruchamiana przez każdego wirtualnego użytkownika (VU)
export default function () {
    runScenario();
}

// Generowanie raportu po zakończeniu testu
export function handleSummary(data) {
    return {
        "performance-tests/report.html": htmlReport(data),
    };
}
