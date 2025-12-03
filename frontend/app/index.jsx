
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';


export default function HomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#89CFF0', '#F5F5DC']}
      style={styles.container}
    >

      <View style={styles.header}>
        <Text style={styles.title}>Agadir Task Manager 2025</Text>
        <Text style={styles.subtitle}>Gérez vos tâches quotidiennes facilement</Text>
      </View>

      <View style={styles.container2}>
        <LottieView
          source={require('../assets/Ticket scanning.json')}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/Login')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.signupButton]}
          onPress={() => router.push('/Sign Up')}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "red" },
  header: { alignItems: 'center', marginTop: 60 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, color: '#fff' },
  subtitle: { fontSize: 16, color: '#fff' },
  footer: { marginBottom: 40 },
  button: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  signupButton: {
    backgroundColor: 'rgba(0, 150, 255, 0.7)',
  },
  buttonText: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  animation: { width: 200, height: 200 },
  container2:{width:"100%", height: 450,justifyContent:"center",alignItems:"center"}
});
