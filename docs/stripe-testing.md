# StudyCode — Stripe em testes

O aplicativo nunca recebe `STRIPE_SECRET_KEY`. A cobrança fica em um serviço separado (`server/billing-api.mjs`) e o app recebe apenas a URL pública do Checkout hospedado.

## Variáveis do serviço de cobrança

Configure no Render, no serviço separado do StudyCode:

```env
PORT=8790
DATABASE_URL=<PostgreSQL usado pelo StudyCode>
JWT_SECRET=<o mesmo segredo usado para assinar os tokens studycode_student>
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_PREMIUM_ID=price_...
STRIPE_SUCCESS_URL=studycode://billing/success
STRIPE_CANCEL_URL=studycode://billing/cancelled
CORS_ORIGIN=*
```

No app Expo, configure somente:

```env
EXPO_PUBLIC_BILLING_API_URL=https://<servico-de-cobranca-studycode>.onrender.com
```

Nunca use `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` ou `STRIPE_PRICE_PREMIUM_ID` em `.env` do Expo, `app.json`, `App.js` ou no GitHub.

## Webhooks

O webhook já existente do VM Nexus continua intacto e pode continuar monitorando os pagamentos. Para liberar o Premium no StudyCode, adicione também um endpoint de webhook para o serviço de cobrança do StudyCode:

```text
https://<servico-de-cobranca-studycode>.onrender.com/api/webhooks/stripe
```

Eventos necessários:

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `checkout.session.async_payment_failed`

O serviço verifica a assinatura do webhook, registra o `event.id` e ignora reenvios duplicados. O Premium só aparece como ativo após confirmação do servidor.

## Testes Stripe

Use apenas o modo Test da Stripe. Exemplos:

- aprovado: `4242 4242 4242 4242`
- recusado: `4000 0000 0000 9995`

Pix e boleto aparecem somente se estiverem habilitados na conta Stripe e forem compatíveis com a assinatura configurada. O app não presume aprovação pelo retorno do navegador; use “Atualizar status” depois do webhook.

## Rotas

- `POST /api/studycode/billing/checkout-session`
- `GET /api/studycode/billing/status`
- `GET /api/studycode/billing/history`
- `POST /api/studycode/billing/cancel`
- `POST /api/webhooks/stripe`
