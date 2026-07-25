import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing } from "@/constants/theme";

type MiniPlayerProps = {
  title: string;
  artist: string;
  coverUri?: string;
  onPress?: () => void;
  onPlayPress?: () => void;
};

export function MiniPlayer({
  title,
  artist,
  coverUri,
  onPress,
  onPlayPress,
}: MiniPlayerProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.trackInfo}>
        {coverUri ? (
          <Image source={{ uri: coverUri }} style={styles.cover} />
        ) : (
          <View style={[styles.cover, styles.coverPlaceholder]} />
        )}
        <View style={styles.textBlock}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {artist}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Ionicons name="tv-outline" size={20} color={colors.text} />
        <Ionicons
          name="add-circle-outline"
          size={22}
          color={colors.text}
          style={styles.actionSpacing}
        />
        <Pressable onPress={onPlayPress} hitSlop={8}>
          <Ionicons name="play" size={22} color={colors.text} />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#8C5A2B",
    marginHorizontal: 8,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  trackInfo: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  cover: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
  },
  coverPlaceholder: {
    backgroundColor: colors.cardAlt,
  },
  textBlock: {
    marginLeft: spacing.sm,
    flexShrink: 1,
  },
  title: {
    color: colors.text,
    fontWeight: "600",
    fontSize: 13,
  },
  artist: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 12,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionSpacing: {
    marginHorizontal: spacing.md,
  },
});
