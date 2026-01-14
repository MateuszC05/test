# Szablon Planu Testów Wydajnościowych (Jira Plugin)

**Data:** YYYY-MM-DD
**Autor:** [Twoje Imię]
**Środowisko:** [DC / Cloud]

## 1. Cel Testów
*Co chcemy osiągnąć? (np. Sprawdzenie stabilności przy 1000 użytkownikach, czas odpowiedzi endpointu X < 200ms)*
- [ ] Cel 1: ...
- [ ] Cel 2: ...

## 2. Konfiguracja Środowiska
* **URL Instancji:** ...
* **Wersja Pluginu:** ...
* **Specyfikacja Maszyny (dla DC):** (np. 4 CPU, 16GB RAM)

## 3. Scenariusze Testowe (User Journeys)

### Scenariusz A: Podstawowe Użycie
*Opis: Użytkownik wchodzi na issue i ładuje panel pluginu.*
1. Logowanie.
2. Otwarcie Issue (GET /browse/KEY-1).
3. Pobranie danych pluginu (GET /rest/my-plugin/1.0/data).

### Scenariusz B: Obciążenie Zapisu
*Opis: 10% użytkowników wykonuje akcję zapisu.*
1. POST /rest/my-plugin/1.0/save
2. Weryfikacja statusu 200.

## 4. Profil Obciążenia (Load Profile)
*Jakim ruchem będziemy testować?*

| Faza | Czas trwania | Target VUs (Wirtualni Użytkownicy) | Opis |
|------|--------------|------------------------------------|------|
| Ramp-up | 2m | 0 -> 50 | Rozgrzewka |
| Steady State | 10m | 50 | Utrzymanie stałego ruchu |
| Ramp-up 2 | 2m | 50 -> 200 | Test przeciążeniowy (Stress Test) |
| Peak | 5m | 200 | Szczytowe obciążenie |
| Ramp-down | 1m | 200 -> 0 | Wyłączenie |

## 5. Kryteria Akceptacji (Thresholds)
*Kiedy uznajemy test za nieudany?*
- [ ] **http_req_duration (p95):** < 500ms
- [ ] **http_req_failed:** < 1%
- [ ] **CPU Usage (DC):** < 80%

## 6. Wyniki i Wnioski
*(Do wypełnienia po testach)*
* Raport HTML: [Link do pliku]
* Znalezione wąskie gardła: ...
