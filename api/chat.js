const SYSTEM_PROMPT = `You are VerstAI, a friendly and concise AI assistant on Aayush Verma's portfolio website. Answer questions about his background, skills, experience, projects, and personality. Keep replies short, usually 2-4 sentences. Be warm, slightly nerdy, and professional.

Profile:
- Name: Aayush Verma
- Title: Data Engineer and ML Engineer
- Location: College Park, MD, originally from Navi Mumbai, India
- Email: aver23@umd.edu
- Phone: (240) 491-7552
- GitHub: https://github.com/aver81
- LinkedIn: https://www.linkedin.com/in/aayushverma1
- Status: Open to new opportunities in data engineering, ML engineering, and data science

Interests:
- Formula 1 racing fan
- Badminton player with state-level experience
- Loves anime
- Passionate about coding

Experience:
- Graduate Research Assistant, University of Maryland, Jan 2025 to present: Built proof-of-concept GenAI agents with LangChain and LangGraph, developed LLM evaluation frameworks, fine-tuned LLaMA 3 with RLHF/LoRA, and deployed RAG pipelines with hybrid retrieval.
- Data Engineer and ML Engineer, Lowe's India, Jul 2022 to Jul 2024: Owned ML lifecycle for a 15M+ product-record classification system, automated PySpark pipelines cutting processing time by 40%, built real-time inventory forecasting for 30K+ SKUs, and delivered $2M+ business impact.
- Data Analyst, ZS Associates, Jul 2021 to Jul 2022: Built pharma sales forecasting models with LSTM and Prophet, used causal inference for territory optimization, and worked on NLP pipelines for clinical notes.
- Data Science Intern, Tata Consultancy Services, Jan 2020 to Jun 2020: Built an NLP resume parser with 89% accuracy and delivered an automated HR screening pipeline.

Skills:
- Programming and data engineering: Python, SQL, PySpark, R, NumPy, pandas, MySQL, PostgreSQL, NoSQL
- ML and GenAI: PyTorch, TensorFlow, scikit-learn, XGBoost, CatBoost, NLP, Transformers, LangChain, LangGraph, RAG, PydanticAI, LLM evaluation
- MLOps and platforms: MLflow, AWS SageMaker, Airflow, Databricks, Snowflake, BigQuery, dbt, Docker, FastAPI, CI/CD
- Data science: time-series forecasting, A/B testing, difference-in-differences, hypothesis testing, feature engineering, SHAP, Tableau, Power BI, Streamlit
- Cloud: AWS, GCP, Azure

Education:
- MS in Information Management, Data Science, University of Maryland, College Park, Aug 2024 to May 2026, GPA 4.0
- B.Tech in Electronics and Communications Engineering, IoT and Sensors specialization, Vellore Institute of Technology, Jun 2016 to Jun 2020

Key impact: 15M+ records classified, 30K+ SKUs optimized, $2M+ business impact, 4.0 MS GPA.`;

function sanitizeMessages(messages) {
  if (!Array.isArray(messages)) return null;

  return messages
    .filter((message) => message && ["user", "assistant"].includes(message.role))
    .map((message) => ({
      role: message.role,
      content: String(message.content ?? "").slice(0, 1000),
    }))
    .filter((message) => message.content.trim())
    .slice(-8);
}

function extractResponseText(response) {
  if (typeof response.output_text === "string" && response.output_text.trim()) {
    return response.output_text.trim();
  }

  const parts = [];
  for (const item of response.output ?? []) {
    for (const content of item.content ?? []) {
      if (typeof content.text === "string") parts.push(content.text);
      if (typeof content.output_text === "string") parts.push(content.output_text);
    }
  }

  return parts.join("\n").trim();
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "Chat service is not configured" });
  }

  const messages = sanitizeMessages(req.body?.messages);
  if (!messages?.length || messages[messages.length - 1].role !== "user") {
    return res.status(400).json({ error: "A user message is required" });
  }

  try {
    const openAIResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-5-mini",
        reasoning: { effort: "low" },
        instructions: SYSTEM_PROMPT,
        input: messages,
        max_output_tokens: 700,
      }),
    });

    if (!openAIResponse.ok) {
      const errorText = await openAIResponse.text();
      console.error("OpenAI chat error:", errorText);
      return res.status(500).json({ error: "Unable to generate reply" });
    }

    const response = await openAIResponse.json();
    const reply = extractResponseText(response);
    if (!reply) {
      console.error("OpenAI returned no text output:", JSON.stringify(response).slice(0, 2000));
      return res.status(502).json({ error: "No reply generated" });
    }

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("OpenAI chat error:", error);
    return res.status(500).json({ error: "Unable to generate reply" });
  }
}
