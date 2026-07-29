import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing } from "@/constants/theme";

const LOOPS = [
  { id: "1", title: "Loop_Kick_001", color: colors.pink },
  { id: "2", title: "Loop_Snare_001", color: colors.purple },
  { id: "3", title: "Loop_HiHat_001", color: colors.blue },
  { id: "4", title: "Loop_Bass_001", color: colors.orange },
];

const INSTRUMENTS = ["Bateria", "Baixo", "Synth", "Vocal", "FX"];

const MIN_BPM = 60;
const MAX_BPM = 200;

export default function BeatEditorScreen() {
  const [bpm, setBpm] = useState(120);
  const [selectedLoops, setSelectedLoops] = useState<string[]>([]);
  const [activeInstrument, setActiveInstrument] = useState(INSTRUMENTS[0]);

  const toggleLoop = (id: string) => {
    setSelectedLoops((prev) =>
      prev.includes(id) ? prev.filter((loopId) => loopId !== id) : [...prev, id]
    );
  };

  const adjustBpm = (delta: number) => {
    setBpm((prev) => Math.min(MAX_BPM, Math.max(MIN_BPM, prev + delta)));
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="chevron-back" size={26} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Fazer seu bit</Text>
        <Pressable style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.bpmCard}>
          <Text style={styles.bpmLabel}>BPM</Text>
          <View style={styles.bpmControls}>
            <Pressable style={styles.bpmButton} onPress={() => adjustBpm(-1)}>
              <Ionicons name="remove" size={22} color={colors.text} />
            </Pressable>
            <Text style={styles.bpmValue}>{bpm}</Text>
            <Pressable style={styles.bpmButton} onPress={() => adjustBpm(1)}>
              <Ionicons name="add" size={22} color={colors.text} />
            </Pressable>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Instrumentos</Text>
        <View style={styles.instrumentRow}>
          {INSTRUMENTS.map((instrument) => (
            <Pressable
              key={instrument}
              onPress={() => setActiveInstrument(instrument)}
              style={[
                styles.instrumentChip,
                activeInstrument === instrument && styles.instrumentChipActive,
              ]}
            >
              <Text
                style={[
                  styles.instrumentChipText,
                  activeInstrument === instrument && styles.instrumentChipTextActive,
                ]}
              >
                {instrument}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Loops disponíveis</Text>
        <View style={styles.loopGrid}>
          {LOOPS.map((loop) => {
            const isSelected = selectedLoops.includes(loop.id);
            return (
              <Pressable
                key={loop.id}
                onPress={() => toggleLoop(loop.id)}
                style={[styles.loopCard, { backgroundColor: loop.color }, isSelected && styles.loopCardSelected]}
              >
                <Ionicons
                  name={isSelected ? "checkmark-circle" : "play-circle-outline"}
                  size={24}
                  color={colors.text}
                />
                <Text style={styles.loopTitle}>{loop.title}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.trackPreview}>
          <Text style={styles.trackPreviewLabel}>
            {selectedLoops.length === 0
              ? "Nenhum loop selecionado ainda"
              : `${selectedLoops.length} loop(s) na sua batida`}
          </Text>
          <Pressable style={styles.playPreviewButton} disabled={selectedLoops.length === 0}>
            <Ionicons name="play" size={20} color={colors.background} />
            <Text style={styles.playPreviewText}>Ouvir prévia</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  headerTitle: { color: colors.text, fontSize: 17, fontWeight: "700" },
  saveButton: {
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  saveButtonText: { color: "#000", fontWeight: "700", fontSize: 13 },
  scrollContent: { paddingHorizontal: spacing.md, paddingBottom: spacing.xl },
  bpmCard: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: "center",
    marginTop: spacing.sm,
  },
  bpmLabel: { color: colors.textSecondary, fontSize: 12, fontWeight: "600" },
  bpmControls: { flexDirection: "row", alignItems: "center", gap: spacing.lg, marginTop: spacing.sm },
  bpmButton: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.cardAlt,
    alignItems: "center",
    justifyContent: "center",
  },
  bpmValue: { color: colors.text, fontSize: 32, fontWeight: "800", minWidth: 70, textAlign: "center" },
  sectionTitle: { color: colors.text, fontSize: 16, fontWeight: "700", marginTop: spacing.lg, marginBottom: spacing.sm },
  instrumentRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  instrumentChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.cardAlt,
  },
  instrumentChipActive: { backgroundColor: colors.text },
  instrumentChipText: { color: colors.text, fontSize: 13, fontWeight: "600" },
  instrumentChipTextActive: { color: colors.background },
  loopGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  loopCard: {
    width: "48%",
    height: 90,
    borderRadius: radius.sm,
    padding: spacing.sm,
    justifyContent: "space-between",
  },
  loopCardSelected: { borderWidth: 2, borderColor: colors.text },
  loopTitle: { color: colors.text, fontWeight: "700", fontSize: 13 },
  trackPreview: {
    marginTop: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: "center",
    gap: spacing.sm,
  },
  trackPreviewLabel: { color: colors.textSecondary, fontSize: 13 },
  playPreviewButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    backgroundColor: colors.text,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: 10,
  },
  playPreviewText: { color: colors.background, fontWeight: "700", fontSize: 13 },
});