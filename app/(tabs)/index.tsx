import { useState, useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert, Switch } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [major, setMajor] = useState('');
  const [interests, setInterests] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('');
  const spots = ['Stamp Student Union', 'McKeldin Library', 'Yahentamitsi Dining Hall', 'The Bagel Place'];

  useEffect(() => {
    const loadProfile = async () => {
      const userId = auth.currentUser?.uid;
      if (!userId) return;

      const docSnap = await getDoc(doc(db, 'users', userId));
      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.name || '');
        setMajor(data.major || '');
        setInterests(data.interests || '');
        setIsAvailable(data.isAvailable || false);
        setLocation(data.location || '');
      }
    };
    loadProfile();
  }, []);

  const handleSave = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      Alert.alert('Error', 'No hay usuario conectado');
      return;
    }

    setLoading(true);
    try {
      await setDoc(doc(db, 'users', userId), {
        name,
        major,
        interests,
        isAvailable,
        location,
        email: auth.currentUser?.email,
      });
      Alert.alert('Guardado', 'Tu perfil se guardó correctamente');
    } catch (error: any) {
      Alert.alert('Error al guardar', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/login');
    } catch (error: any) {
      Alert.alert('Error al cerrar sesión', error.message);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Mi Perfil</ThemedText>

      <ThemedView style={styles.field}>
        <ThemedText type="defaultSemiBold">Nombre</ThemedText>
        <TextInput style={styles.input} placeholder="Tu nombre" value={name} onChangeText={setName} />
      </ThemedView>

      <ThemedView style={styles.field}>
        <ThemedText type="defaultSemiBold">Major</ThemedText>
        <TextInput style={styles.input} placeholder="Computer Science" value={major} onChangeText={setMajor} />
      </ThemedView>

      <ThemedView style={styles.field}>
        <ThemedText type="defaultSemiBold">Intereses</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Gaming, música, deportes..."
          value={interests}
          onChangeText={setInterests}
        />
      </ThemedView>

      <ThemedView style={styles.switchRow}>
        <ThemedText type="defaultSemiBold">
          {isAvailable ? '🟢 Disponible ahora' : '⚪ No disponible'}
        </ThemedText>
        <Switch value={isAvailable} onValueChange={setIsAvailable} />
      </ThemedView>

      <ThemedView style={styles.field}>
        <ThemedText type="defaultSemiBold">¿Dónde estás?</ThemedText>
        {spots.map((spot) => (
          <TouchableOpacity
            key={spot}
            style={[styles.spotOption, location === spot && styles.spotOptionSelected]}
            onPress={() => setLocation(spot)}
          >
            <ThemedText style={location === spot ? styles.spotTextSelected : undefined}>
              {spot}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ThemedView>

      <TouchableOpacity style={styles.button} onPress={handleSave} disabled={loading}>
        <ThemedText style={styles.buttonText}>{loading ? 'Guardando...' : 'Guardar Perfil'}</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <ThemedText style={styles.logoutText}>Cerrar sesión</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    gap: 20,
  },
  field: {
    gap: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1D3D47',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  spotOption: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
  },
  spotOptionSelected: {
    backgroundColor: '#1D3D47',
    borderColor: '#1D3D47',
  },
  spotTextSelected: {
    color: 'white',
  },
  logoutButton: {
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  logoutText: {
    color: '#B00020',
    fontWeight: '600',
  },
});