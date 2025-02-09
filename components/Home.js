import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';

export default function Home() {
  const navigation = useNavigation();
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(withTiming(1.2, { duration: 1000 }), -1, true);
  }, []);

  useEffect(() => {
    let sound;

    async function playSound() {
      sound = new Audio.Sound();
      try {
        await sound.loadAsync(require('../assets/songs/mario.mp3'));
        await sound.setIsLoopingAsync(true);
        await sound.playAsync();
      } catch (error) {
        console.error('Erreur lors du chargement ou de la lecture de la musique', error);
      }
    }

    playSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

const playButtonSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
        require('../assets/songs/go-choose.mp3')
    );
    await sound.playAsync();
};

return (
    <LinearGradient
        colors={['#262F89', '#0075a5', '#00afca', '#12ebdf']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.container}
    >
        <Animated.Image
            source={require('../assets/Super_Mario_Party_Jamboree_Logo.png')}
            style={[styles.icon, animatedStyle]}
        />
        <TouchableOpacity
            style={styles.btn}
            onPress={async () => {
                await playButtonSound();
                navigation.navigate('RandomMapSelector');
            }}
        >
            <Text style={styles.btnText}>Choisir une carte</Text>
        </TouchableOpacity>
    </LinearGradient>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 225,
    height: 180,
  },
  btn: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#FFCB46',
    marginTop: 100,
  },
  btnText: {
    color: 'white',
    fontFamily: '../assets/fonts/AOTFShinGoProBold.otf',
    fontWeight: '900',
    padding: 5,
    width: 150,
    textAlign: 'center',
  },
});
