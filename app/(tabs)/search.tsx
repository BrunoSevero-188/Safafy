import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { MiniPlayer } from "@/components/MiniPlayer";
import { colors, radius, spacing } from "@/constants/theme";

const DISCOVER_TAGS = ["#genero_001", "#playlist_001", "#artista_001"];

const CATEGORIES = [
  { id: "1", title: "Musicas", color: colors.pink },
  { id: "2", title: "Podcasts", color: "#5A8F29" },
  { id: "3", title: "Eventos_001\nao_vivo", color: colors.purple },
  { id: "4", title: "Mix_001\npara_voce", color: colors.blue },
  { id: "5", title: "Proximos\nLancamentos", color: "#1E5C4A" },
  { id: "6", title: "Lancamentos", color: colors.pink },
];

export default function SearchScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarLabel}>O</Text>
          </View>
          <Text style={styles.headerTitle}>Buscar</Text>
          <Ionicons name="camera-outline" size={24} color={colors.text} style={styles.cameraIcon} />
        </View>

        <Pressable style={styles.searchBar}>
          <Ionicons name="search" size={18} color="#000" />
          <TextInput
            editable={false}
            placeholder="Buscar Musica_001"
            placeholderTextColor="#5A5A5A"
            style={styles.searchInput}
          />
        </Pressable>

        <Text style={styles.sectionTitle}>Descubra Prototipo_001</Text>
        <FlatList
          data={DISCOVER_TAGS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.discoverList}
          renderItem={({ item }) => (
            <Pressable style={styles.discoverCard}>
              <Text style={styles.discoverTag}>{item}</Text>
            </Pressable>
          )}
        />

        <View style={styles.categoryGrid}>
          {CATEGORIES.map((category) => (
            <Pressable
              key={category.id}
              style={[styles.categoryCard, { backgroundColor: category.color }]}
            >
              <Text style={styles.categoryTitle}>{category.title}</Text>
            </Pressable>
          ))}
        </View>
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
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    backgroundColor: colors.pink,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarLabel: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 13,
  },
  headerTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "800",
    marginLeft: spacing.sm,
    flex: 1,
  },
  cameraIcon: {
    marginLeft: "auto",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.text,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    height: 44,
    marginTop: spacing.sm,
  },
  searchInput: {
    marginLeft: spacing.sm,
    color: "#000",
    fontSize: 14,
    flex: 1,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700",
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  discoverList: {
    gap: spacing.sm,
  },
  discoverCard: {
    width: 120,
    height: 160,
    borderRadius: radius.sm,
    backgroundColor: colors.cardAlt,
    justifyContent: "flex-end",
    padding: spacing.sm,
  },
  discoverTag: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 12,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  categoryCard: {
    width: "48%",
    height: 90,
    borderRadius: radius.sm,
    padding: spacing.sm,
    justifyContent: "flex-start",
  },
  categoryTitle: {
    color: colors.text,
    fontWeight: "800",
    fontSize: 16,
  },
});
