[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://github.com/Sillen00/FEST---Webbshop)

# <span style="color:dodgerblue">Webbshop With Server Side </span>

## <span style="color:dodgerblue"> Description </span>

<!-- Skriv en beskrivning till projektet. Texten nedan är en text till tidigare express projectet, för insperation :) -->

<!-- In this school assignment, we have created a user-based platform where a user has the ability to register, log in, and create content.

User data is based on a separate resource, where the password is encrypted. All content that is created, modified, or removed is saved to a MongoDB database.
All content is presented to the user, even when they are not logged in. -->

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

---

**Krav för godkänt:**

- [ ] Git & GitHub har använts
- [ ] Projektmappen innehåller en README.md fil (läs ovan för mer info)
- [ ] Uppgiften lämnas in i tid!
- [ ] Det ska finnas minst två stycken resurser (users & posts)
- [ ] Det ska gå att registrera sig, logga in och skapa innehåll som är kopplat till inloggad användare.
- [ ] Endast den inloggade användaren får lov att utföra C_UD actions på sitt innehåll.
- [ ] Allt innehåll ska sparas i en MongoDB databas.

_Gjorda krav ska kryssar i_

**Krav för väl godkänt:**

- [ ] Alla punkter för godkänt är uppfyllda
- [ ] Det ska finnas en adminroll i systemet där man som inloggad admin har rättigheten att utföra CRUD operationer på allt innehåll.
- [ ] Admins ska ha tillgång till ett gränssnitt som listar alla användare och deras roller. En admin ska från gränssnittet kunna ta bort användare eller ändra dess roll.

_Gjorda krav ska kryssar i_
