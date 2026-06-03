# AI Assessment Creator

An AI-powered platform that generates structured question papers from uploaded study material, custom instructions and configurable question requirements.

Built with Next.js, TypeScript, Express, MongoDB, OpenAI, file uploads, PDF exports and real-time updates.

---

## Features

### Assignment Creation
- Create AI-generated assessments
- Configure question types
- Set question count and marks
- Add custom instructions
- Set assignment due dates

### File Upload Support
- Upload TXT files
- Upload PDF documents
- Extract content from uploaded files
- Generate questions directly from uploaded study material

### AI Question Generation
- Automatic question generation using OpenAI
- Section-based paper structure
- Difficulty tagging
- Marks allocation
- Structured JSON output parsing

### Assessment Dashboard
- View all generated assessments
- Search assessments
- Assignment status tracking
- Open assessment details
- Download PDFs
- Delete assignments

### PDF Export
- Generate downloadable assessment PDFs
- Clean exam-paper formatting
- Student information section
- Organized question sections

### Real-Time Updates
- WebSocket integration with Socket.IO
- Live assignment status updates

---

## Tech Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- Zustand
- Axios
- Socket.IO Client

### Backend
- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- Multer
- PDFKit
- Socket.IO

### AI
- OpenAI API (via OpenRouter)

---

## Project Structure

bash frontend/ ├── src/ │   ├── app/ │   ├── store/ │   └── lib/  backend/ ├── src/ │   ├── routes/ │   ├── services/ │   ├── middleware/ │   ├── models/ │   └── uploads/ 

## Installation

### Clone Repository

bash git clone <repository-url> cd ai-assessment-creator 

### Backend Setup

bash cd backend  npm install 

Create a .env file:

env OPENAI_API_KEY=your_api_key MONGO_URI=your_mongodb_connection_string 

Start backend:

bash npm run dev 

### Frontend Setup

bash cd frontend  npm install npm run dev 

---

## Workflow

1. Create an assessment
2. Upload a PDF or TXT file (optional)
3. Configure question requirements
4. Submit assignment
5. AI generates structured questions
6. Assessment is stored in MongoDB
7. View generated paper
8. Download as PDF

---

## Future Improvements

- Regenerate assessment
- Redis caching
- BullMQ background jobs
- Advanced analytics dashboard
- Authentication
- Teacher/student roles
- Difficulty-aware generation improvements
- File preview support

---
