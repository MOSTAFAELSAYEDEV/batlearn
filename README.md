# BATLEARN - Database Learning Platform

A comprehensive, interactive web application for learning SQL, ERD (Entity Relationship Diagrams), Database Mapping, and Normalization. Built entirely based on curriculum documents.

## 🚀 Features

- **SQL Fundamentals**: Interactive SQL editor with live query execution
- **ERD Learning**: Entity Relationship Diagram concepts and practice
- **ERD Mapping**: Learn to map ERD elements to relational schemas
- **Normalization**: 1NF, 2NF, 3NF concepts with practice problems
- **AI Tutor**: Claude-powered intelligent tutoring system
- **Practice Lab**: Interactive SQL practice environment
- **Progress Tracking**: Track your learning progress across all modules

## 🛠️ Technology Stack

- **Frontend**: React 18+ with TypeScript
- **Styling**: Tailwind CSS v3+
- **SQL Editor**: Monaco Editor (VS Code engine)
- **Database Engine**: SQL.js (SQLite in browser)
- **State Management**: Zustand
- **Routing**: React Router v6
- **Icons**: Lucide React
- **AI Integration**: Anthropic Claude API
- **Charts/Diagrams**: Recharts, React Flow

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd batlearnmis
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```
REACT_APP_ANTHROPIC_API_KEY=your_claude_api_key_here
REACT_APP_DEEPSEEK_API_KEY=your_deepseek_api_key_here
```

**Security Note**: The API keys are used in the browser for the AI tutor (Claude) and Bat Bot (DeepSeek). For production, use a backend proxy to keep keys secure and apply rate limits. The current implementation uses browser calls for development/learning purposes.

4. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3009`

**Note**: To change the port, modify the `PORT` value in the `start` script in `package.json`, or create a `.env` file with `PORT=your_port_number`.

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Header, Sidebar, Footer
│   ├── sql/            # SQL Editor, Database Selector
│   ├── erd/            # ERD Builder components
│   ├── tutor/          # AI Chat component
│   └── common/         # Shared components
├── pages/              # Main page components
│   ├── Dashboard.tsx
│   ├── SQLLessons.tsx
│   ├── ERDLessons.tsx
│   ├── MappingLessons.tsx
│   ├── NormalizationLessons.tsx
│   └── PracticeLab.tsx
├── data/               # Curriculum data
│   ├── sqlCurriculum.ts
│   ├── erdCurriculum.ts
│   ├── mappingRules.ts
│   ├── normalizationProblems.ts
│   └── databases.ts
├── services/           # Business logic
│   ├── sqlExecutor.ts
│   └── aiTutor.ts
├── hooks/              # Custom React hooks
│   ├── useDatabase.ts
│   └── useAITutor.ts
├── store/              # Zustand state management
│   └── appStore.ts
├── types/              # TypeScript type definitions
│   └── index.ts
└── utils/              # Utility functions
```

## 📚 Curriculum Content

All educational content is based on the provided curriculum documents:
- SQL FINAL REV.docx
- ERD Final Rev.pdf
- ERD.pdf
- Mapping Final Rev.pdf
- Normalization Final Rev.pdf

**Important**: The curriculum data files (`src/data/*.ts`) should be populated with exact content from these documents.

## 🎯 Usage

### SQL Learning
1. Navigate to "SQL Fundamentals" from the sidebar
2. Select a problem from the list
3. Use the SQL editor to write and execute queries
4. View solutions and hints
5. Get help from the AI tutor

### Practice Lab
1. Go to "Practice Lab"
2. Select a database (Salesman, Nobel, Tutor, or University)
3. Write and execute SQL queries
4. Chat with the AI tutor for guidance

### AI Tutor
- Available on all learning pages
- Ask questions about concepts
- Request hints for problems
- Get feedback on your answers

## 🔧 Configuration

### Theme
The application supports light and dark themes. Toggle using the theme button in the header.

### Language
English and Arabic language support (toggle in header).

## 📝 Adding Curriculum Content

To add content from curriculum documents:

1. **SQL Problems**: Edit `src/data/sqlCurriculum.ts`
2. **ERD Problems**: Edit `src/data/erdCurriculum.ts`
3. **Mapping Rules**: Edit `src/data/mappingRules.ts`
4. **Normalization Problems**: Edit `src/data/normalizationProblems.ts`

## 🐛 Troubleshooting

### SQL.js Loading Issues
If you encounter issues loading SQL.js, ensure you have a stable internet connection as it loads from CDN.

### AI Tutor Not Working
- Verify your `REACT_APP_ANTHROPIC_API_KEY` is set correctly
- Check your API key has sufficient credits
- Review browser console for error messages

## 📄 License

This project is for educational purposes.

## 🤝 Contributing

This is a curriculum-based learning platform. All content should match the provided curriculum documents exactly.

## 📞 Support

For issues or questions, please refer to the curriculum documents or use the AI tutor feature.
