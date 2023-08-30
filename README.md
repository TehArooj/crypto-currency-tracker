# Crypto Currency Tracker

A cryptocurrency tracker that provides users with the latest details about the Top 100 Crypto Currencies.
 
 ### Technology Used:
- [Remix](https://remix.run/)
- [Tailwind](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Prisma with SQLite](https://www.prisma.io/docs/concepts/database-connectors/sqlite)
- [FlexsearchJS](https://github.com/nextapps-de/flexsearch) (For Search Operation)

### Quickstart:
- Clone with repo with
```
git clone https://github.com/TehArooj/crypto-currency-tracker
cd crypto-currency-tracker
```
- Install dependencies and Prisma DB setup with
```
npm i
npm run setup
```
- Start dev env with
```
npm run dev
```
By default, the app will start running on [http://localhost:3000](http://localhost:3000/) 

### User Flow and Interface:
- The main page of the app contains information about all the CryptoData.
- Users can search for items using the search bar.
- Users can view more details by clicking on an item row.
  - This action will trigger a modal popup with further information.
- Users can create an account by signing up.
- Users can log in.
  - Logged-in users have the ability to save their preferred items.
    - A "Save" button will be available in the details modal to save the item.
    - Saved items will appear in a dynamic dropdown.
      - Users can select a saved item from the dropdown to view its details.
      - An "Unsave" option will be presented within the details modal.
      - Users can unsave an item, causing it to be removed from their saved items.
    - Users can also update their saved items directly from the main Crypto Table.
      - If an item already exists in a user's saved items and the user clicks the "Save" option from the Main Table Details Modal, the saved item will be updated with the latest cryptocurrency values.
- Users can log out using the provided "Logout" button located in the top-right corner of the page.

### Screens:
- Main Screen
  <img width="1440" alt="Screenshot 2023-08-30 at 8 33 24 PM" src="https://github.com/TehArooj/crypto-currency-tracker/assets/58910327/93f04a85-4477-4999-95df-74ffa3649160">
- Login Screen
  <img width="1439" alt="Screenshot 2023-08-30 at 8 34 06 PM" src="https://github.com/TehArooj/crypto-currency-tracker/assets/58910327/b7ce4c01-37e8-4e42-adf4-a392455af9f3">
- Signup Screen
  <img width="1438" alt="Screenshot 2023-08-30 at 8 34 42 PM" src="https://github.com/TehArooj/crypto-currency-tracker/assets/58910327/46aaa519-6976-42b6-be13-90b44fdaa0d6">
- LoggedIn User Main Screen
  - Default
  <img width="1439" alt="Screenshot 2023-08-30 at 8 36 39 PM" src="https://github.com/TehArooj/crypto-currency-tracker/assets/58910327/0dcbba40-0930-469a-9b28-1ad3dfabeba2">
  - With Saved Items
    <img width="1440" alt="Screenshot 2023-08-30 at 8 38 57 PM" src="https://github.com/TehArooj/crypto-currency-tracker/assets/58910327/1f61f170-87cc-45e0-aed9-66c40304db6f">
    - Dropdown
    <img width="1440" alt="Screenshot 2023-08-30 at 8 45 23 PM" src="https://github.com/TehArooj/crypto-currency-tracker/assets/58910327/122d4ec6-5a67-463a-9305-63edf1903418">
