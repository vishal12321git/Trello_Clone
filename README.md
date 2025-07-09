
```markdown
# 🧩 Trello React Clone – Vishal Pandey

A fully-functional **Trello Clone built with React**, implementing **client-side routing**, **RESTful API integration**, and a full set of Trello-like features including **boards, lists, cards, checklists, and checkitems**.

---

## 🚀 Live Demo

🔗 **Deployed Link**: [https://your-deployed-site-link.com](https://trello-clone-henna-seven.vercel.app/)

---

## 🛠️ Tech Stack

- **React (Vite)**
- **Tailwind CSS**
- **React Router**
- **Axios** (for API calls)
- **Trello REST API**
- **React Icons**
- **Vercel** (for deployment)

---

## 🧭 Routing

- **`/boards`**: Displays all available Trello boards.
- **`/boards/:boardId`**: Displays a specific board with its lists, cards, and checklists.

---

## ✨ Features

### ✅ Boards
- 🔍 View all Trello boards.
- ➕ Create a new board.
- 🎨 Supports board background (image or color).

### ✅ Lists
- 📂 View all lists under a board.
- ➕ Create a new list in a board.
- ❌ Delete/Archive a list.

### ✅ Cards
- 📄 View all cards inside a list.
- ➕ Create a new card in a list.
- ❌ Delete a card.
- ✏️ Editable card titles.

### ✅ Checklists
- 📋 Add multiple checklists to a card.
- 📂 View all checklists.
- ➕ Create new checklist.
- ❌ Delete a checklist.
- ✏️ Edit checklist titles.

### ✅ Checkitems
- ✅ Add checkitems under a checklist.
- 👁️ View all checkitems.
- ✔️ Check/Uncheck checkitems (with real-time progress bar).
- ✏️ Edit checkitem names.
- ❌ Delete a checkitem.
- 📊 Dynamically updates progress on checking/unchecking/deleting items.

### 🧠 State Management
- Used **React useState + Context API** to manage boards across components.
- Dialog open/close state is handled cleanly (e.g., closing on outside click).

---

## 📡 API Integration

- 🔗 Integrated with [Trello REST API](https://developer.atlassian.com/cloud/trello/guides/rest-api/api-introduction/).
- All CRUD operations are performed using `axios` in a central helper file: `utils/FetchApi.js`.

---

## 🧪 Testing

- ✅ Manual testing done during development.
- ✅ Verified all edge cases like deleting checked checkitems and progress bar accuracy.

---

## 📦 How to Run Locally

1. **Clone the repository**  
   ```bash
   git clone https://github.com/yourusername/trello-react-vishal.git
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Add your `.env` file** with Trello API key and token

   ```env
   VITE_API_KEY=your_key
   VITE_API_TOKEN=your_token
   ```

4. **Run the app**

   ```bash
   npm run dev
   ```

---

## 🧾 Resources

* 📄 [Trello API Guide](https://developer.atlassian.com/cloud/trello/guides/rest-api/api-introduction/)

---

## 📌 Notes

* All UI is built using **Tailwind CSS** for flexibility and speed.
* Follows **clean component design** and separation of concerns.
* Suitable for demonstrating **full-stack front-end skills** and API integration.

---