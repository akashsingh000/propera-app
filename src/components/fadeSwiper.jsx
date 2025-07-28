import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const FadeSwiper = ({ items, autoPlayInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useSharedValue(1);
  const [nextItem, setNextItem] = useState(items[0]);

  // Auto-play logic
  useEffect(() => {
    if (items.length <= 1) return;

    const interval = setInterval(() => {
      // Start fade out
      fadeAnim.value = withTiming(0, {
        duration: 500,
        easing: Easing.out(Easing.ease),
      }, (finished) => {
        if (finished) {
          // Update index after fade out completes
          const newIndex = (currentIndex + 1) % items.length;
          setCurrentIndex(newIndex);
          setNextItem(items[newIndex]);
          
          // Fade back in
          fadeAnim.value = withTiming(1, {
            duration: 500,
            easing: Easing.in(Easing.ease),
          });
        }
      });
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentIndex, items, autoPlayInterval]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slideContainer, animatedStyle]}>
        {nextItem}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  slideContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
  },
});

export default FadeSwiper;