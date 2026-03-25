import axios from 'axios';
import type { Item } from '@/types';

const isOllama = !import.meta.env.VITE_LLM_API_KEY;

const llmClient = axios.create({
  baseURL: isOllama
    ? (import.meta.env.VITE_LLM_API_URL ?? 'http://localhost:11434')
    : (import.meta.env.VITE_LLM_API_URL ?? 'https://api.x.ai'),
  headers: isOllama
    ? { 'Content-Type': 'application/json' }
    : {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_LLM_API_KEY}`,
      },
});

const buildItemContext = (item: Partial<Item> & { title: string; category: string }): string => {
  const lines = [
    `Категория: ${item.category}`,
    `Название: ${item.title}`,
    item.price != null ? `Цена: ${item.price} ₽` : null,
    item.description ? `Текущее описание: ${item.description}` : null,
  ];

  if (item.params) {
    lines.push('Характеристики:');
    for (const [key, value] of Object.entries(item.params)) {
      if (value !== undefined && value !== null && value !== '') {
        lines.push(`  ${key}: ${value}`);
      }
    }
  }

  return lines.filter(Boolean).join('\n');
};

const askLLM = async (prompt: string, signal?: AbortSignal): Promise<string> => {
  if (isOllama) {
    const { data } = await llmClient.post(
      '/api/generate',
      {
        model: import.meta.env.VITE_LLM_MODEL ?? 'llama3',
        prompt,
        stream: false,
      },
      { signal }
    );
    return data.response as string;
  } else {
    const { data } = await llmClient.post(
      '/v1/chat/completions',
      {
        model: import.meta.env.VITE_LLM_MODEL ?? 'grok-3-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1000,
      },
      { signal }
    );
    return data.choices[0].message.content as string;
  }
};

export const generateDescription = async (
  item: Partial<Item> & { title: string; category: string },
  signal?: AbortSignal
): Promise<string> => {
  const context = buildItemContext(item);
  const hasDescription = Boolean(item.description?.trim());

  const prompt = hasDescription
    ? `Ты помогаешь продавцам на Авито улучшать объявления.
Улучши описание объявления — сделай его более привлекательным, информативным и продающим.
Верни ТОЛЬКО текст описания, без пояснений и заголовков.

${context}`
    : `Ты помогаешь продавцам на Авито писать объявления.
Придумай привлекательное описание для объявления на основе характеристик.
Описание должно быть живым, информативным, 3-5 предложений.
Верни ТОЛЬКО текст описания, без пояснений и заголовков.

${context}`;

  return askLLM(prompt, signal);
};

export const estimatePrice = async (
  item: Partial<Item> & { title: string; category: string },
  signal?: AbortSignal
): Promise<string> => {
  const context = buildItemContext(item);

  const prompt = `Ты эксперт по ценообразованию на российском рынке объявлений Авито.
На основе характеристик товара предложи справедливую рыночную цену.
Ответь коротко: только цифра в рублях и одно предложение с обоснованием.
Формат: "X ₽ — [обоснование]"

${context}`;

  return askLLM(prompt, signal);
};

export type ChatMessage = { role: 'user' | 'assistant'; content: string };

export const sendChatMessage = async (
  messages: ChatMessage[],
  item: Partial<Item> & { title: string; category: string },
  signal?: AbortSignal
): Promise<string> => {
  const context = buildItemContext(item);
  const systemPrompt = `Ты AI-ассистент, который помогает продавцу улучшить объявление на Авито.
У тебя есть контекст объявления:
${context}

Отвечай по-русски, кратко и по делу.`;

  if (isOllama) {
    const fullPrompt = `${systemPrompt}\n\n${messages.map((m) => `${m.role === 'user' ? 'Пользователь' : 'Ассистент'}: ${m.content}`).join('\n')}\nАссистент:`;
    return askLLM(fullPrompt, signal);
  } else {
    const { data } = await llmClient.post(
      '/v1/chat/completions',
      {
        model: import.meta.env.VITE_LLM_MODEL ?? 'grok-3-mini',
        messages: [{ role: 'system', content: systemPrompt }, ...messages],
        max_tokens: 1000,
      },
      { signal }
    );
    return data.choices[0].message.content as string;
  }
};
