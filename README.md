# Meeting Summarizer
## 💻 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/harshitabisht05/meeting-summarizer.git
cd meeting-summarizer
```
### 2. Install Dependencies

```bash
npm install
```
### 3. Start the Dev Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view it in the browser.

---
---
# 🗂️ Complete File & Folder Structure

```bash

/app
├── layout.jsx                  ← Wraps all pages with <Navbar />
├── globals.css                 ← Tailwind styles
├── page.jsx                    ← Home page (login/register view or dashboard view)
├── login/
│   └── page.jsx                ← Login form page
├── register/
│   └── page.jsx                ← Register form page
├── upload/
│   └── page.jsx                ← Upload audio file page
├── dashboard/
│   └── page.jsx                ← List uploaded files
├── transcribe/
│   └── [file_id]/
│       └── page.jsx            ← Summary, transcript, action items, export tools
├── components/
│   ├── Navbar.jsx              ← Dynamic navigation based on route & login state
│   ├── Footer.jsx              
```
