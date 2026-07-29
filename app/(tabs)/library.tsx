import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { MiniPlayer } from "@/components/MiniPlayer";
import { colors, radius, spacing } from "@/constants/theme";
import { curateRepertoire, type RepertoireItem } from "@/utils/repertoire";

const FILTERS = ["Playlists", "Artistas"];

const NOW = Date.now();
const DAY = 1000 * 60 * 60 * 24;

const LIBRARY_ITEMS: (RepertoireItem & { pinned: boolean; circular: boolean; gradient: boolean; subtitle: string })[] = [
  { id: "1", title: "Musicas_Curtidas_001", subtitle: "Playlist_001", pinned: true, circular: false, gradient: true, type: "playlist", genre: "Diversos", playCount: 42, lastPlayedAt: NOW - DAY * 1 },
  { id: "2", title: "Favoritas_001", subtitle: "Playlist_002", pinned: false, circular: false, gradient: false, type: "playlist", genre: "Pop", playCount: 18, lastPlayedAt: NOW - DAY * 5 },
  { id: "3", title: "Artista_001", subtitle: "Artista", pinned: false, circular: true, gradient: false, type: "artista", genre: "Rock", playCount: 30, lastPlayedAt: NOW - DAY * 2 },
  { id: "4", title: "Artista_002", subtitle: "Artista", pinned: false, circular: true, gradient: false, type: "artista", genre: "Rap", playCount: 5, lastPlayedAt: NOW - DAY * 60 },
  { id: "5", title: "Artista_003", subtitle: "Artista", pinned: false, circular: true, gradient: false, type: "artista", genre: "Pop", playCount: 12, lastPlayedAt: NOW - DAY * 10 },
];

export default function LibraryScreen() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [curated, setCurated] = useState(false);

  const displayedItems = useMemo(
    () => (curated ? curateRepertoire(LIBRARY_ITEMS) : LIBRARY_ITEMS),
    [curated]
  );

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.avatar}><Text style={styles.avatarLabel}>O</Text></View>
          <Text style={styles.headerTitle}>Sua Biblioteca</Text>
          <Ionicons name="search-outline" size={22} color={colors.text} style={styles.headerIcon} />
          <Ionicons name="add" size={26} color={colors.text} style={styles.headerIcon} />
        </View>

        <View style={styles.filters}>
          {FILTERS.map((filter) => (
            <Pressable key={filter} onPress={() => setActiveFilter(activeFilter === filter ? null : filter)} style={[styles.filterChip, activeFilter === filter && styles.filterChipActive]}>
              <Text style={[styles.filterChipText, activeFilter === filter && styles.filterChipTextActive]}>{filter}</Text>
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.importRow}>
          <Ionicons name="download-outline" size={20} color={colors.text} />
          <Text style={styles.importText}>Importe Musicas_Externas_001</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
        </Pressable>

        <Pressable style={[styles.organizeRow, curated && styles.organizeRowActive]} onPress={() => setCurated((prev) => !prev)}>
          <Ionicons name="sparkles-outline" size={18} color={curated ? "#000" : colors.text} />
          <Text style={[styles.organizeText, curated && styles.organizeTextActive]}>
            {curated ? "Repertório organizado" : "Organizar repertório"}
          </Text>
        </Pressable>

        <Pressable style={styles.sortRow}>
          <Ionicons name="swap-vertical" size={16} color={colors.text} />
          <Text style={styles.sortText}>{curated ? "Mais tocadas" : "Recentes"}</Text>
          <Ionicons name="grid-outline" size={18} color={colors.text} style={styles.gridIcon} />
        </Pressable>

        {displayedItems.map((item) => (
          <Pressable key={item.id} style={styles.libraryRow}>
            <View style={[styles.libraryThumb, item.circular && styles.libraryThumbCircular, item.gradient && styles.libraryThumbGradient]}>
              {item.gradient && <Ionicons name="heart" size={20} color={colors.text} />}
            </View>
            <View style={styles.libraryInfo}>
              <Text style={styles.libraryTitle}>{item.title}</Text>
              <View style={styles.librarySubtitleRow}>
                {item.pinned && <Ionicons name="pin" size={12} color={colors.accent} style={styles.pinIcon} />}
                <Text style={styles.librarySubtitle}>{item.subtitle}</Text>
              </View>
            </View>
          </Pressable>
        ))}

        <Pressable style={styles.addArtistRow}>
          <View style={styles.addArtistIcon}><Ionicons name="add" size={18} color={colors.text} /></View>
          <Text style={styles.libraryTitle}>Adicionar Artista_004</Text>
        </Pressable>
      </ScrollView>

      <MiniPlayer title="Musica_Tocando_0001" artist="Artista_001" onPress={() => router.push("/create")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  scrollContent: { paddingHorizontal: spacing.md, paddingBottom: spacing.md },
  header: { flexDirection: "row", alignItems: "center", paddingVertical: spacing.sm },
  avatar: { width: 28, height: 28, borderRadius: radius.pill, backgroundColor: colors.pink, alignItems: "center", justifyContent: "center" },
  avatarLabel: { color: colors.text, fontWeight: "700", fontSize: 13 },
  headerTitle: { color: colors.text, fontSize: 20, fontWeight: "800", marginLeft: spacing.sm, flex: 1 },
  headerIcon: { marginLeft: spacing.md },
  filters: { flexDirection: "row", gap: spacing.sm, marginTop: spacing.sm },
  filterChip: { paddingHorizontal: spacing.md, paddingVertical: 6, borderRadius: radius.pill, backgroundColor: colors.cardAlt },
  filterChipActive: { backgroundColor: colors.accent },
  filterChipText: { color: colors.text, fontSize: 13, fontWeight: "600" },
  filterChipTextActive: { color: "#000" },
  importRow: { flexDirection: "row", alignItems: "center", backgroundColor: colors.card, borderRadius: radius.md, padding: spacing.md, marginTop: spacing.md, gap: spacing.sm },
  importText: { color: colors.text, fontWeight: "600", fontSize: 13, flex: 1 },
  organizeRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: colors.cardAlt, borderRadius: radius.pill, paddingVertical: spacing.sm, marginTop: spacing.sm, gap: spacing.xs },
  organizeRowActive: { backgroundColor: colors.accent },
  organizeText: { color: colors.text, fontWeight: "700", fontSize: 13 },
  organizeTextActive: { color: "#000" },
  sortRow: { flexDirection: "row", alignItems: "center", marginTop: spacing.md, gap: spacing.xs },
  sortText: { color: colors.text, fontSize: 13, fontWeight: "600", flex: 1 },
  gridIcon: { marginLeft: "auto" },
  libraryRow: { flexDirection: "row", alignItems: "center", paddingVertical: spacing.sm, gap: spacing.sm },
  libraryThumb: { width: 56, height: 56, borderRadius: radius.sm, backgroundColor: colors.cardAlt },
  libraryThumbCircular: { borderRadius: radius.pill },
  libraryThumbGradient: { backgroundColor: colors.purple, alignItems: "center", justifyContent: "center" },
  libraryInfo: { flex: 1 },
  libraryTitle: { color: colors.text, fontWeight: "700", fontSize: 14 },
  librarySubtitleRow: { flexDirection: "row", alignItems: "center", marginTop: 2 },
  pinIcon: { marginRight: 4 },
  librarySubtitle: { color: colors.textSecondary, fontSize: 12 },
  addArtistRow: { flexDirection: "row", alignItems: "center", paddingVertical: spacing.sm, gap: spacing.sm },
  addArtistIcon: { width: 56, height: 56, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center" },
});