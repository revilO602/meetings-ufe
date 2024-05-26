### Zadanie projektu + prípady použitia (podľa zadania)
#### Zadanie:
Personálna správa, prehľad o zamestnancoch nemocnice, ich priradenie k ambulanciám a nemocničným oddeleniam,prehľad o výkonoch, a správa osobnej dokumentácie

#### Pripady pouzitia:
System pre planovanie a evidenciu online stretnuti doktorov s pacientami vratane danej choroby, jej detailov, mien doktora a pacienta, datumu a casu
Create - Doktor vie vytvorit zaznam o planovanom online stretnuti s pacientom
Retrieve - pacient aj doktor si vedia ziskat detaily konkretne stretnutia
List - pacient aj doktor si vedia vylistovat svoje online stretnutia
Update - Doktor vie menit detaily online stretnutia (pripisat symptomy, diagnozu, poznamky z daneho stretnutia potom ako prebehne)
Delete - Doktor vie dane stretnutie zrusit

### Mená členov tímu, ktorý sa podieľali na projekte
#### Oliver Leontiev

### Názov vašej aplikácie na spoločnom klastri
#### Meetings
Online meetings between pacients and doctors. Made by Oliver Leontiev.

### Linka na Github repozitáre obsahujúce FE,BE a gitops. Predpokladáme, že sú public, v opačnom prípade poskytnite prístup čítania obsahu pre  cvičiacich.
#### FE: https://github.com/revilO602/meetings-ufe
#### BE: https://github.com/revilO602/meetings-webapi
#### gitops: https://github.com/revilO602/meetings-gitops

### Linka na DockerHub registry, kde sú registrované použité softvérové kontajnery.
#### FE: https://hub.docker.com/repository/docker/revilo602/meetings-ufe/general
#### BE: https://hub.docker.com/repository/docker/revilo602/meetings-webapi/general

### Linka k FE aplikácii na spločnom klastri.
#### https://wac-24.westeurope.cloudapp.azure.com/ui/meetings/


### Názov deployment objektu pre UI.
#### meetings-ufe-deployment

### Názov deploymentu pre webapi.
#### meetings-webapi

### Stručný opis riešenie k vyhodnoteteniu - informácie pre hodnotiacich, tak aby sa vedeli zorientovať vo Vašej funkcionalite
Da sa vytvorit online meeting cez + tlacitko, v liste sa po kliknuti na meeting zobrazi detail meetingu z ktoreho sa da vymazat alebo upravit. na azure je nasadeny plne funkcny frontend ale iba s mock api bez perzistencie. su naimplementovane testy pre FE a API. nerobil som rozne ambulancie kedze online meetingy su od nich nezavisle.

### Linka na nasadenie samostatného web UI v Azure Cloud. Musí zobraziť aspoň nejký obsah, s prípadnou chybovou  informáciou, že sa nevie pripojiť k web službe
#### https://ol-meetings.azurewebsites.net/meetings/list

