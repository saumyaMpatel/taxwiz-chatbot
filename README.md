
# 🧾 TaxWiz | Cotax Challenge

Welcome to **TaxWiz**, your tax-season sidekick built with React, Tailwind CSS, OpenAI, and Recharts. Think of it like asking your mom or dad about taxes... just without the part where you zone out and pretend to go to the bathroom 



## ✨ Features

### 🗣️ AI Chat Interface
- Ask tax questions conversationally via natural language.
- Powered by OpenAI’s GPT-3.5-turbo via the `ai/react` SDK.
- Integrated using the Vercel AI SDK (`useChat` hook).

### 📂 File Upload (Simulated Analysis)
- Upload a document (e.g., `w-2.pdf`, `1099.xlsx`, `form1040.docx`, etc.).
- Simulated responses tailored to different file types (e.g., 1099, W-2, 1040, Schedule forms).

### 📊 Tax Breakdown Chart + Table
- If a user asks about `breakdown`, `tax calculation`, or `income details`, a **visual breakdown** is displayed with a **bar chart and data table**

### 🤖 Suggested Question Context
- Dynamic suggested questions change based on:
  - Your message (e.g. mention `w-2`, `1099`, `deductions`)
  - File uploads (context changes to document analysis mode)
- Keywords used to trigger specific suggestions:
  - `w-2`, `1099`, `file`, `deductions`, `tax brackets`, etc.

### 🌓 Dark Mode Support
- Theme toggling available with Tailwind’s updated dark mode strategy.
- Consistent styling in both light and dark modes.

### ❤️ Made with love by Hreem


---

## 🧪 How to Run Locally

### 1. Clone the Repo
```bash
git clone https://github.com/your-username/taxwiz-chatbot.git
cd taxwiz-chatbot
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Ensure .env.local has OpenAI Key and is UNCOMMENTED from .gitignore

### 4. Run the Dev Server

```bash
npm run dev
```

## ⚙️ Assumptions & Notes

- File upload returns simulated insights depending on file name/type. No real file contents are read.
- File types handled include: `.pdf`, `.docx`, `.xlsx`, `.png`
- All chart and table numbers are static placeholders (i.e., fake numbers) and would ideally be calculated using tax rules and file contents in a complete version.

---

## 🚀 Areas for Future Improvement

- 🔍 Real file parsing using OCR or file readers (e.g. PDF.js, Excel parser, etc.)
- 📈 Real-time tax breakdown calculations based on parsed income/expense values
- 🧠 Use OpenAI function calling to better interpret structured file data
- 👥 Multi-user session support with persistent history
---

## 🧠 Sample Triggers

| Keyword                | Triggers                                  |
|------------------------|-------------------------------------------|
| `1099`, `w-2`, `1040`  | Suggested questions specific to that form |
| `file`, `upload`       | Simulated file analysis                   |
| `tax breakdown`        | Chart + table visualization               |
| `income details`       | Chart + table visualization               |
| `deductions`, `credits`| Adjusted suggestions                      |

---

## 🧵 Built With

- ⚛️ React / Next.js App Router
- 🎨 Tailwind CSS (Dark Mode enabled)
- 💬 [ai](https://sdk.vercel.ai) SDK for OpenAI streaming
- 📊 Recharts for tax visualizations
- 📁 File Upload with simulated logic
- 🧠 GPT-3.5-turbo for chat generation



Feel free to fork, remix, or contribute.

---

## 🛠️ Troubleshooting

### ❌ App Not Loading or Port Already in Use?

Sometimes your development server doesn't shut down cleanly. You can manually kill it using this command:

```bash
taskkill /F /IM node.exe

