# Opdracht: Live Scoreboard met PHP-backend

Bouw een live scoreboard voor een wedstrijd/toernooi. De applicatie moet zonder pagina-refresh kunnen worden gebruikt.

## Situatie:
Je maakt een scoreboard voor bijvoorbeeld een voetbal-, basketbal- of quizwedstrijd. De gebruiker kan teams/spelers toevoegen, punten aanpassen en de wedstrijd starten/pauzeren/beëindigen.

## Verplichte functionaliteiten

Teams/spelers 

- Voeg minimaal 2 teams/spelers toe. 

- Geef ieder team een naam en kleur. 

- Teams kunnen vóór de start worden verwijderd. 

- Na het starten kunnen teams niet meer worden toegevoegd/verwijderd. 

Wedstrijdklok 

- Instelbare wedstrijdduur, bijvoorbeeld 10 minuten. 

- Start / pauze / hervat / stop. 

- De klok moet blijven functioneren als de gebruiker meerdere keren op knoppen klikt. 

- Wanneer de tijd 00:00 bereikt, stopt de wedstrijd automatisch. 

Score 

- Per team een knop +1, +2 en +3. 

- Score kan ook weer worden verminderd. 

- Toon realtime wie op dat moment voorstaat. 

- Tijdens een pauze mag de score nog steeds aangepast worden. 

Event history
- Iedere scorewijziging moet worden opgeslagen,     bijvoorbeeld:

    12:43  Team A  +2

    11:58  Team B  +1

    10:21  Team A  +3

- Voeg de mogelijkheid toe om een individuele gebeurtenis uit de history te verwijderen.
Let op: bij verwijderen moet de score automatisch opnieuw worden berekend.

Undo
- Voeg een Undo-knop toe waarmee de laatst uitgevoerde actie ongedaan wordt gemaakt.

- Denk hierbij goed na over wat een "actie" is:

    - score verhogen 

     - score verlagen 

    - history-item verwijderen 

    - eventueel wedstrijd pauzeren/starten 

PHP + JavaScript
- Gebruik PHP als eenvoudige backend.

    Maak bijvoorbeeld:

    index.php

    api.php

    script.js

    style.css

- JavaScript communiceert met api.php via fetch().

    De backend moet minimaal ondersteunen:

    GET  ?action=load

    POST ?action=save

    POST ?action=reset

Sla de wedstrijdgegevens op in een JSON-bestand op de server.

- Pagina opnieuw laden
Dit is een belangrijke uitdaging:

    - Als de pagina wordt vernieuwd, moet de wedstrijd in dezelfde toestand terugkomen.

    Dus bijvoorbeeld:

    - resterende tijd 

    - teams 

    - scores 

    - history 

    - status (running, paused, finished) 

moeten vanuit PHP/JSON opnieuw worden ingeladen.

## Extra uitdaging

Als bovenstaande werkt, voeg dan één of meer van deze functies toe:

- Autosave: wijzigingen automatisch naar PHP sturen. 

- Meerdere wedstrijden: een nieuwe wedstrijd starten zonder oude data kwijt te raken. 

- Wedstrijdarchief: oude wedstrijden kunnen worden bekeken. 

- Statistieken: totaal aantal punten per team en gemiddelde punten per minuut. 

- Keyboard controls: bijvoorbeeld 1 = Team A +1, 2 = Team B +1. 

- WebSocket-achtig gedrag: laat de pagina iedere paar seconden controleren of de serverdata veranderd is. 

- Race conditions: zorg dat twee vrijwel gelijktijdige saves niet zomaar elkaars gegevens overschrijven. 

- Validatie: zowel JavaScript als PHP moeten controleren of binnengekomen data geldig is.

