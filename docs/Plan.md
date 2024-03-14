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

[![](https://mermaid.ink/img/pako:eNpVkVFPgzAQx79Kc6_CBCwMeDABliwzM5nDJ8GYOjrWCO0sbXQufHcL28zsQ3v37-_-be6OsBEVhRhqSfY7tFyXvNPvp-SZaMlQMR6vJUdmJUUuGlY95Oec8moMrqrm2QoVZjsTabHWnULJanEWsmIlOlVLmj8tT9JoUvLZcS5E3VCUs5rbC94PYoJsW3dUvinxQTm6QZJ-atop275HaclTc10RRYY0ufCoETXjaNBmxvafwx84VNZU3SpJeLcVskWDD_piaof-yGwgs6s3UrCgpbIlrDI9Ow7fL0HtaEtLiE1Y0S3RjSqh5L1BiVYiP_ANxEpqaoHeGyM6Y8S0qoV4S5rOqHvCX4RoL5BJIT7CN8Su706iu9AN_amDvShyAgsOEHvYyNjxfRcHnh8GXm_Bz2jgTKbONDJo4AU4wCHGFtCKKSEfT1Meh93_AhHYnD8?type=png)](https://mermaid.live/edit#pako:eNpVkVFPgzAQx79Kc6_CBCwMeDABliwzM5nDJ8GYOjrWCO0sbXQufHcL28zsQ3v37-_-be6OsBEVhRhqSfY7tFyXvNPvp-SZaMlQMR6vJUdmJUUuGlY95Oec8moMrqrm2QoVZjsTabHWnULJanEWsmIlOlVLmj8tT9JoUvLZcS5E3VCUs5rbC94PYoJsW3dUvinxQTm6QZJ-atop275HaclTc10RRYY0ufCoETXjaNBmxvafwx84VNZU3SpJeLcVskWDD_piaof-yGwgs6s3UrCgpbIlrDI9Ow7fL0HtaEtLiE1Y0S3RjSqh5L1BiVYiP_ANxEpqaoHeGyM6Y8S0qoV4S5rOqHvCX4RoL5BJIT7CN8Su706iu9AN_amDvShyAgsOEHvYyNjxfRcHnh8GXm_Bz2jgTKbONDJo4AU4wCHGFtCKKSEfT1Meh93_AhHYnD8)

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
