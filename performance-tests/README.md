# Testy Wydajnościowe Pluginu Jira (k6)

Ten katalog zawiera konfigurację testów wydajnościowych opartych na narzędziu **k6**.
Testy są przystosowane do działania zarówno na środowisku **Jira Data Center (DC)** jak i **Jira Cloud**.

## 1. Wymagania

*   Zainstalowane [k6](https://k6.io/docs/get-started/installation/)
    *   MacOS: `brew install k6`
    *   Windows: `winget install k6` lub pobierz instalator
    *   Linux: `sudo apt-get install k6`

## 2. Struktura Katalogów

*   `main_test.js`: Główny punkt wejścia. Tutaj konfigurujesz `stages` (ilość użytkowników, czas trwania) i `thresholds` (warunki zaliczenia testu).
*   `scenarios/`: Katalog ze scenariuszami testowymi (logika biznesowa).
    *   `template_scenario.js`: Przykładowy scenariusz. Edytuj go, aby dodać zapytania do swojego pluginu.
*   `lib/`: Pliki pomocnicze.
    *   `config.js`: Obsługa zmiennych środowiskowych.
    *   `utils.js`: Helpery (np. autoryzacja).
*   `TEST_PLAN_TEMPLATE.md`: Szablon do planowania testów przed napisaniem kodu.

## 3. Konfiguracja i Uruchamianie

Testy konfigurujemy za pomocą zmiennych środowiskowych. Nie wpisuj haseł bezpośrednio w kodzie!

### Jira Data Center (DC)
Używamy loginu i hasła.

```bash
k6 run \
  -e BASE_URL="https://jira.twoja-firma.com" \
  -e JIRA_USER="admin" \
  -e JIRA_TOKEN="tajneHaslo" \
  performance-tests/main_test.js
```

### Jira Cloud
Używamy adresu email i API Tokena (nie hasła do konta!).
Token wygenerujesz tutaj: https://id.atlassian.com/manage-profile/security/api-tokens

```bash
k6 run \
  -e BASE_URL="https://twoja-instancja.atlassian.net" \
  -e JIRA_USER="user@example.com" \
  -e JIRA_TOKEN="TwójApiToken123" \
  -e IS_CLOUD="true" \
  performance-tests/main_test.js
```

## 4. Raportowanie

Po zakończeniu testu, w katalogu `performance-tests` pojawi się plik **`report.html`**.
Otwórz go w przeglądarce, aby zobaczyć wykresy i szczegółowe statystyki.

## 5. Jak dodać własne testy?

1.  Otwórz `performance-tests/scenarios/template_scenario.js`.
2.  Zidentyfikuj endpointy REST API swojego pluginu (np. używając Network tab w przeglądarce).
3.  Dodaj wywołania `http.get` lub `http.post` wewnątrz funkcji `runScenario`.
4.  Dodaj asercje (`check`), aby upewnić się, że plugin zwraca poprawne dane.

Przykład:
```javascript
let res = http.get(`${config.baseUrl}/rest/my-plugin/1.0/tasks`, params);
check(res, { 'tasks loaded': (r) => r.status === 200 });
```

## 6. Integracja z CI/CD (np. GitHub Actions / Bitbucket Pipelines)

Możesz uruchamiać testy automatycznie.

Przykład (bash):
```bash
# Zainstaluj k6 (jeśli nie ma w obrazie)
# Uruchom test
k6 run performance-tests/main_test.js
# Wynik (exit code) zdecyduje czy pipeline przejdzie (zależnie od thresholds)
```
