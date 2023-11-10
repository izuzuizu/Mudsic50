import React, { useRef } from 'react';
import { Animated, PanResponder, Dimensions } from 'react-native';
import Reproductor from '../screens/Player'

const windowHeight = Dimensions.get('window').height;

export default function DraggableComponent() {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      Animated.event([null, { dy: pan.y }], { useNativeDriver: false })(event, gestureState);
    },
    onPanResponderRelease: () => {
      Animated.spring(pan.y, {
        toValue: pan.y._value < windowHeight / 2 ? 0 : windowHeight,
        useNativeDriver: false,
      }).start();
    },
  });

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[pan.getLayout(), { width: '100%', height: '100%', backgroundColor: 'blue' }]}
    >
        <Reproductor></Reproductor>
    </Animated.View>
  );
}
