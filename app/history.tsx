import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function HistoryScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#888FC6', '#A088C6', '#88AEC6']}
        style={styles.gradient}
      >
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={32} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.content}>
          <Text style={styles.title}>Analysis History</Text>
          <Text style={styles.comingSoon}>Coming Soon!</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 100,
    padding: 10,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  comingSoon: {
    fontSize: 18,
    color: '#fff',
    fontStyle: 'italic',
    opacity: 0.8,
  },
});