### Torsdag

Viser seg at Google Logg-In krever statiske url-er for siden som trenger ccredentials, siden appen kompileres og krører lokalt vil serveren ha en ny adresse for hver device e.g. localhost/10.4.3.20/192.168.0.40

Så jeg trenger å sette opp enda et api slik at jeg kan bruke den til autentisering og kun bruke apiets adresse til Google Logg-In

Ny modell:

[![](https://mermaid.ink/img/pako:eNpVUl1PgzAU_SvNfdIIc8CYgwcT9pFlRpMpPkmN6cYdI0I7SxudC__dwj7c-tDee3p6Tu_N3cFSpAghZJJt1uTxhfJKL_bJK9MyJ0l7vFNOzIqSWBR5-hAfcuRpG5y9mo7mJDHbgTFMxkyxBauQRPPZARwlV3NRqUxi_Px4fQAnSaTV-p_ValM-3k2FyAokcZ5xe8brBoyIbesK5YcSn8jJDZH4pbFStn1PhpQPzXVqbJs0OvJJIbKckwabUD65RMbG6ELznHbmdFJsLDJUt0oyXq2ELEljSL5zU8JJYNQwR2efGYIFJcqS5anp-a6pk4JaY4kUQhOmuGK6UBQorw2VaSXiLV9CqKRGC_TGCOE4Z6bVJYQrVlQG3TD-JkR5JJkUwh38QOh0Atf1fd_zgkHQ9Zy-BVuD9vodt-u4nuN43l3P873agt9WoNsZBI7bM2y_G_gD13ctwDRXQj7tp6QdlvoPCtyunA?type=png)](https://mermaid.live/edit#pako:eNpVUl1PgzAU_SvNfdIIc8CYgwcT9pFlRpMpPkmN6cYdI0I7SxudC__dwj7c-tDee3p6Tu_N3cFSpAghZJJt1uTxhfJKL_bJK9MyJ0l7vFNOzIqSWBR5-hAfcuRpG5y9mo7mJDHbgTFMxkyxBauQRPPZARwlV3NRqUxi_Px4fQAnSaTV-p_ValM-3k2FyAokcZ5xe8brBoyIbesK5YcSn8jJDZH4pbFStn1PhpQPzXVqbJs0OvJJIbKckwabUD65RMbG6ELznHbmdFJsLDJUt0oyXq2ELEljSL5zU8JJYNQwR2efGYIFJcqS5anp-a6pk4JaY4kUQhOmuGK6UBQorw2VaSXiLV9CqKRGC_TGCOE4Z6bVJYQrVlQG3TD-JkR5JJkUwh38QOh0Atf1fd_zgkHQ9Zy-BVuD9vodt-u4nuN43l3P873agt9WoNsZBI7bM2y_G_gD13ctwDRXQj7tp6QdlvoPCtyunA)