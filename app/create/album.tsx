import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { colors, radius, spacing } from "@/constants/theme";

type Track = { id: string; title: string };

export default function AlbumScreen() {
  const [albumTitle, setAlbumTitle] = useState("");
  const [tracks, setTracks] = useState<Track[]>([]);

  const addPlaceholderTrack = () => {
    const nextIndex = tracks.length + 1;
    setTracks((prev) => [...prev, { id: String(Date.now()), title: `Faixa_${String(nextIndex).padStart(2, "0")}` }]);
  };

  const removeTrack = (id: string) => {
    setTracks((prev) => prev.filter((track) => track.id !== id));
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="chevron-back" size={26} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Novo álbum</Text>
        <Pressable style={[styles.saveButton, (!albumTitle || tracks.length === 0) && styles.saveButtonDisabled]} disabled={!albumTitle || tracks.length === 0}>
          <Text style={styles.saveButtonText}>Publicar</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Pressable style={styles.coverPlaceholder}>
          <Ionicons name="image-outline" size={32} color={colors.textSecondary} />
          <Text style={styles.coverLabel}>Adicionar capa</Text>
        </Pressable>

        <Text style={styles.label}>Nome do álbum</Text>
        <TextInput
          value={albumTitle}
          onChangeText={setAlbumTitle}
          placeholder="Ex: Meu primeiro álbum"
          placeholderTextColor={colors.textSecondary}
          style={styles.nameInput}
        />

        <View style={styles.tracksHeader}>
          <Text style={styles.label}>Faixas ({tracks.length})</Text>
          <Pressable onPress={addPlaceholderTrack} style={styles.addTrackButton}>
            <Ionicons name="add" size={16} color="#000" />
            <Text style={styles.addTrackText}>Adicionar faixa</Text>
          </Pressable>
        </View>

        {tracks.length === 0 && (
          <Text style={styles.emptyState}>Nenhuma faixa adicionada ainda.</Text>
        )}

        {tracks.map((track, index) => (
          <View key={track.id} style={styles.trackRow}>
            <Text style={styles.trackIndex}>{index + 1}</Text>
            <Text style={styles.trackTitle}>{track.title}</Text>
            <Pressable onPress={() => removeTrack(track.id)} hitSlop={8}>
              <Ionicons name="close-circle-outline" size={20} color={colors.textSecondary} />
            </Pressable>
          </View>
        ))}
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
  coverPlaceholder: { width: 140, height: 140, borderRadius: radius.md, backgroundColor: colors.card, alignItems: "center", justifyContent: "center", alignSelf: "center", marginTop: spacing.md, gap: spacing.xs },
  coverLabel: { color: colors.textSecondary, fontSize: 12 },
  label: { color: colors.textSecondary, fontSize: 12, fontWeight: "600", marginTop: spacing.md, marginBottom: spacing.xs },
  nameInput: { backgroundColor: colors.card, borderRadius: radius.sm, paddingHorizontal: spacing.md, paddingVertical: 10, color: colors.text, fontSize: 15, fontWeight: "600" },
  tracksHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: spacing.lg },
  addTrackButton: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: colors.accent, borderRadius: radius.pill, paddingHorizontal: spacing.sm, paddingVertical: 6 },
  addTrackText: { color: "#000", fontWeight: "700", fontSize: 12 },
  emptyState: { color: colors.textSecondary, fontSize: 13, marginTop: spacing.sm },
  trackRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm, paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border },
  trackIndex: { color: colors.textSecondary, fontSize: 13, width: 20 },
  trackTitle: { color: colors.text, fontWeight: "600", fontSize: 14, flex: 1 },
});