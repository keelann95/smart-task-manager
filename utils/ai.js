const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Analyze a task using AI and return { priority, ai_reason }
 */
async function analyzeTask(title, description) {
  const prompt = `
You are an AI assistant. 
Analyze the task below and determine:
1. Priority level: High, Medium, or Low.
2. A short explanation why.
3. Estimated time to complete the task (short format like '2 hours', '1 day', '30 minutes').


Task Title: ${title}
Task Description: ${description}

Return JSON EXACTLY like this:
{"priority": "High", "reason": "Because ...", "estimatedTime": "2 hours"}
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
    };
  } catch (err) {
    console.error("AI JSON parse error:", text);
    return {
      priority: "Medium",
      ai_reason: "AI failed to analyze, using default priority.",
      estimatedTime: "Unknown",
    };
  }
}

module.exports = { analyzeTask };
