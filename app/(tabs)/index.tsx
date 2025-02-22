import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  FadeIn,
  FadeOut,
  SlideInDown 
} from 'react-native-reanimated';
import TypeWriter from 'react-native-typewriter';

export default function AnalyzeScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      simulateAIAnalysis();
    }
  };

  const simulateAIAnalysis = () => {
    setAnalyzing(true);
    // Simulated AI response - replace with actual AI integration
    setTimeout(() => {
      setAnalyzing(false);
      setAiResponse(
        "What an adorable pup! I notice this appears to be a Golden Retriever with a beautiful coat. The dog seems to be displaying a happy, relaxed expression typical of the breed. The lighting in the photo really brings out the warm tones in their fur."
      );
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1a1a', '#2d3748']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Text style={styles.title}>AI Dog Analysis</Text>
          
          {!image ? (
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={pickImage}
            >
              <Text style={styles.uploadButtonText}>Upload Dog Photo</Text>
            </TouchableOpacity>
          ) : (
            <Animated.View 
              entering={FadeIn}
              exiting={FadeOut}
              style={styles.resultContainer}
            >
              <Image
                source={{ uri: image }}
                style={styles.image}
              />
              
              {analyzing ? (
                <View style={styles.analyzingContainer}>
                  <Text style={styles.analyzingText}>Analyzing photo...</Text>
                </View>
              ) : aiResponse && (
                <Animated.View
                  entering={SlideInDown}
                  style={styles.responseContainer}
                >
                  <TypeWriter 
                    style={styles.aiResponse}
                    typing={1}
                    maxDelay={50}
                  >
                    {aiResponse}
                  </TypeWriter>
                </Animated.View>
              )}

              <TouchableOpacity
                style={styles.newPhotoButton}
                onPress={() => {
                  setImage(null);
                  setAiResponse(null);
                }}
              >
                <Text style={styles.newPhotoButtonText}>Analyze New Photo</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
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
    marginBottom: 30,
    textAlign: 'center',
  },
  uploadButton: {
    backgroundColor: '#60a5fa',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  resultContainer: {
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: Platform.OS === 'web' ? 400 : '100%',
    height: 300,
    borderRadius: 15,
    marginBottom: 20,
  },
  analyzingContainer: {
    marginTop: 20,
  },
  analyzingText: {
    color: '#60a5fa',
    fontSize: 18,
    fontWeight: '600',
  },
  responseContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
    width: '100%',
  },
  aiResponse: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
  },
  newPhotoButton: {
    marginTop: 30,
    backgroundColor: '#4b5563',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  newPhotoButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});