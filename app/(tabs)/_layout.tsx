import { Ionicons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import { colors } from "@/constants/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: {
          fontSize: 11,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Buscar",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "search" : "search-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: "Sua Biblioteca",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "library" : "library-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="premium"
        options={{
          title: "Premium",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ellipse" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Criar",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add" size={size} color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            // "Criar" não navega para uma aba própria: abre o modal por cima da tela atual
            e.preventDefault();
            router.push("/create");
          },
        }}
      />
    </Tabs>
  );
}
