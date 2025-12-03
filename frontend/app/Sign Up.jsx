import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function SignUpScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Create Account</Text>

      <View style={styles.inputWrapper}>

        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#aaa"
          style={styles.input}
        />

        <TextInput
          placeholder="Email"
          placeholderTextColor="#aaa"
          style={styles.input}
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#aaa"
          style={styles.input}
          secureTextEntry
        />

        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#aaa"
          style={styles.input}
          secureTextEntry
        />

      </View>

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/Login')}>
        <Text style={styles.link}>Already have an account? Log In</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 25,
    justifyContent: 'center'
  },

  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40
  },

  inputWrapper: {
    gap: 15,
    marginBottom: 25
  },

  input: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333'
  },

  btn: {
    backgroundColor: '#4b9fff',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20
  },

  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },

  link: {
    color: '#4b9fff',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16
  }
});
