import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MiniPlayer } from "@/components/MiniPlayer";
import { colors, radius, spacing } from "@/constants/theme";

const FILTERS = ["Tudo", "Musicas", "Podcasts"];

const RECENT_ITEMS = [
  { id: "1", title: "Artista_001", circular: true },
  { id: "2", title: "Playlist_001", circular: false },
  { id: "3", title: "Artista_002", circular: true },
  { id: "4", title: "Album_001", circular: false },
  { id: "5", title: "Playlist_002", circular: true },
];

const WEEKLY_CARDS = [
  { id: "1", title: "Colecao_001", subtitle: "Musica_001, Musica_002, Musica_003, Musica_004" },
  { id: "2", title: "Colecao_002", subtitle: "Lancamentos_001 dos artistas em teste" },
  { id: "3", title: "Colecao_003", subtitle: "Musica_005, Musica_006..." },
];

export default function HomeScreen() {
  const [activeFilter, setActiveFilter] = useState("Tudo");

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.avatar} />
          <View style={styles.filters}>
            {FILTERS.map((filter) => (
              <Pressable
                key={filter}
                onPress={() => setActiveFilter(filter)}
                style={[
                  styles.filterChip,
                  activeFilter === filter && styles.filterChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    activeFilter === filter && styles.filterChipTextActive,
                  ]}
                >
                  {filter}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.recentGrid}>
          {RECENT_ITEMS.map((item) => (
            <Pressable key={item.id} style={styles.recentRow}>
              <View
                style={[
                  styles.recentThumb,
                  item.circular && styles.recentThumbCircular,
                ]}
              />
              <Text style={styles.recentTitle} numberOfLines={1}>
                {item.title}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.sectionLabel}>Novo lancamento de</Text>
        <Text style={styles.sectionTitle}>Artista_003</Text>
        <View style={styles.releaseCard}>
          <View style={styles.releaseCover} />
          <View style={styles.releaseInfo}>
            <Text style={styles.releaseType}>Album</Text>
            <Text style={styles.releaseName}>Album_002</Text>
            <Text style={styles.releaseArtist}>Artista_003</Text>
          </View>
          <View style={styles.releaseActions}>
            <Ionicons name="ellipsis-vertical" size={18} color={colors.textSecondary} />
            <Pressable style={styles.releaseAdd}>
              <Ionicons name="add" size={20} color={colors.textSecondary} />
            </Pressable>
            <Pressable style={styles.releasePlay}>
              <Ionicons name="play" size={18} color="#000" />
            </Pressable>
          </View>
        </View>

        <Text style={[styles.sectionTitle, styles.sectionTitleSpacing]}>Listas_Prototipo</Text>
        <FlatList
          data={WEEKLY_CARDS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.weeklyList}
          renderItem={({ item }) => (
            <Pressable style={styles.weeklyCard}>
              <View style={styles.weeklyCover} />
              <Text style={styles.weeklyTitle}>{item.title}</Text>
              <Text style={styles.weeklySubtitle} numberOfLines={2}>
                {item.subtitle}
              </Text>
            </Pressable>
          )}
        />
      </ScrollView>

      <MiniPlayer
        title="Musica_Tocando_0001"
        artist="Artista_001"
        onPress={() => router.push("/create")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: radius.pill,
    backgroundColor: colors.pink,
    marginRight: spacing.sm,
  },
  filters: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.cardAlt,
  },
  filterChipActive: {
    backgroundColor: colors.text,
  },
  filterChipText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "600",
  },
  filterChipTextActive: {
    color: colors.background,
  },
  recentGrid: {
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  recentRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: radius.sm,
    overflow: "hidden",
  },
  recentThumb: {
    width: 48,
    height: 48,
    backgroundColor: colors.cardAlt,
  },
  recentThumbCircular: {
    borderRadius: radius.pill,
    margin: 4,
  },
  recentTitle: {
    color: colors.text,
    fontWeight: "600",
    fontSize: 13,
    marginLeft: spacing.sm,
    flexShrink: 1,
  },
  sectionLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: spacing.lg,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "700",
  },
  sectionTitleSpacing: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  releaseCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.sm,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.sm,
  },
  releaseCover: {
    width: 64,
    height: 64,
    borderRadius: radius.sm,
    backgroundColor: colors.orange,
  },
  releaseInfo: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  releaseType: {
    color: colors.textSecondary,
    fontSize: 11,
  },
  releaseName: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
  },
  releaseArtist: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  releaseActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  releaseAdd: {
    padding: 2,
  },
  releasePlay: {
    backgroundColor: colors.text,
    borderRadius: radius.pill,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  weeklyList: {
    gap: spacing.md,
  },
  weeklyCard: {
    width: 160,
  },
  weeklyCover: {
    width: 160,
    height: 160,
    borderRadius: radius.sm,
    backgroundColor: colors.blue,
    marginBottom: spacing.xs,
  },
  weeklyTitle: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 13,
  },
  weeklySubtitle: {
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
});
