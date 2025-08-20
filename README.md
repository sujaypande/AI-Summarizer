# AI Summarizer

A web application that summarizes articles or text using AI. Built with **Next.js**, **TypeScript**, **LangChain**, and **Groq API** for natural language processing. The frontend uses **ShadCN UI** for a clean and modern design.

## 🚀 Features
- Summarize any text or article URL
- Fast and accurate AI-generated summaries
- Clean and responsive UI with ShadCN components
- Environment variables securely handled (`GROQ_API_KEY`)
- Easy to extend with new features like PDF summarization, history, or dark mode

## 🛠 Tech Stack
- **Frontend:** Next.js 15 + TypeScript + ShadCN UI + Tailwind CSS  
- **Backend:** Next.js API Routes + LangChain + Groq API  
- **Version Control:** Git + GitHub  
- **Deployment:** Vercel  

## 📦 Installation
Clone the repo and install dependencies:

```bash
git clone https://github.com/sujaypande/AI-Summarizer.git
cd AI-Summarizer
npm install
⚙️ Environment Variables
Create a .env.local file and add your API key:

env
Copy
Edit
GROQ_API_KEY=your_api_key_here
Note: .env.local is ignored by Git. Use .env.example as a reference.

💻 Running Locally
bash
Copy
Edit
npm run dev
Open http://localhost:3000 to view it in the browser.

🌐 Deployment
Push your repo to GitHub

Import the repository to Vercel

Add your environment variable GROQ_API_KEY in Vercel dashboard

Deploy → get live URL for your AI Summarizer

📈 Future Improvements
Summarize PDFs and documents

Store user summary history

Dark mode support

Multi-language support
