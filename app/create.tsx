import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing } from "@/constants/theme";

const OPTIONS = [
  { id: "playlist", icon: "musical-notes-outline", title: "Playlist_001", subtitle: "Crie uma lista com Musica_001 e Episodio_001" },
  { id: "ai-playlist", icon: "sparkles-outline", title: "Playlist com IA", subtitle: "Gere uma playlist automática com base no seu repertório" },
  { id: "collaborative", icon: "people-outline", title: "Playlist_Colaborativa_001", subtitle: "Crie uma playlist com Usuario_001" },
  { id: "match", icon: "git-merge-outline", title: "Match_001", subtitle: "Junte Preferencias_001 em Playlist_002" },
  { id: "beat", icon: "pulse-outline", title: "Fazer seu bit", subtitle: "Monte uma batida do zero com loops e instrumentos" },
  { id: "album", icon: "albums-outline", title: "Álbum", subtitle: "Reúna faixas suas em um álbum para lançar" },
] as const;

const ROUTES: Partial<Record<(typeof OPTIONS)[number]["id"], string>> = {
  beat: "/create/beat",
  "ai-playlist": "/create/ai-playlist",
  album: "/create/album",
};

export default function CreateScreen() {
  const handlePress = (id: (typeof OPTIONS)[number]["id"]) => {
    const route = ROUTES[id];
    if (route) {
      router.push(route as never);
      return;
    }
    router.back();
  };

  return (
    <Pressable style={styles.overlay} onPress={() => router.back()}>
      <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
        {OPTIONS.map((option) => (
          <Pressable key={option.id} style={styles.optionRow} onPress={() => handlePress(option.id)}>
            <View style={styles.optionIcon}><Ionicons name={option.icon} size={20} color={colors.text} /></View>
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
            </View>
          </Pressable>
        ))}
      </Pressable>
      <Pressable style={styles.closeButton} onPress={() => router.back()}>
        <Ionicons name="close" size={26} color={colors.background} />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.85)", justifyContent: "flex-end", paddingBottom: 96, paddingHorizontal: spacing.md },
  sheet: { backgroundColor: colors.cardAlt, borderRadius: radius.lg, padding: spacing.sm },
  optionRow: { flexDirection: "row", alignItems: "center", paddingVertical: spacing.sm, gap: spacing.md },
  optionIcon: { width: 44, height: 44, borderRadius: radius.pill, backgroundColor: colors.border, alignItems: "center", justifyContent: "center" },
  optionText: { flex: 1 },
  optionTitle: { color: colors.text, fontWeight: "700", fontSize: 15 },
  optionSubtitle: { color: colors.textSecondary, fontSize: 12, marginTop: 2 },
  closeButton: { alignSelf: "center", width: 56, height: 56, borderRadius: radius.pill, backgroundColor: colors.text, alignItems: "center", justifyContent: "center", marginTop: spacing.md },
});