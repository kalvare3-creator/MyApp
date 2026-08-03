import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { router } from 'expo-router';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Error al entrar', error.message);
    } finally {
      setLoading(false);
    }
  };

 const isValidUmdEmail = (email: string) => {
  const lowerEmail = email.toLowerCase().trim();
  return lowerEmail.endsWith('@umd.edu') || lowerEmail.endsWith('@terpmail.umd.edu');
};

const handleRegister = async () => {
  if (!isValidUmdEmail(email)) {
    Alert.alert('Email inválido', 'Solo se permiten correos @umd.edu o @terpmail.umd.edu');
    return;
  }

  setLoading(true);
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    router.replace('/(tabs)');
  } catch (error: any) {
    Alert.alert('Error al registrar', error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">NeverAlone</ThemedText>
      <ThemedText>Encuentra compañía en campus</ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <ThemedText style={styles.buttonText}>{loading ? 'Cargando...' : 'Entrar'}</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={handleRegister} disabled={loading}>
        <ThemedText style={styles.secondaryButtonText}>Crear cuenta nueva</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1D3D47',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  secondaryButton: {
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#1D3D47',
    fontWeight: '600',
  },
});