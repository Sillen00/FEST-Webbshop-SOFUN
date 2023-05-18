# Skii-Doo - Webshop

## Beskrivning

Ski-Doo är ett snöskotermärke som vi valt att göra en webshop för. Vi säljer snöskotrar.

## Tekniker och verktyg

Webshoppen är gjort i TypeScript, React. Vi har även använt oss av ett designsystem, Material UI för att få en snyggare design.

[Material UI-dokumentation](https://mui.com/material-ui/getting-started/overview/)

Utöver detta har vi använt oss av följande verktyg:

- [Yup](https://github.com/jquense/yup) - Validering
- [Formik](https://formik.org/docs) - Formulärhantering
- [React Router](https://reactrouter.com/en/main) - Routing
- [Cypress](https://www.cypress.io/) - Testning
- [Vite](https://vitejs.dev/) - Byggverktyg

## Skapare

Carl Hasselblad, Edvin Djulic, Jesper Lindström, Lucas Alfredsson

## Köra och testa projektet

För att kunna köra projektet lokalt så behöver du som laddat ner först öppna en terminal och skriva `npm install` för att ladda ner alla dependencies. För att starta dev-servern så skriver du `npm run dev`och kan då testa projektet lokalt.

För att köra testerna så skriver du `npm test` i terminalen.
Behöver du uppdatera testerna så skriver du `npm run update`.

## Bygga projektet

För att bygga projektet så behöver du skriva `npm run build`. Vill du testa att se hur projektet ser ut när det är byggt så är det möjligt med kommandot `npm run preview`.

## Kravspecifikationer

### Krav för Godkänt

- [x] Git & GitHub har använts
- [x] Projektmappen innehåller en README.md fil - (läs ovan för mer info)
- [x] Uppgiften lämnas in i tid!

**Home**

- [x] Ska ha en övergripande layout med header, main & footer.
- [x] Startsidan ska lista samtliga produkter.
- [x] Det ska gå att lägga till produkter i kundvagnen (header + toast + ls).
- [x] Det ska gå att klicka på en produkt och komma till en detaljsida.
- [x] Sidan ska vara responsiv och gå att använda på mobil, tablet & desktop.

**Produkt**

- [x] Ska ha en övergripande layout med header, main & footer.
- [x] Detaljsidan ska visa all info om en produkt.
- [x] Det ska gå att lägga till produkten i kundvagnen (header + toast + ls).
- [x] Sidan ska vara responsiv och gå att använda på mobil, tablet & desktop.

**Kundvagn & Checkout**

- [x] Ska ha en övergripande layout med header, main & footer.
- [x] Det ska gå att gå till checkoutsidan och se innehållet i kundvagnen (knapp & url).
- [x] Det ska gå att se det totala priset i kundvagnen.
- [x] Det ska gå att ändra produkterna i kundvagnen (header + vyn + pris + ls).
- [x] Det ska gå att ange leveransuppgifter i ett formulär.
- [x] Samtliga fält för checkoutsidans formulär ska ha valideringsregler.
- [x] Formulären vid utcheckningen ska gå att automatiskt fyllas i.
- [x] Bekräftelsesidan ska visa orderdetaljer och leveransuppgifter.

### Krav för Väl Godkänt

- [x] Ett designsystem/komponentbibliotek används nästintill helt uteslutande för att bygga sidan (ex: MUI, ChakraUI, Mantine, etc).

**Admin**

- [x] Det finns en admin-sida för produkthantering
- [x] Det ska gå att se alla produkter på admin sidan
- [x] Det går att lägga till produkter via admin sidan + ls
- [x] Det går att ta bort produkter via admin sidan + ls
- [x] Det går att redigera produkter via admin sidan + ls
- [x] Samtliga fält för adminsidans formulär ska ha valideringsregler
