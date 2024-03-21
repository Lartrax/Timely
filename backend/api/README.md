# Welcome to the backend of Timely

This is where all apis are located

## Overview

Auth api, Database api and Proxy are located here

[![](https://mermaid.ink/img/pako:eNp1ktuO0zAQhl_F8hWIpM2hp0QIqWctWkQhXBGvkLeeZi0ldnAc7Zaq787YKWiFRC4Szz9ffs-MfaFHLYDmtDK8fSL3X5nq-sch-MZ7I0npPw9MEXyWZaFrKT4WtxiU8ItXf-3XB1Li60asyg23_JF3QJaHu5u4Lt8cdGcrA8WX-7c3cVsue_v0itqV44PRL2fGBsFvxtTmste6qoF8dvzVSfuykJUK7xRpeQUPTlqS92HYd2B-SEHeEQM_e-hsGH4gq79pUoElta6kGnO0AmXlkVsgjtoytfVMh9v-D9o4I-ejrR4YL--xIicbENLA0RLMtq4Tn90xtfs3y9u2drZSDw5-5q7OlasByxxbw1V30qYhAudJniWOSgrHrpmiAW3ANFwKPMmLGxajWGoDjOa4FHDifW0ZZeqKKLahi7M60tyaHgLat2gJG8nxABuan3jdodpy9V3r5g-EIc0v9IXm6XyUJcksmsXpJJ5HSRzQM83jeTxKojhJ0ukknc_SaHIN6C9vEI0WWZxMskU2jbLpIpmmAcXerTafhrvnr-D1N-Iczas?type=png)](https://mermaid.live/edit#pako:eNp1ktuO0zAQhl_F8hWIpM2hp0QIqWctWkQhXBGvkLeeZi0ldnAc7Zaq787YKWiFRC4Szz9ffs-MfaFHLYDmtDK8fSL3X5nq-sch-MZ7I0npPw9MEXyWZaFrKT4WtxiU8ItXf-3XB1Li60asyg23_JF3QJaHu5u4Lt8cdGcrA8WX-7c3cVsue_v0itqV44PRL2fGBsFvxtTmste6qoF8dvzVSfuykJUK7xRpeQUPTlqS92HYd2B-SEHeEQM_e-hsGH4gq79pUoElta6kGnO0AmXlkVsgjtoytfVMh9v-D9o4I-ejrR4YL--xIicbENLA0RLMtq4Tn90xtfs3y9u2drZSDw5-5q7OlasByxxbw1V30qYhAudJniWOSgrHrpmiAW3ANFwKPMmLGxajWGoDjOa4FHDifW0ZZeqKKLahi7M60tyaHgLat2gJG8nxABuan3jdodpy9V3r5g-EIc0v9IXm6XyUJcksmsXpJJ5HSRzQM83jeTxKojhJ0ukknc_SaHIN6C9vEI0WWZxMskU2jbLpIpmmAcXerTafhrvnr-D1N-Iczas)

## Getting started

If you installed all requirements from the first readme then you only need make to run all commands. If you didn't [Go back]()

---

Start localhost:

Auth/Database api: `make s` compile dev | `make sr` compile release

Proxy: `make s`

---

Deploying

First authenticate with gcloud

```
gcloud auth login
```

Then deploy

```
make deploy
```
