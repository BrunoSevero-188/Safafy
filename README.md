# Telas geradas para o App_Musica

Estrutura pronta pra Expo Router (usa `@/` como alias pra `src/`, igual já
está configurado no seu `tsconfig.json`).

## Onde colar cada arquivo

```
app/
  _layout.tsx              → substitui o atual (Stack + rota "create" como modal)
  create.tsx                → tela modal "Criar" (Playlist / Playlist colaborativa / Match)
  (tabs)/
    _layout.tsx              → tab bar com Início, Buscar, Sua Biblioteca, Premium, Criar
    index.tsx                → Início
    search.tsx                → Buscar
    library.tsx                → Sua Biblioteca
    premium.tsx                → Premium
    create.tsx                → placeholder (não usado, só evita erro de rota)

src/
  components/MiniPlayer.tsx   → barra do player fixa acima da tab bar
  constants/theme.ts          → cores, espaçamento e raio usados em todas as telas
```

## Dependência que falta

O `MiniPlayer` usa `expo-image`, que já está nas suas dependências
(`expo-image` já aparece no `package.json` do dump). Os ícones usam
`@expo/vector-icons`, que já vem junto do Expo — não precisa instalar nada.

## Como a aba "Criar" funciona

Ela não é uma tela normal: o `listener` no `(tabs)/_layout.tsx` intercepta o
toque e chama `router.push("/create")`, que abre `app/create.tsx` como modal
transparente por cima da tela atual — igual ao comportamento das imagens.

## Próximos passos sugeridos

- Trocar os placeholders coloridos (View com `backgroundColor`) pelas capas
  reais dos álbuns/artistas.
- Conectar os dados mockados (RECENT_ITEMS, LIBRARY_ITEMS, etc.) a uma API
  ou banco local.
- Ligar o botão de play do `MiniPlayer` a um player de áudio de verdade
  (ex: `expo-audio`).
