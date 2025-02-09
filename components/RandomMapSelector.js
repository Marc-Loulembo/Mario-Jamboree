import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    Easing,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import useMapStore from '../store/store';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';

export default function RandomMapSelector() {
    const selectedMap = useMapStore((state) => state.selectedMap);
    const getRandomMap = useMapStore((state) => state.getRandomMap);

    const fadeAnim = useSharedValue(0);
    const translateYAnim = useSharedValue(20);
    const floatingAnim = useSharedValue(0);
    const logoScale = useSharedValue(1);
    const [animationStarted, setAnimationStarted] = useState(false);

    useEffect(() => {
        if (!selectedMap) {
            getRandomMap();
            return;
        }
        fadeAnim.value = withTiming(1, { duration: 1000 });
        translateYAnim.value = withTiming(0, { duration: 1000 });
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

        if (!animationStarted) {
            floatingAnim.value = withRepeat(
                withTiming(-10, {
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                }),
                -1,
                true
            );
            logoScale.value = withRepeat(
                withTiming(1.2, { duration: 1000 }),
                -1,
                true
            );
            setAnimationStarted(true);
        }
    }, [selectedMap]);

    const fadeStyle = useAnimatedStyle(() => ({
        opacity: fadeAnim.value,
        transform: [{ translateY: translateYAnim.value }],
    }));

    const floatingStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: floatingAnim.value }],
    }));

    const logoAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: logoScale.value }],
    }));

    const playButtonSound = async () => {
            const { sound } = await Audio.Sound.createAsync(
                    require('../assets/songs/yeahoo.mp3')
            );
            await sound.playAsync();
    };

    return (
        <View style={styles.flexContainer}>
            {selectedMap ? (
                <ImageBackground source={selectedMap.boardView} style={styles.background}>
                    <BlurView intensity={10} style={styles.blur} />
                    <Animated.View style={[styles.mapContainer, fadeStyle]}>
                        <Animated.Image
                            source={require('../assets/Super_Mario_Party_Jamboree_Logo.png')}
                            style={[styles.icon, logoAnimatedStyle]}
                        />
                        <Animated.Image
                            source={selectedMap.boardView}
                            style={[styles.image, floatingStyle]}
                        />
                        <View style={styles.infos}>
                            <Text style={styles.mapName}>{selectedMap.name}</Text>
                            <Text style={styles.description}>{selectedMap.description}</Text>
                        </View>
                    </Animated.View>
                    <TouchableOpacity style={styles.btn} onPress={async () => {
                        await playButtonSound();
                        getRandomMap();
                    }}>
                        <Text style={styles.btnText}>Choisir une carte</Text>
                    </TouchableOpacity>
                </ImageBackground>
            ) : (
                <View style={styles.container}>
                    <Text style={styles.loadingText}>Veuillez choisir une carte</Text>
                    <TouchableOpacity style={styles.btn} onPress={async () => {
                        await playButtonSound();
                        getRandomMap();
                    }}>
                        <Text style={styles.btnText}>Choisir une carte</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    flexContainer: {
        flex: 1,
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    blur: {
        ...StyleSheet.absoluteFillObject,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    mapContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        width: 320,
        height: 400,
        position: 'relative',
    },
    image: {
        width: 300,
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    icon: {
        width: '40%',
        height: 100,
        position: 'absolute',
        top: -80,
        left: 100,
    },
    infos: {
        alignItems: 'center',
        backgroundColor: 'black',
        borderRadius: 10,
        width: '90%',
        padding: 10,
        opacity: 0.8,
    },
    mapName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
        textAlign: 'center',
        fontFamily: '../assets/fonts/SuperMario256.ttf',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        color: 'white',
        paddingHorizontal: 10,
        fontFamily: '../assets/fonts/SuperMario256.ttf',
    },
    btn: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 20,
        borderWidth: 4,
        borderColor: '#FFCB46',
        marginTop: 20,
    },
    btnText: {
        color: 'white',
        fontFamily: '../assets/fonts/AOTFShinGoProBold.otf',
        fontWeight: '900',
        padding: 5,
        width: 150,
        textAlign: 'center',
    },
    loadingText: {
        fontSize: 18,
        color: 'white',
        marginBottom: 20,
    },
});
