### Torsdag

Viser seg at Google Logg-In krever statiske url-er for siden som trenger ccredentials, siden appen kompileres og krører lokalt vil serveren ha en ny adresse for hver device e.g. localhost/10.4.3.20/192.168.0.40

Så jeg trenger å sette opp enda et api slik at jeg kan bruke den til autentisering og kun bruke apiets adresse til Google Logg-In

Ny modell:

[![](https://mermaid.ink/img/pako:eNpVUl1PgzAU_SvNfdIIc8CYgwcT9pFlRpMpPkmN6cYdI0I7SxudC__dwj7c-tDee3p6Tu_N3cFSpAghZJJt1uTxhfJKL_bJK9MyJ0l7vFNOzIqSWBR5-hAfcuRpG5y9mo7mJDHbgTFMxkyxBauQRPPZARwlV3NRqUxi_Px4fQAnSaTV-p_ValM-3k2FyAokcZ5xe8brBoyIbesK5YcSn8jJDZH4pbFStn1PhpQPzXVqbJs0OvJJIbKckwabUD65RMbG6ELznHbmdFJsLDJUt0oyXq2ELEljSL5zU8JJYNQwR2efGYIFJcqS5anp-a6pk4JaY4kUQhOmuGK6UBQorw2VaSXiLV9CqKRGC_TGCOE4Z6bVJYQrVlQG3TD-JkR5JJkUwh38QOh0Atf1fd_zgkHQ9Zy-BVuD9vodt-u4nuN43l3P873agt9WoNsZBI7bM2y_G_gD13ctwDRXQj7tp6QdlvoPCtyunA?type=png)](https://mermaid.live/edit#pako:eNpVUl1PgzAU_SvNfdIIc8CYgwcT9pFlRpMpPkmN6cYdI0I7SxudC__dwj7c-tDee3p6Tu_N3cFSpAghZJJt1uTxhfJKL_bJK9MyJ0l7vFNOzIqSWBR5-hAfcuRpG5y9mo7mJDHbgTFMxkyxBauQRPPZARwlV3NRqUxi_Px4fQAnSaTV-p_ValM-3k2FyAokcZ5xe8brBoyIbesK5YcSn8jJDZH4pbFStn1PhpQPzXVqbJs0OvJJIbKckwabUD65RMbG6ELznHbmdFJsLDJUt0oyXq2ELEljSL5zU8JJYNQwR2efGYIFJcqS5anp-a6pk4JaY4kUQhOmuGK6UBQorw2VaSXiLV9CqKRGC_TGCOE4Z6bVJYQrVlQG3TD-JkR5JJkUwh38QOh0Atf1fd_zgkHQ9Zy-BVuD9vodt-u4nuN43l3P873agt9WoNsZBI7bM2y_G_gD13ctwDRXQj7tp6QdlvoPCtyunA)

### Mandag

Etter helgen ser nå modellen slik ut:

[![](https://mermaid.ink/img/pako:eNpNUtuO2yAQ_ZURT61qe21sx7FVVXKu2mqrpnWfalYVuxAHKYYUg7pplH8v2KkUHmDOBWaAuaBXxTiqUKfp6QBP34kc7MsEflCrBbTj8kwkuFG3jToK9rm5YS7ZGNzt2i530Lrp5li0K2roCx041LvHG7ls3-3UYDrNm29P72_kuq2tOdy5Nu3DTqu3MyETMSYjcnXZKtUdOXz1_quntm0jOhk-SjjRjj97qoYwtAPXvwSDD6D5b8sHE4afYEHkwmnMVeVhPZk_hiEkEWQRzCNIXOS1NZHrUcERpBGUToknZTUlgHyCW1eCh7MJbojceFhMcHxAn8bn7bh5MJrKYa90D74K-CPctQXz1qW3Le_KW6AA9Vz3VDD3SRf_DgSZA-85QZULGd9TezQEEXl1VmqNas7yFVVGWx4ge3IH8ZWg7m96VO3pcXDsicqfSvX_TQ6i6oLeUJUWUYnxLJ4laZYUMU4CdEZVUiQRjhOM0zxLi1kaZ9cA_R0PiKN5meCsnJd5XOZznOMAcSaM0l-mthq76_oPqNW1Vg?type=png)](https://mermaid.live/edit#pako:eNpNUtuO2yAQ_ZURT61qe21sx7FVVXKu2mqrpnWfalYVuxAHKYYUg7pplH8v2KkUHmDOBWaAuaBXxTiqUKfp6QBP34kc7MsEflCrBbTj8kwkuFG3jToK9rm5YS7ZGNzt2i530Lrp5li0K2roCx041LvHG7ls3-3UYDrNm29P72_kuq2tOdy5Nu3DTqu3MyETMSYjcnXZKtUdOXz1_quntm0jOhk-SjjRjj97qoYwtAPXvwSDD6D5b8sHE4afYEHkwmnMVeVhPZk_hiEkEWQRzCNIXOS1NZHrUcERpBGUToknZTUlgHyCW1eCh7MJbojceFhMcHxAn8bn7bh5MJrKYa90D74K-CPctQXz1qW3Le_KW6AA9Vz3VDD3SRf_DgSZA-85QZULGd9TezQEEXl1VmqNas7yFVVGWx4ge3IH8ZWg7m96VO3pcXDsicqfSvX_TQ6i6oLeUJUWUYnxLJ4laZYUMU4CdEZVUiQRjhOM0zxLi1kaZ9cA_R0PiKN5meCsnJd5XOZznOMAcSaM0l-mthq76_oPqNW1Vg)

1. `SolidJS` spør `Auth API` om login lenke og setter redirect til `Proxy` urlen

2. `Auth API` spør `Google OAuth` om login lenke

3. `Google OAuth` responderer med en login lenke

4. `Auth API` gir login lenke til `SolidJS`

5. `SolidJS` navigerer til `Sign-In page`

6. `Sign-In page` er ferdig og redirecter til `Proxy` og legger på hash med brukerinfo

7. `Proxy` tar egen hash og legger på redirect til `Tauri` applikasjonen

8. `SolidJS` henter ut `access_token` fra hash og sender den til `Auth API`

9. `Auth API` spør `Google OAuth` om brukerinfo med `access_token`et

10. `Google OAuth` responderer med informasjon om brukeren inkl sub (subject) som er et unikt tall som identifiserer brukeren

11. `Auth API` gir brukerinfo til `SolidJS`

Brukeren er nå logget inn og applikasjonen har bruker id-en

Begrunnelse for Proxy servicen er at Google ikke tillater redirects til webviews og må derfor gjennom en proxy før den kommer til appen

Satte opp en PostgreSQL instans på GCP og fikk ikke til å koble meg på uansett hva jeg gjorde, viser seg at alt jeg måtte gjøre var å vente fem timer og prøve igjen.

### Tirsdag

Viser seg at jeg fortsatt ikke kan koble meg opp på databasen på jobb

HK nettet blokkerer visst tcp/ip tilkoblinger så nå sitter jeg på gjestenett

Diagram over databasestrukturen:

![image](https://github.com/Lartrax/test-fagprove-1/assets/89910638/adb056aa-d66d-437f-9dd6-1e6d5a1f35f8)

