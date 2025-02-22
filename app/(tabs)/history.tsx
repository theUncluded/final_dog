import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1a1a', '#2d3748']}
        style={styles.gradient}
      >
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
    color: '#60a5fa',
    fontStyle: 'italic',
  },
});