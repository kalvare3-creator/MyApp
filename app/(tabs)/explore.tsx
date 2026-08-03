import { useState, useEffect, useRef } from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig';

const allSpots = [
  { name: 'Stamp Student Union', latitude: 38.988, longitude: -76.945 },
  { name: 'McKeldin Library', latitude: 38.9861, longitude: -76.9436 },
  { name: 'Yahentamitsi Dining Hall', latitude: 38.9905, longitude: -76.9433 },
  { name: 'The Bagel Place', latitude: 38.9807, longitude: -76.9369 },
];

type Student = {
  id: string;
  name: string;
  major: string;
  interests: string;
  location: string;
};

export default function ExploreScreen() {
  const mapRef = useRef<MapView>(null);
  const markerRefs = useRef<{ [key: string]: any }>({});
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedSpot, setSelectedSpot] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const available: Student[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (
          docSnap.id !== auth.currentUser?.uid &&
          data.isAvailable === true &&
          data.location
        ) {
          available.push({
            id: docSnap.id,
            name: data.name || '',
            major: data.major || '',
            interests: data.interests || '',
            location: data.location || '',
          });
        }
      });
      setStudents(available);
    } catch (error: any) {
      console.error('Error cargando estudiantes:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Solo lugares donde hay al menos una persona disponible
  const activeSpots = allSpots.filter((spot) =>
    students.some((s) => s.location === spot.name)
  );

  const goToSpot = (spotName: string) => {
    const spot = allSpots.find((s) => s.name === spotName);
    if (!spot) return;

    setSelectedSpot(spotName);
    mapRef.current?.animateToRegion(
      {
        latitude: spot.latitude,
        longitude: spot.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      500
    );
    setTimeout(() => {
      markerRefs.current[spotName]?.showCallout();
    }, 600);
  };

  const studentsAtSelectedSpot = students.filter((s) => s.location === selectedSpot);

  return (
    <ThemedView style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 38.9869,
          longitude: -76.9426,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        }}
      >
        {activeSpots.map((spot) => (
          <Marker
            key={spot.name}
            ref={(ref) => {
              markerRefs.current[spot.name] = ref;
            }}
            coordinate={{ latitude: spot.latitude, longitude: spot.longitude }}
            title={spot.name}
            description={`${students.filter((s) => s.location === spot.name).length} disponible(s)`}
          />
        ))}
      </MapView>

      <ThemedView style={styles.listContainer}>
        {loading ? (
          <ThemedText>Cargando...</ThemedText>
        ) : activeSpots.length === 0 ? (
          <ThemedText style={styles.emptyText}>Nadie disponible en campus ahora mismo.</ThemedText>
        ) : (
          <FlatList
            data={activeSpots}
            keyExtractor={(item) => item.name}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.chip, selectedSpot === item.name && styles.chipSelected]}
                onPress={() => goToSpot(item.name)}
              >
                <ThemedText style={styles.chipText}>{item.name}</ThemedText>
              </TouchableOpacity>
            )}
          />
        )}

        {selectedSpot && (
          <ThemedView style={styles.peopleList}>
            <ThemedText type="defaultSemiBold">En {selectedSpot}:</ThemedText>
            {studentsAtSelectedSpot.map((s) => (
              <ThemedView key={s.id} style={styles.personCard}>
                <ThemedText type="defaultSemiBold">{s.name}</ThemedText>
                <ThemedText>{s.major}</ThemedText>
                <ThemedText>{s.interests}</ThemedText>
              </ThemedView>
            ))}
          </ThemedView>
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  listContainer: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    maxHeight: 260,
  },
  chip: {
    backgroundColor: '#1D3D47',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  chipSelected: {
    backgroundColor: '#A1CEDC',
  },
  chipText: {
    color: 'white',
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    padding: 10,
  },
  peopleList: {
    marginTop: 12,
    gap: 8,
  },
  personCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
  },
});