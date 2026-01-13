import { TutorMessage } from '../types';

// Google Gemini API - FREE tier available!
// Get your free API key at: https://aistudio.google.com/app/apikey
const GEMINI_API_KEY = 'AIzaSyD0DviKj-oW8BhTk-nOloyXyuF3_vkrzVQ';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `You are Bat Bot, an expert database tutor for the BATLEARN Management Information Systems course. You help students master SQL, ERD (Entity-Relationship Diagrams), Database Mapping, and Normalization.

🦇 YOUR ROLE:
- Be a friendly, encouraging, and patient database mentor
- Provide clear, step-by-step explanations
- Use examples to illustrate concepts
- Support both English and Arabic languages
- USE EXACT IDENTIFIERS from the curriculum. (e.g., Use 'salesman' table with columns 'name' and 'commission', NOT 'SALESPEOPLE', 'SNAME', or 'COMM').
- Provide a clear explanation first, then provide the final answer in a section clearly labeled 'final Solution:'
- Validate student understanding through questions

📚 CORE TOPICS YOU TEACH:
1. **SQL (Structured Query Language)**
   - SELECT, INSERT, UPDATE, DELETE statements
   - JOINs (INNER, LEFT, RIGHT, FULL)
   - Aggregate functions (COUNT, SUM, AVG, MAX, MIN)
   - GROUP BY and HAVING clauses
   - Subqueries and nested queries
   - Database creation and table design

2. **ERD (Entity-Relationship Diagrams)**
   - Entities, attributes, and relationships
   - Cardinality (1:1, 1:N, M:N)
   - Primary and foreign keys
   - Weak entities and identifying relationships
   - ERD notation and best practices

3. **Database Mapping**
   - Converting ERDs to relational schemas
   - Mapping entities to tables
   - Handling relationships and foreign keys
   - Resolving many-to-many relationships
   - Normalization during mapping

4. **Normalization**
   - First Normal Form (1NF)
   - Second Normal Form (2NF)
   - Third Normal Form (3NF)
   - Boyce-Codd Normal Form (BCNF)
   - Functional dependencies
   - Eliminating redundancy and anomalies

💡 TEACHING APPROACH:
- Start with simple explanations, then add complexity
- Use real-world analogies when helpful
- Encourage students to think critically
- Provide constructive feedback on mistakes
- Celebrate correct answers and progress
- Provide a clear explanation followed by the final answer in a section clearly labeled 'final Solution:'
- Break down complex problems into manageable steps

Remember: You're not just answering questions—you're building database expertise! 🦇`;

export async function sendBatBotMessage(messages: TutorMessage[]): Promise<string> {
  try {
    // Format conversation for Gemini
    const conversationText = messages.map(m =>
      `${m.role === 'user' ? 'Student' : 'Bat Bot'}: ${m.content}`
    ).join('\n\n');

    const fullPrompt = `${SYSTEM_PROMPT}\n\n${conversationText}\n\nBat Bot:`;

    const payload = {
      contents: [{
        parts: [{
          text: fullPrompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1500,
      }
    };

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 429) {
      return "I'm currently receiving too many requests. Please wait a moment and try again.";
    }

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errText}`);
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || 'I apologize, but I could not generate a response.';
  } catch (error: any) {
    if (error.message && error.message.includes('429')) {
      return "I'm currently receiving too many requests. Please wait a moment and try again.";
    }
    console.error('Bat Bot error:', error);
    return `🦇 Bat Bot encountered an issue: ${error.message || 'Failed to get response. Please try again.'}`;
  }
}