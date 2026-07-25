import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MiniPlayer } from "@/components/MiniPlayer";
import { colors, radius, spacing } from "@/constants/theme";

const BENEFITS = [
  { id: "1", icon: "megaphone-outline", label: "Beneficio_001 sem Anuncio_001" },
  { id: "2", icon: "arrow-down-circle-outline", label: "Download_001 para modo offline" },
  { id: "3", icon: "shuffle-outline", label: "Controle_001 da fila de Musicas" },
  { id: "4", icon: "musical-notes-outline", label: "Audio_001 de qualidade alta" },
] as const;

export default function PremiumScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.banner} />

        <View style={styles.brandRow}>
          <View style={styles.brandDot} />
          <Text style={styles.brandLabel}>Premium</Text>
        </View>

        <Text style={styles.headline}>
          Plano_Prototipo_001 com acesso a Musica_001 por R$ 0.
        </Text>

        <Pressable style={styles.ctaButton}>
          <Text style={styles.ctaText}>Ativar Plano_001 por R$ 0</Text>
        </Pressable>

        <Text style={styles.terms}>
          Texto_Legal_001 para simulacao de assinatura. Valor_001 e Prazo_001
          podem mudar no prototipo.{" "}
          <Text style={styles.termsLink}>Termos_001.</Text>
        </Text>

        <View style={styles.benefitsCard}>
          <Text style={styles.benefitsTitle}>Beneficios do Plano_001</Text>
          <View style={styles.benefitsDivider} />
          {BENEFITS.map((benefit) => (
            <View key={benefit.id} style={styles.benefitRow}>
              <Ionicons name={benefit.icon} size={22} color={colors.text} />
              <Text style={styles.benefitLabel}>{benefit.label}</Text>
            </View>
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
    paddingBottom: spacing.md,
  },
  banner: {
    height: 220,
    backgroundColor: colors.card,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  brandDot: {
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    backgroundColor: colors.text,
  },
  brandLabel: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 15,
  },
  headline: {
    color: colors.text,
    fontSize: 26,
    fontWeight: "800",
    paddingHorizontal: spacing.md,
    marginTop: spacing.sm,
    lineHeight: 32,
  },
  ctaButton: {
    backgroundColor: colors.text,
    borderRadius: radius.pill,
    marginHorizontal: spacing.md,
    marginTop: spacing.lg,
    paddingVertical: 14,
    alignItems: "center",
  },
  ctaText: {
    color: colors.background,
    fontWeight: "700",
    fontSize: 15,
  },
  terms: {
    color: colors.textSecondary,
    fontSize: 12,
    paddingHorizontal: spacing.md,
    marginTop: spacing.sm,
    lineHeight: 17,
  },
  termsLink: {
    textDecorationLine: "underline",
  },
  benefitsCard: {
    backgroundColor: colors.card,
    marginHorizontal: spacing.md,
    marginTop: spacing.lg,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  benefitsTitle: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 16,
  },
  benefitsDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  benefitRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  benefitLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "600",
  },
});
