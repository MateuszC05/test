// performance-tests/lib/config.js

// Domyślne wartości konfiguracyjne.
// Można je nadpisać zmiennymi środowiskowymi (np. k6 run -e BASE_URL=... script.js)

export const config = {
    // URL do instancji Jira (DC lub Cloud)
    // np. https://my-jira-dc.internal lub https://my-site.atlassian.net
    baseUrl: __ENV.BASE_URL || 'http://localhost:8080',

    // Użytkownik (Login dla DC, Email dla Cloud)
    username: __ENV.JIRA_USER || 'admin',

    // Hasło (Hasło dla DC, API Token dla Cloud)
    // Dla Cloud wygeneruj token tutaj: https://id.atlassian.com/manage-profile/security/api-tokens
    password: __ENV.JIRA_TOKEN || 'admin',

    // Czy to środowisko Cloud? (Może wpływać na niektóre ścieżki API)
    isCloud: __ENV.IS_CLOUD === 'true',

    // Ustawienia wydajnościowe (domyślne)
    vus: 10, // Virtual Users
    duration: '30s',
};
