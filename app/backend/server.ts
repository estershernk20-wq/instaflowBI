
import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(express.json());
app.use(cors());

// Configuração da IA
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// System Instruction para a IA atuar como o Especialista Supremo
const SYSTEM_INSTRUCTION = `
Você é o "Estrategista do Empreendedor", um especialista sênior em Marketing Digital, Copywriting e Vendas Online.
Sua missão é fazer o usuário VENDER pelo Instagram e Google.
Você domina:
1. Algoritmos do Instagram (Adam Mosseri, Rafael Kiso).
2. Tráfego Pago e Orgânico.
3. Copywriting Persuasivo (Gatilhos mentais, AIDA).
4. Análise de Concorrência.

Sempre responda com planos de ação práticos, focados em conversão e ROI.
Não use linguagem genérica. Seja diretivo e estratégico.
`;

// Rota: Gerar Planejamento de Conteúdo Semanal
app.post('/api/generate-strategy', async (req, res) => {
  try {
    const { niche, product, goal, personaData } = req.body;

    const prompt = `
    Analise o seguinte perfil:
    - Nicho: ${niche}
    - Produto: ${product}
    - Objetivo: ${goal}
    - Dados da Persona: ${JSON.stringify(personaData)}

    Crie um calendário editorial de 7 dias focado em VENDAS.
    Para cada dia, defina:
    1. Formato (Reels, Story, Carrossel).
    2. Headline (Gancho/Clickbait ético).
    3. Descrição do conteúdo visual.
    4. Legenda com Copywriting (incluindo CTA).
    5. Objetivo do post (Atração, Conexão ou Venda).
    
    Retorne a resposta estritamente em JSON seguindo este schema:
    [{ "day": "Segunda", "format": "Reels", "headline": "...", "script": "...", "caption": "...", "goal": "..." }, ...]
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json'
      }
    });

    res.json(JSON.parse(response.text));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao gerar estratégia.' });
  }
});

// Rota: Análise de Perfil (Simulação de Análise de Concorrência/Métricas)
app.post('/api/analyze-profile', async (req, res) => {
  // Em produção, isso faria scraping ou usaria API do Instagram Graph
  // Aqui simulamos a análise IA baseada em dados fornecidos
  const { metrics, bio } = req.body;

  const prompt = `
  Analise estes dados de um perfil comercial:
  Bio: "${bio}"
  Métricas Recentes: ${JSON.stringify(metrics)}

  Identifique 3 erros fatais que estão impedindo vendas e 3 ações imediatas para corrigir (Quick Wins).
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: { systemInstruction: SYSTEM_INSTRUCTION }
  });

  res.json({ analysis: response.text });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
