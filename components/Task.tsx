import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated';

interface IProps {
  title: string;
  key: number;
  onPress: () => void;
}

const Task: React.FC<IProps> = props => {
  const { title, key, onPress } = props;

  const [isCheck, setIsCheck] = useState<Boolean>(false);

  const handleCheck = () => {
    setIsCheck(!isCheck)
  }

  return (
    <Animated.View
      key={key}
      style={styles.item}
      entering={FadeInRight}
      exiting={FadeInLeft}>
      <View style={styles.itemLeft}>
        <TouchableOpacity style={styles.square} onPress={handleCheck}>
          <Ionicons name="checkmark-circle" size={32} color={isCheck ? "green" : "gray"} />
        </TouchableOpacity>
        <Text style={styles.itemText}>{title}</Text>
      </View>
      {/* <View style={styles.circular}></View> */}
      <TouchableOpacity onPress={onPress}>
        <Ionicons name="trash" size={32} color={"red"} />
      </TouchableOpacity>
    </Animated.View>
  )
}

export default Task

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  square: {
    marginRight: 10
  },
  itemText: {},
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderRadius: 5,
    borderWidth: 2
  }
})