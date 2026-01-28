# Terv – Időpontfoglaló Rendszer

## 1. Projekt Áttekintés
 - A rendszer lényege, hogy az időpontfoglalást, könnyebbé, gyorsabbá és kényelmesebbé tegye, ezzel időt és energiát spórolva meg.
 - Célközönség a kisvállalkozások, akik sok ügyféllel dolgoznak.

---

## 2. Felhasználói útvonalak

- Az admin saját admin felülettel rendelkezik ahol a regisztrált felhasználókat látja.
- A vállalkozó megérkezik az oldalra. Egy üdvözlő oldal fogadja. Regisztrálhat, mint vállalkozó, vagy mint ügyfél. Ha már regisztrált beléphet. Regisztrációkor egy kitöltendő rész fogadja, ahol meg kell adnia a vállalkozás nevét, foglalkozását, székhyelyét, személyes adatait, elérhetőségét. Ezután egy üres oldal várja, ahol olyan lehetősége van hogy új naptár létrehozása. Beállíthatja a szabadnapokat, szabadidőket, illetve, hogy egy időpont mennyi ideig tarthat. Szolgáltatásokat állíthat be és annak időtartamát, hogy az esetleges hibákat, hogy nem fér bele az időbe 2 ügyfél elkerüljük. Beállítás után megjelenik a saját naptára, saját hozzáférési útvonallal, amit a felhasználók tudnak megtalálni. Rendelkezik saját chat mezővel, ahol üzeneteket kaphat, illetve küldhet az ügyfeleknek. saját ügyfél listával rendelkezik. Amint egy ügyfél már foglalt, az hozzá adódik a saját ügyfél listájához.
- Az ügyfél megérkezik az oldalra. Regisztrálhat vagy beléphet. Kap egy kereső mezőt, amin keresztül megkeresheti szolgáltatóját. Arra rákattintva megjelenik annak a naptára és a szabad időpontok közül választhat. Üzenetet is küldhet a szolgáltatónak. Saját időpontját már nem változtathatja, csak üzenetváltás során a szolgáltató helyezheti át máshova, illetve törölheti.
---

## 3. Funkcionális lista
- Must-have: Regisztráció, belépés, módosítás, törlés, hozzáadás, chat ablak, profilkép feltöltés.
- Nice to have: sötét és világos mód.

## 4. Technológiai Stack 
- Frontend: HTML, Javascript, React.js
- Stílus: Tailwind CSS + naptárintegráció
- Backend: Node.js
- Adatbázis: PostgreSQL
- Hitelesítés: Python-specifikus JWT 
- Valós idejű chat: Socket.io vagy Supabase Realtime.
- Infrastruktúra: Vercel (Frontend) és Render/Railway (Backend) a hosztoláshoz.

## 5. Rendszerarchitektúra és Adatmodell
Főbb entitások:
- User: id, email, password_hash, role (admin/vendor/client), profile_data.
- Business Profile: user_id, business_name, category, address, bio, opening_hours (JSON).
- Service: id, business_id, name, duration_minutes
- Appointment: id, client_id, business_id, service_id, start_time, end_time, status (pending/confirmed/cancelled).
- Message: id, sender_id, receiver_id, content, timestamp.

## 6. Nem funkcionális követelmények
- Biztonság: Jelszavak titkosítása (bcrypt), JWT tokenek használata, védelem az SQL injection ellen.
- Skálázhatóság: Az adatbázis indexelése az időpontok gyors kereséséhez.
- Reszponzivitás: A felületnek mobilra optimalizáltnak kell lennie, mivel az ügyfelek nagy része telefonon foglal.
- Validáció: Szigorú szerveroldali ellenőrzés (pl. ne lehessen ugyanarra az időpontra két foglalást leadni)

## 7. SDLC Szakaszok és Ütemterv
1. Elemzés és Tervezés (Jelenlegi fázis)
Wireframe-ek (drótvázak) készítése (Figma).
API végpontok megtervezése (pl. POST /api/bookings).
2. Fejlesztési fázis (Iterációk)
MVP (Minimum Viable Product): Regisztráció + Naptár alapfunkciók + Foglalás.
2. fázis: Üzleti beállítások (szabadnapok, szolgáltatások kezelése).
3. fázis: Chat és értesítési rendszer.

Tesztelés (Quality Assurance)
- Unit tesztek: A naptár logikájának tesztelése (pl. nem enged foglalni nyitvatartási időn kívül).
 - Integrációs tesztek: A foglalási folyamat végigjátszása a fizetésig/visszaigazolásig.
- Manuális tesztelés: Különböző böngészőkön és eszközökön.
## 8. Kockázatok és Megoldások
- Kockázat: Időpont ütközések.
- Megoldás: Tranzakciókezelés az adatbázis szintjén a foglalás pillanatában.
- Kockázat: Spam regisztrációk.
- Megoldás: Email verifikáció bevezetése.

## 9. Jövőbeli fejlesztési lehetőségek (Roadmap)
Automatikus email/SMS emlékeztetők a foglalás előtt 24 órával.
Google Calendar szinkronizáció a vállalkozók számára.



  





