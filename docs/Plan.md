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

### Diagram

[![](https://mermaid.ink/img/pako:eNpVkVFPgzAQx79Kc6_CBCwMeDABliwzM5nDJ8GYOjrWCO0sbXQufHcL28zsQ3v37-_-be6OsBEVhRhqSfY7tFyXvNPvp-SZaMlQMR6vJUdmJUUuGlY95Oec8moMrqrm2QoVZjsTabHWnULJanEWsmIlOlVLmj8tT9JoUvLZcS5E3VCUs5rbC94PYoJsW3dUvinxQTm6QZJ-atop275HaclTc10RRYY0ufCoETXjaNBmxvafwx84VNZU3SpJeLcVskWDD_piaof-yGwgs6s3UrCgpbIlrDI9Ow7fL0HtaEtLiE1Y0S3RjSqh5L1BiVYiP_ANxEpqaoHeGyM6Y8S0qoV4S5rOqHvCX4RoL5BJIT7CN8Su706iu9AN_amDvShyAgsOEHvYyNjxfRcHnh8GXm_Bz2jgTKbONDJo4AU4wCHGFtCKKSEfT1Meh93_AhHYnD8?type=png)](https://mermaid.live/edit#pako:eNpVkVFPgzAQx79Kc6_CBCwMeDABliwzM5nDJ8GYOjrWCO0sbXQufHcL28zsQ3v37-_-be6OsBEVhRhqSfY7tFyXvNPvp-SZaMlQMR6vJUdmJUUuGlY95Oec8moMrqrm2QoVZjsTabHWnULJanEWsmIlOlVLmj8tT9JoUvLZcS5E3VCUs5rbC94PYoJsW3dUvinxQTm6QZJ-atop275HaclTc10RRYY0ufCoETXjaNBmxvafwx84VNZU3SpJeLcVskWDD_piaof-yGwgs6s3UrCgpbIlrDI9Ow7fL0HtaEtLiE1Y0S3RjSqh5L1BiVYiP_ANxEpqaoHeGyM6Y8S0qoV4S5rOqHvCX4RoL5BJIT7CN8Su706iu9AN_amDvShyAgsOEHvYyNjxfRcHnh8GXm_Bz2jgTKbONDJo4AU4wCHGFtCKKSEfT1Meh93_AhHYnD8)

### Appen

Appen blir en mobil/desktop app

Features:

- Timeføring i tabell

- Stemplingsur

- Historikk på timeføring

- Mulighet for å sette standard verdier i profil

- Kalkulere tall for føring i agresso
