import { Redirect } from "expo-router";

// Essa rota existe só para a aba "Criar" ter um arquivo correspondente.
// A navegação real é interceptada em (tabs)/_layout.tsx e abre /create como modal.
export default function CreateTabPlaceholder() {
  return <Redirect href="/" />;
}
