[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://github.com/Sillen00/FEST---Webbshop)

# <span style="color:dodgerblue">Webbshop "SO-FUN" With Server Side </span>

## <span style="color:dodgerblue"> Description </span>

SO-FUN webshop: Where Fun and Sofas Unite!

For this school assignment, we have developed a dynamic webshop specializing in the sale of couches in various sizes. Our user-friendly platform allows users to easily register, log in, and place orders. Notably, our webshop includes an admin interface with enhanced accessibility, granting administrators the ability to create, modify, and remove products as needed. Additionally, our website features a real-time stock counter, keeping customers informed about the availability of our products for sale.

User data is securely stored in a separate resource with encrypted passwords, while all website content is efficiently managed and stored in a MongoDB database, ensuring accessibility and data integrity at all times, even for non-logged-in users.

Året är 1992, Waynes World och Charlie Moongår på biograferna. Janne Kemi är en finsk ultramiljonär som bestämt sig för att satsa på en ny e-handeln. Han vill investera i nya hemsidor. Han har anlitat er för att ta fram dessa sidor.Han har vissa specifika krav från sin IT avdelning som han bifogat som en kravspecifikation. Förutom det har ni fria händer att ta fram en grym idé och tjäna sjuka pengar (åt Janne).

## <span style="color:dodgerblue"> Setup Project </span>

This codebase is divided into [client](./client/) and [server](./server/).
The server has two environments configured, one for development and one for testing.

Switch between folders by, for example, using the command - `cd server` to step into server.

Here is a list of the different scripts that can be run in the terminal:

- `npm install` - Installs all NodeJS modules (run once).
- `npm run update` - Updating the tests.
- `npm run dev` - Starting development environment.
- `npm test` - Starts the testing environment, shows you the requirements list.

<br>

## <span style="color:dodgerblue"> Participants </span>

Felicia Willnäs [GitHub](https://github.com/feliciawillnas)<br>
Edvin Djulic [GitHub](https://github.com/Edvindjulic) <br>
Simon Bengtsson [GitHub](https://github.com/Sillen00)<br>
Tara Skoglund [GitHub](https://github.com/TaraSkoglund)

**Krav för godkänt**

- [ ] Alla sidor skall vara responsiva. (G)
- [ ] Arbetet ska implementeras med en React frontend och en Express backend. (G)
- [ ] Express backenden ska ha validering på samtliga endpoints. (G)
- [ ] Skapa ett ER diagram och koddiagram, detta ska lämnas in vid idégodkännandet G)
- [ ] Beskriv er företagsidé i en kort textuell presentation, detta ska lämnas in vid idégodkännandet (G)
- [ ] All data som programmet utnyttjar ska vara sparat i en Mongo-databas (produkter, beställningar, konton mm) (G)
- [ ] Man ska kunna logga in som administratör i systemet (G)•Inga Lösenord får sparas i klartext i databasen (G)
- [ ] En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i databasen (G)
- [ ] Administratörer ska kunna uppdatera antalet produkter i lager från admin delen av sidan (G)
- [ ] Administratörer ska kunna se en lista på alla gjorda beställningar (G)
- [ ] Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori, men kan tillhöra flera (G)
- [ ] Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista bara dom produkter som tillhör en kategori (G)
- [ ] Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i local-storage på klienten (G)
- [ ] En besökare som gör en beställning ska få möjligheten att registrera sig samt logga in och måste vara inloggad som kund innan beställningen skapas (G)
- [ ] Checkoutflödet i frontendapplikationen ska ha validering på samtliga fält (G)

**Krav för välgodkänt**

- [ ] Ett CI flöde ska sättas upp (i början av projektet) som kontrollerar prettier, eslint, typescript & tester i varje PR, tester kan lånas ifrån tidigare uppgifter (VG)
- [ ] När man är inloggad som kund ska man kunna se sina gjorda beställning och om det är skickade eller inte (VG)
- [ ] Administratörer ska kunna redigera produkt inklusive vilka kategorier den tillhör (VG)
- [ ] Administratörer ska kunna lägga till och ta bort produkter (VG)
- [ ] Backendapplikationen ska ha en fungerande global felhantering (VG)
- [ ] En administratör ska kunna uppgradera en användare till administratör (VG)•Administratörer ska kunna markera beställningar som skickade (VG)
