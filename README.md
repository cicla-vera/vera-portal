# vera-portal

Portal React/Vite para visualizar ocorrencias Vera reais do backend.

## Rodar

```bash
npm install
npm run dev
```

Por padrao, o portal usa `http://localhost:3001/api`. Para alterar no build:

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

## Contrato real

O portal autentica em `POST /api/auth/login`, lista sessoes em
`GET /api/vera/alert-sessions?limit=12` e carrega o manifesto em
`GET /api/vera/alert-sessions/:id/evidence/export`.

O botao `PDF` usa a impressao do navegador com layout proprio para exportacao.
