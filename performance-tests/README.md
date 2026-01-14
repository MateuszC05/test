# Testy Wydajnościowe Pluginu AppTime (Jira)

Ten katalog zawiera konfigurację testów wydajnościowych opartych na narzędziu **k6**, dedykowanych dla wtyczki **AppTime**.
Testy weryfikują stabilność i szybkość działania kluczowych funkcji wtyczki (np. wyświetlanie timesheetu, logowanie czasu).

## 1. Wymagania

*   Zainstalowane [k6](https://k6.io/docs/get-started/installation/)
    *   MacOS: `brew install k6`
    *   Windows: `winget install k6` lub pobierz instalator
    *   Linux: `sudo apt-get install k6`

## 2. Struktura Katalogów

*   `main_test.js`: Główny plik konfiguracyjny (stages, thresholds).
*   `scenarios/apptime_scenario.js`: **Logika testów AppTime**. Tutaj zdefiniowane są konkretne zapytania (GET Timesheet, POST Worklog).
*   `lib/`: Pliki pomocnicze (config, utils).

## 3. Konfiguracja i Uruchamianie

Testy są przygotowane pod Jira DC oraz Cloud.

### Zmienne Środowiskowe
| Zmienna | Opis | Przykład |
|---------|------|----------|
| `BASE_URL` | Adres instancji Jira | `https://jira.example.com` |
| `JIRA_USER` | Login (DC) lub Email (Cloud) | `admin` |
| `JIRA_TOKEN`| Hasło (DC) lub API Token (Cloud) | `secret123` |
| `IS_CLOUD` | Czy to chmura? (true/false) | `false` |

### Przykładowe Uruchomienie (Jira DC)

```bash
k6 run \
  -e BASE_URL="http://localhost:8080" \
  -e JIRA_USER="admin" \
  -e JIRA_TOKEN="admin" \
  performance-tests/main_test.js
```

### Przykładowe Uruchomienie (Jira Cloud)

```bash
k6 run \
  -e BASE_URL="https://my-site.atlassian.net" \
  -e JIRA_USER="jan@example.com" \
  -e JIRA_TOKEN="AbCdEf123456" \
  -e IS_CLOUD="true" \
  performance-tests/main_test.js
```

## 4. Dostosowanie Testów pod AppTime

Aby testy działały poprawnie, musisz upewnić się, że endpointy w pliku `scenarios/apptime_scenario.js` odpowiadają tym rzeczywistym w Twojej aplikacji.

1.  Edytuj `performance-tests/scenarios/apptime_scenario.js`.
2.  Znajdź sekcję `TODO`.
3.  Zmień przykładowy URL `/rest/apptime/1.0/timesheet` na faktyczny adres REST API, z którego korzysta Twój frontend AppTime.
4.  Dostosuj payload JSON dla logowania czasu (`POST /worklog`).

## 5. Raportowanie

Wyniki zostaną zapisane w pliku `performance-tests/report.html`.
