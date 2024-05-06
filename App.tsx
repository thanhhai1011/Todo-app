import { Alert, Dimensions, FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './components/Task';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

interface ITaskList {
  title: string;
}

export default function App() {
  const [task, setTask] = useState<string>("");
  const [taskItems, setTaskItems] = useState<string[]>([]);

  const handleTask = () => {
    if (task) {
      setTaskItems([...taskItems, task]);
      setTask("")
    } else {
      Alert.alert('Warning', 'Please fill in the task input', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
  };

  const completeTask = (index: number) => {
    let cloneItems = [...taskItems];
    cloneItems.splice(index, 1);
    setTaskItems(cloneItems)
  }

  const renderItem = ({
    item,
    index
  }: {
    item: string;
    index: number
  }) => {
    return (
      <Task title={item} key={index} onPress={() => completeTask(index)} />
    )
  }

  const renderEmpty = () => {
    return (
      <View style={styles.containerEmpty}>
        <Ionicons name="bookmark-outline" size={50} color={"gray"} />
        <Text style={{
          marginTop: 10,
          fontSize: 16,
        }}>Task empty</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>
        <View style={styles.items}>
          <FlatList
            data={taskItems}
            keyExtractor={(item) => item.toString()}
            renderItem={renderItem}
            ListEmptyComponent={renderEmpty()}
          />
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.input}
          placeholder={'Write a task'}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={handleTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED'
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 20
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25
  },
  input: {
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1
  },
  addText: {
    fontSize: 24
  },
  containerEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height / 2
  }
});
