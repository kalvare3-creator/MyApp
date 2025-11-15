import { Ionicons } from "@expo/vector-icons";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

// Fake people list (like before)
const PEOPLE = [
  {
    id: "1",
    name: "Alex",
    place: "Stamp Student Union",
    time: "Today • 12:30 PM",
    topics: ["CS classes", "Anime", "Music"],
  },
  {
    id: "2",
    name: "Maya",
    place: "South Campus Dining Hall",
    time: "Today • 1:00 PM",
    topics: ["Transfer life", "Latinoamérica", "Art"],
  },
  {
    id: "3",
    name: "Sam",
    place: "McKeldin Café",
    time: "Today • 2:00 PM",
    topics: ["Mental health", "Games", "Study buddies"],
  },
];

// UMD campus region (approx)
const CAMPUS_REGION = {
  latitude: 38.9869,
  longitude: -76.9426,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02,
};

// Places to eat on campus (demo pins)
const PLACES = [
  {
    id: "stamp",
    name: "Stamp Student Union",
    description: "Food court, coffee, snacks",
    latitude: 38.9879,
    longitude: -76.9443,
  },
  {
    id: "south-diner",
    name: "South Campus Dining Hall",
    description: "Dining hall",
    latitude: 38.9823,
    longitude: -76.941,
  },
  {
    id: "yahentamitsi",
    name: "Yahentamitsi Dining Hall",
    description: "North campus dining hall",
    latitude: 38.9899,
    longitude: -76.9447,
  },
];

export default function FindPeopleScreen() {
  const renderPerson = ({ item }: { item: (typeof PEOPLE)[number] }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.cardTime}>{item.time}</Text>
      </View>
      <Text style={styles.cardPlace}>{item.place}</Text>

      <View style={styles.tagRow}>
        {item.topics.map((topic) => (
          <View key={topic} style={styles.tag}>
            <Text style={styles.tagText}>{topic}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.messageButton}>
        <Ionicons name="chatbubble-ellipses" size={16} color="#fff" />
        <Text style={styles.messageButtonText}>I’d like to join you</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Find someone now 👀</Text>
        <Text style={styles.subtitle}>
          These UMD students are open to eat and talk in public campus spaces.
        </Text>

        {/* 🗺️ UMD MAP WITH DINING PLACES */}
        <View style={styles.mapWrapper}>
          <MapView
            style={styles.map}
            initialRegion={CAMPUS_REGION}
          >
            {PLACES.map((place) => (
              <Marker
                key={place.id}
                coordinate={{
                  latitude: place.latitude,
                  longitude: place.longitude,
                }}
                title={place.name}
                description={place.description}
              />
            ))}
          </MapView>
        </View>

        {/* List of people under the map */}
        <FlatList
          data={PEOPLE}
          keyExtractor={(item) => item.id}
          renderItem={renderPerson}
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        />
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
    paddingTop: 24,
  },
  title: {
    color: "#f9fafb",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 4,
  },
  subtitle: {
    color: "#9ca3af",
    fontSize: 13,
    marginBottom: 12,
  },
  mapWrapper: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  map: {
    width: "100%",
    height: 230,
  },
  card: {
    backgroundColor: "#020617",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1f2937",
    padding: 14,
    marginTop: 12,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  cardName: {
    color: "#f9fafb",
    fontSize: 16,
    fontWeight: "700",
  },
  cardTime: {
    color: "#9ca3af",
    fontSize: 12,
  },
  cardPlace: {
    color: "#e5e7eb",
    fontSize: 13,
    marginBottom: 8,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 10,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#f97316",
  },
  tagText: {
    fontSize: 11,
    color: "#fff",
    fontWeight: "600",
  },
  messageButton: {
    marginTop: 4,
    alignSelf: "flex-start",
    backgroundColor: "#10b981",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  messageButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
