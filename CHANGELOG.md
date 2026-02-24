# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

## [1.2.0] - 2026-02-24

### Adicionado
- Integração com **Open-Meteo API** (Migração do WeatherAPI).
- Sistema de **Geocoding** para busca de cidades por nome.
- Suporte completo a **JSX** em todos os componentes.
- Implementação do **Pinia** para gerenciamento de estado global.
- Suporte ao **Tailwind CSS v4**.

### Alterado
- **Design Overhaul**: Novo layout imersivo com dashboard em tela cheia.
- **Gradients Dinâmicos**: O fundo da aplicação agora muda de cor conforme a condição climática (WMO Codes).
- **Typography**: Atualização para uma escala tipográfica mais ousada e moderna.
- **Glassmorphism**: Efeitos de desfoque profundos em todos os painéis.

### Removido
- Dependência de chaves de API (`VITE_WEATHER_API_KEY`).
- Arquivos `.vue` antigos (Migrados para `.jsx`).
- Estilos CSS redundantes (Substituídos por utilitários Tailwind).

### Corrigido
- Erro de configuração do PostCSS para Tailwind v4.
- Conflito de `bg-white/20` desconhecido no PostCSS.
- Bug de auto-referência no store do clima.

---

## [1.1.0] - 2026-02-11
- Versão inicial Quasar (SFCs).
- Funcionalidades básicas de busca de clima.
