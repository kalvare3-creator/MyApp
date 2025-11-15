import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Don’t eat alone 💛</Text>
        <Text style={styles.subtitle}>
          When you feel lonely or your friends are busy, you can use this app
          to find another UMD student who is open to eat and talk in a safe
          public campus place.
        </Text>

        {/* Button that goes to the Find People tab */}
        <Link href="/(tabs)/explore" asChild>
          <TouchableOpacity style={styles.ctaButton}>
            <Ionicons name="search" size={20} color="#fff" />
            <Text style={styles.ctaButtonText}>Find someone to eat with</Text>
          </TouchableOpacity>
        </Link>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>How it works</Text>
          <Text style={styles.infoText}>1. Choose a public place on campus.</Text>
          <Text style={styles.infoText}>2. See who is open to join.</Text>
          <Text style={styles.infoText}>
            3. Agree on a time and meet in a safe, visible spot.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    color: "#f9fafb",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 8,
  },
  subtitle: {
    color: "#d1d5db",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
  },
  ctaButton: {
    backgroundColor: "#f97316",
    paddingVertical: 12,
    borderRadius: 999,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },
  ctaButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  infoBox: {
    backgroundColor: "#020617",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1f2937",
    padding: 16,
    marginTop: 8,
  },
  infoTitle: {
    color: "#e5e7eb",
    fontWeight: "700",
    marginBottom: 6,
  },
  infoText: {
    color: "#9ca3af",
    fontSize: 13,
    marginBottom: 2,
  },
});

