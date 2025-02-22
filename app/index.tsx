import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Pressable,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  FadeIn,
  FadeOut,
  SlideInDown,
  useAnimatedStyle,
  withSpring,
  useSharedValue
} from 'react-native-reanimated';
import TypeWriter from 'react-native-typewriter';
import { Ionicons } from '@expo/vector-icons';

export default function AnalyzeScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const menuAnimation = useSharedValue(-300); // Start from -300 (off-screen left)

  const menuStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(menuOpen ? 0 : -300, {
        damping: 20,
        stiffness: 90,
      }) }],
    };
  });

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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
        colors={['#888FC6', '#A088C6', '#88AEC6']}
        style={styles.gradient}
      >
        {/* Menu Button */}
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={toggleMenu}
        >
          <Ionicons name="menu" size={32} color="#fff" />
        </TouchableOpacity>

        {/* Side Menu */}
        <Animated.View style={[styles.menu, menuStyle]}>
          <Pressable style={styles.menuItem} onPress={() => {
            router.push('/');
            toggleMenu();
          }}>
            <Text style={styles.menuText}>Analyze</Text>
          </Pressable>
          <Pressable style={styles.menuItem} onPress={() => {
            router.push('/history');
            toggleMenu();
          }}>
            <Text style={styles.menuText}>History</Text>
          </Pressable>
        </Animated.View>

        <View style={styles.content}>
          <Text style={styles.emojiHero}>🐕</Text>
          
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
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 100,
    padding: 10,
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 250,
    backgroundColor: 'rgba(160, 136, 198, 0.95)',
    zIndex: 99,
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  menuText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 100,
  },
  emojiHero: {
    fontSize: 120,
    marginBottom: 30,
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  uploadButton: {
    backgroundColor: 'rgba(136, 174, 198, 0.3)',
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
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  responseContainer: {
    backgroundColor: 'rgba(136, 174, 198, 0.3)',
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
    backgroundColor: 'rgba(160, 136, 198, 0.5)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  newPhotoButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});