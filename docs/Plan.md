# Plan

### Oppgaven

Å lage et system som hjelper brukeren med å holde styr på timeføring gjennom en uke, med mulighet for å se tilbake på tidligere førte uker.

---

### Teknologier

#### Tauri

Tauri er et rammeverk for tverrplattform kompilering slik at appen kan kjøre nesten hvor som helst. Tauri gir også tilgang til native-performance ved å la frontend kalle på funksjoner som har blitt kompilert til maskinkode.

Brukes til å servere frontend i format av en app.

#### SolidJS

SolidJS er et JavaScript web rammeverk som er utrolig raskt og enkelt å bruke. Det kan ligne på React og bruker TSX filer.

Brukes til frontend og håndterer reaktivitet i designet.

#### Ntex

Ntex er et rammeverk for å skrive http-tjenester i Rust

Skal brukes som backend tjeneste og kobling mot databasen med brukerdata.

#### PostgreSQL

PostgreSQL er en open source relasjonsdatabase.

Skal brukes til å lagre brukerens data som for eksempel timelister.

#### Google Sign-In

Er en tjenseste for å autentisere google brukere.

Skal brukes for å sikkert autentisere brukeren og gi meg en token som brukerdata kan kobles mot, slik at brukeren kan logge inn på andre enheter og fortsatt få dataene sine.

---

### Data Diagram

[![](https://mermaid.ink/img/pako:eNpVkV1PgzAUhv9Kc640wgQEBlyYAEuWmZnM4ZVgTB0da4R2ljZ-EP67hX1k9qI95-1z3jbndLDhJYEIKoH3O7RcF6xV74fkGStBUT4erwVDesV5xmtaPmTHnLByDC6q5ukK5Xo7Ekm-Vq1E8WpxFNL8asVbWQmSPS2vD-JoU7BZN-e8qgnKaMXMBesHMUamqVoi3iT_IAzdIEE-FWmlad6jpGCJvi6xxEMan3hU84oyNGgzbfvP4QwOlRWRt1Jg1m65aNDgg76o3KEzmQ5kevFGAgY0RDSYlrpr3fD9AuSONKSASIcl2WJVywIK1msUK8mzH7aBSApFDFB7bURmFOtmNRBtcd1qdY_ZC-fNCdIpRB18Q2R79iS8C-zAm1quE4aWb8APRI6rZdfyPNv1HS_wnd6A39HAmkytaahR3_Fd3w1c1wBSUsnF42HO47j7P9gSnJA?type=png)](https://mermaid.live/edit#pako:eNpVkV1PgzAUhv9Kc640wgQEBlyYAEuWmZnM4ZVgTB0da4R2ljZ-EP67hX1k9qI95-1z3jbndLDhJYEIKoH3O7RcF6xV74fkGStBUT4erwVDesV5xmtaPmTHnLByDC6q5ukK5Xo7Ekm-Vq1E8WpxFNL8asVbWQmSPS2vD-JoU7BZN-e8qgnKaMXMBesHMUamqVoi3iT_IAzdIEE-FWmlad6jpGCJvi6xxEMan3hU84oyNGgzbfvP4QwOlRWRt1Jg1m65aNDgg76o3KEzmQ5kevFGAgY0RDSYlrpr3fD9AuSONKSASIcl2WJVywIK1msUK8mzH7aBSApFDFB7bURmFOtmNRBtcd1qdY_ZC-fNCdIpRB18Q2R79iS8C-zAm1quE4aWb8APRI6rZdfyPNv1HS_wnd6A39HAmkytaahR3_Fd3w1c1wBSUsnF42HO47j7P9gSnJA)

---

### Appen

Appen blir en mobil/desktop app

Jag har planlagt å legge til:

- Timeføring i tabell

- Stemplingsur

- Historikk på timeføring

- Kalkulere tall for føring i agresso

- Profilside med preferanser

- Mulighet for å legge til timekoder

---

### Tidsbruk

Jeg håper at det vil være enkelt å sette opp Google Sign-In.

Databaser har jeg ikke jobbet mye med så tidsbruken der kan lett gå opp til 30%, men hvis jeg bruker litt ekstra tid på å skissere opp en god datamodellen så regner jeg med at det skal gå fint.

[![](https://mermaid.ink/img/pako:eNo9kE9rwzAMxb9K0Dkrjmvnj2-DspHDYNDb8MWt1dQssYPjwLqQ7z4tI9NJ76enh9AC12ARFIwOs-RSj1lrEfuehJ0ucf7UPqPS8BKDT-ithkxlQu74-b3dyJHt5GSSuZgJN8z_8WsIHaWfXeefWr8NKQRyGDAOxlm6Yfn1akh3HGhbUWvxZuY-adB-JauZUzg__BVUijPmMI_WJDw500UzgLqZfiI6Gv8RwrCbSIJa4AtUIYtDc6yLWlZM8KZhZQ4PUFwQFkzKQpRc1iVfc_jeAtihYlVD1pKXohS1EDmgdSnEt7-vbc9bfwBjTV_B?type=png)](https://mermaid.live/edit#pako:eNo9kE9rwzAMxb9K0Dkrjmvnj2-DspHDYNDb8MWt1dQssYPjwLqQ7z4tI9NJ76enh9AC12ARFIwOs-RSj1lrEfuehJ0ucf7UPqPS8BKDT-ithkxlQu74-b3dyJHt5GSSuZgJN8z_8WsIHaWfXeefWr8NKQRyGDAOxlm6Yfn1akh3HGhbUWvxZuY-adB-JauZUzg__BVUijPmMI_WJDw500UzgLqZfiI6Gv8RwrCbSIJa4AtUIYtDc6yLWlZM8KZhZQ4PUFwQFkzKQpRc1iVfc_jeAtihYlVD1pKXohS1EDmgdSnEt7-vbc9bfwBjTV_B)

[![](https://mermaid.ink/img/pako:eNo9kMFuhCAQhl-FzNlukEVUbk02bTw0abK3hgu7zLpEBYOYdGt891I3dk7M938MZBa4eoMgYbRIoo09kqbrkFiD2PeJmOkS5k45kkrBW_AuojMKiCTHYsevn81G2D856agvesKnSHf87n2bnjjb1r00bgvzFEIGA4ZBW5N-svzJCuIdh3RdpqPBm577qEC5Nal6jv78cFeQMcyYwTwaHfFkdRv0APKm-ynRUbsv74ddSi3IBb5B5kV-qI9VXhUl5ayuqcjgAZLxhDktipwLVlSCrRn8bAPooaRlnVTBBBe84jwDNDb68PHc3bbC9RfxQmG1?type=png)](https://mermaid.live/edit#pako:eNo9kMFuhCAQhl-FzNlukEVUbk02bTw0abK3hgu7zLpEBYOYdGt891I3dk7M938MZBa4eoMgYbRIoo09kqbrkFiD2PeJmOkS5k45kkrBW_AuojMKiCTHYsevn81G2D856agvesKnSHf87n2bnjjb1r00bgvzFEIGA4ZBW5N-svzJCuIdh3RdpqPBm577qEC5Nal6jv78cFeQMcyYwTwaHfFkdRv0APKm-ynRUbsv74ddSi3IBb5B5kV-qI9VXhUl5ayuqcjgAZLxhDktipwLVlSCrRn8bAPooaRlnVTBBBe84jwDNDb68PHc3bbC9RfxQmG1)

---

### Planen

Jeg tenker å starte med å få Google Sign-In til å fungere og få ut en bruker token.

Deretter gjør jeg klar en basic frontend og setter opp et enkelt api.

Så starter jeg på å planlegge databasestrukturen og prøver å sette den opp.

Så bygger jeg ut frontend og api til des jeg kan bruke token til å lagre og hente data ut av databasen.

Så om alt fungerer så prioriteres appens features. Hvor jeg må designe alle sidene og sette opp tabeller i databasen for de forskjellige datatypene jeg vil trenge.
