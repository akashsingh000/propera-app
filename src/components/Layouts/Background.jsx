import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const images = [
  require('../../assets/images/img1.jpg'),
  require('../../assets/images/img2.jpg'),
  require('../../assets/images/img3.jpg'),
];

const withImageCarouselBackground = (WrappedComponent) => {
  return function CarouselBackgroundHOC(props) {
    const [currentImage, setCurrentImage] = useState(images[0]);
    const [nextImage, setNextImage] = useState(images[1]);
    const [imageIndex, setImageIndex] = useState(1);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      const interval = setInterval(() => {
        // Prepare fade in
        fadeAnim.setValue(0);
        setNextImage(images[imageIndex]);

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }).start(() => {
          // After fade, set next as current
          setCurrentImage(images[imageIndex]);
          setImageIndex((imageIndex + 1) % images.length);
        });
      }, 5000);

      return () => clearInterval(interval);
    }, [imageIndex]);

    return (
      <View style={styles.container}>
        {/* Base (current) image */}
        <Animated.Image
          source={currentImage}
          style={[styles.image, { opacity: 1 }]}
          resizeMode="cover"
        />
        {/* Top (next) image fading in */}
        <Animated.Image
          source={nextImage}
          style={[styles.image, { opacity: fadeAnim }]}
          resizeMode="cover"
        />

        <View style={styles.overlay}>
          <WrappedComponent {...props} />
        </View>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    position: 'absolute',
    width,
    height:"100%",
  },
  overlay: {
    flex: 1,
  },
});

export default withImageCarouselBackground;
