const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Analyze a task using AI and return { priority, ai_reason, estimatedTime, category }
 */
async function analyzeTask(title, description) {
  const prompt = `
You are an AI assistant. 
Analyze the task below and determine:
1. Priority level: High, Medium, or Low.
2. A short explanation why.
3. Estimated time to complete the task (short format like '2 hours', '1 day', '30 minutes').
4. Category: Choose one from School, Work, Personal, Fitness, Finance, Tech, Creative.
5. Subtasks: Break the task into smaller actionable steps as an array of strings.
6. Urgency score: Assign a numeric urgency from 1 (low) to 100 (high).
7. Smart suggestions: Provide 2-5 actionable tips or ideas to complete the task efficiently (array of strings).


Task Title: ${title}
Task Description: ${description}

Return JSON EXACTLY like this:
{"priority": "High", "reason": "Because ...", "estimatedTime": "2 hours", "category": "School","subtasks": ["Step 1", "Step 2"], "urgencyScore": 85, "suggestions": ["Tip 1", "Tip 2"]}
`;
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini", // fast + cheap + good
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
  });

  const text = completion.choices[0].message.content;

  // Parse the returned JSON
  try {
    const parsed = JSON.parse(text);
    return {
      priority: parsed.priority,
      ai_reason: parsed.reason,
      estimatedTime: parsed.estimatedTime,
      category: parsed.category,
      subtasks: parsed.subtasks,
        urgencyScore: parsed.urgencyScore,
        suggestions: parsed.suggestions,

    };
  } catch (err) {
    console.error("AI JSON parse error:", text);
    return {
      priority: "Medium",
      ai_reason: "AI failed to analyze, using default priority.",
      estimatedTime: "Unknown",
      category: "Uncategorized",
      subtasks: [],
      urgencyScore: 50,
      suggestions: [],
    };
  }
}

module.exports = { analyzeTask };
