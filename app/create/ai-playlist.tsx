import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { colors, radius, spacing } from "@/constants/theme";
import { curateRepertoire, type RepertoireItem } from "@/utils/repertoire";

const NOW = Date.now();
const DAY = 1000 * 60 * 60 * 24;

const CATALOG: RepertoireItem[] = [
  { id: "1", title: "Musica_001", type: "musica", genre: "Pop", playCount: 40, lastPlayedAt: NOW - DAY * 1 },
  { id: "2", title: "Musica_002", type: "musica", genre: "Rock", playCount: 22, lastPlayedAt: NOW - DAY * 3 },
  { id: "3", title: "Musica_003", type: "musica", genre: "Pop", playCount: 15, lastPlayedAt: NOW - DAY * 8 },
  { id: "4", title: "Musica_004", type: "musica", genre: "Rap", playCount: 33, lastPlayedAt: NOW - DAY * 2 },
  { id: "5", title: "Musica_005", type: "musica", genre: "Rock", playCount: 6, lastPlayedAt: NOW - DAY * 50 },
  { id: "6", title: "Musica_006", type: "musica", genre: "Pop", playCount: 28, lastPlayedAt: NOW - DAY * 4 },
];

const GENRES = ["Todos", "Pop", "Rock", "Rap"];

export default function AiPlaylistScreen() {
  const [playlistName, setPlaylistName] = useState("Playlist com IA");
  const [genreFilter, setGenreFilter] = useState("Todos");
  const [generated, setGenerated] = useState<RepertoireItem[] | null>(null);

  const filteredCatalog = useMemo(
    () => (genreFilter === "Todos" ? CATALOG : CATALOG.filter((item) => item.genre === genreFilter)),
    [genreFilter]
  );

  const handleGenerate = () => {
    setGenerated(curateRepertoire(filteredCatalog));
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="chevron-back" size={26} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Playlist com IA</Text>
        <Pressable style={[styles.saveButton, !generated && styles.saveButtonDisabled]} disabled={!generated}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.label}>Nome da playlist</Text>
        <TextInput
          value={playlistName}
          onChangeText={setPlaylistName}
          style={styles.nameInput}
          placeholderTextColor={colors.textSecondary}
        />

        <Text style={styles.label}>Gênero</Text>
        <View style={styles.genreRow}>
          {GENRES.map((genre) => (
            <Pressable
              key={genre}
              onPress={() => {
                setGenreFilter(genre);
                setGenerated(null);
              }}
              style={[styles.genreChip, genreFilter === genre && styles.genreChipActive]}
            >
              <Text style={[styles.genreChipText, genreFilter === genre && styles.genreChipTextActive]}>{genre}</Text>
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.generateButton} onPress={handleGenerate}>
          <Ionicons name="sparkles" size={18} color="#000" />
          <Text style={styles.generateButtonText}>
            {generated ? "Gerar novamente" : "Gerar playlist"}
          </Text>
        </Pressable>

        {generated && (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>
              {generated.length} faixa(s) organizadas por mais tocadas e mais recentes
            </Text>
            {generated.map((item, index) => (
              <View key={item.id} style={styles.resultRow}>
                <Text style={styles.resultIndex}>{index + 1}</Text>
                <View style={styles.resultInfo}>
                  <Text style={styles.resultItemTitle}>{item.title}</Text>
                  <Text style={styles.resultItemSubtitle}>{item.genre} · {item.playCount} plays</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  headerTitle: { color: colors.text, fontSize: 17, fontWeight: "700" },
  saveButton: { backgroundColor: colors.accent, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: 6 },
  saveButtonDisabled: { opacity: 0.4 },
  saveButtonText: { color: "#000", fontWeight: "700", fontSize: 13 },
  scrollContent: { paddingHorizontal: spacing.md, paddingBottom: spacing.xl },
  label: { color: colors.textSecondary, fontSize: 12, fontWeight: "600", marginTop: spacing.md, marginBottom: spacing.xs },
  nameInput: { backgroundColor: colors.card, borderRadius: radius.sm, paddingHorizontal: spacing.md, paddingVertical: 10, color: colors.text, fontSize: 15, fontWeight: "600" },
  genreRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  genreChip: { paddingHorizontal: spacing.md, paddingVertical: 6, borderRadius: radius.pill, backgroundColor: colors.cardAlt },
  genreChipActive: { backgroundColor: colors.text },
  genreChipText: { color: colors.text, fontSize: 13, fontWeight: "600" },
  genreChipTextActive: { color: colors.background },
  generateButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.xs, backgroundColor: colors.accent, borderRadius: radius.pill, paddingVertical: 12, marginTop: spacing.lg },
  generateButtonText: { color: "#000", fontWeight: "700", fontSize: 14 },
  resultCard: { backgroundColor: colors.card, borderRadius: radius.md, padding: spacing.md, marginTop: spacing.lg },
  resultTitle: { color: colors.textSecondary, fontSize: 12, marginBottom: spacing.sm },
  resultRow: { flexDirection: "row", alignItems: "center", paddingVertical: spacing.xs, gap: spacing.sm },
  resultIndex: { color: colors.textSecondary, fontSize: 13, width: 20 },
  resultInfo: { flex: 1 },
  resultItemTitle: { color: colors.text, fontWeight: "600", fontSize: 14 },
  resultItemSubtitle: { color: colors.textSecondary, fontSize: 12, marginTop: 1 },
});