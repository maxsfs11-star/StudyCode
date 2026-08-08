import { createServer } from 'node:http';

const PORT = Number(process.env.PORT || 8787);
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-5';
const MAX_BODY_SIZE = 24 * 1024;

function sendJson(response, status, body) {
  response.writeHead(status, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json; charset=utf-8',
  });
  response.end(JSON.stringify(body));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', (chunk) => {
      body += chunk;
      if (Buffer.byteLength(body, 'utf8') > MAX_BODY_SIZE) {
        reject(new Error('payload_too_large'));
        request.destroy();
      }
    });
    request.on('end', () => resolve(body));
    request.on('error', reject);
  });
}

function buildPrompt({ message, profile, progress }) {
  const course = profile?.preferredCourseId || 'javascript';
  const level = profile?.experienceLevel || 'iniciante';
  const xp = Number(progress?.xp || 0);
  const completed = Number(progress?.completedLessons || 0);

  return [
    `Aluno: ${profile?.displayName || 'Estudante'}`,
    `Nivel: ${level}`,
    `Trilha atual: ${course}`,
    `XP: ${xp}; aulas concluidas: ${completed}`,
    '',
    `Duvida do aluno: ${message}`,
  ].join('\n');
}

async function askOpenAI(payload) {
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      store: false,
      instructions:
        'Voce e Byte, mentor do StudyCode. Responda em portugues do Brasil, com clareza, incentivo e foco pratico. Explique codigo em passos curtos. Nao invente fatos sobre o progresso do aluno. Se a pergunta fugir de programacao, redirecione com gentileza.',
      input: buildPrompt(payload),
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.message || 'openai_request_failed');
  }

  if (data?.output_text) return data.output_text;

  const text = data?.output
    ?.flatMap((item) => item.content || [])
    ?.find((item) => item.type === 'output_text')?.text;
  if (text) return text;

  throw new Error('empty_model_response');
}

const server = createServer(async (request, response) => {
  if (request.method === 'OPTIONS') {
    response.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    });
    response.end();
    return;
  }

  if (request.method === 'GET' && request.url === '/health') {
    sendJson(response, 200, { ok: true, provider: OPENAI_API_KEY ? 'openai' : 'local-fallback' });
    return;
  }

  if (request.method !== 'POST' || request.url !== '/mentor') {
    sendJson(response, 404, { error: 'not_found' });
    return;
  }

  if (!OPENAI_API_KEY) {
    sendJson(response, 503, { error: 'mentor_not_configured' });
    return;
  }

  try {
    const rawBody = await readBody(request);
    const body = JSON.parse(rawBody || '{}');
    if (typeof body.message !== 'string' || body.message.trim().length === 0) {
      sendJson(response, 400, { error: 'message_required' });
      return;
    }

    const reply = await askOpenAI({
      message: body.message.trim().slice(0, 2000),
      profile: body.profile,
      progress: body.progress,
    });
    sendJson(response, 200, { reply });
  } catch (error) {
    console.error('[mentor-api]', error.message);
    sendJson(response, 502, { error: 'mentor_unavailable' });
  }
});

server.listen(PORT, () => {
  console.log(`StudyCode Mentor API listening on http://localhost:${PORT}`);
});
