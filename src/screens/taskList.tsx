import React, { useState, useCallback, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  View,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";

import todayImage from "../../assets/images/today.jpg";
import { tasksMok } from "../mock/tasks";
import AsyncStorage from '@react-native-async-storage/async-storage';

//components
import Tasks from "../components/Tasks";
import Icon from "react-native-vector-icons/FontAwesome";
import AddTask from "./addTask";

//utils
import commonStyles from "../commonStyles";
import { today } from "../../hooks/useMoment";

//interface
import { ITasksValues } from "../interfaces/ITasks";

const TaskList = () => {
  const [stateTasks, setStateTasks] = useState<ITasksValues[]>(tasksMok);
  const [filter, setFilter] = useState(true);
  const [visibleTasks, setVisibleTasks] = useState<ITasksValues[]>([]);
  const [showAddTask, setShowAddTask] = useState(false);

  

  
  useEffect(() => {
    const getStorage = async () => {
      try {
        const tasksState = await AsyncStorage.getItem("tasks");

        if (tasksState !== null) {
          setStateTasks(JSON.parse(tasksState));
        }
        
      } catch (error) {
        console.log(error);
      }
    };

    getStorage()
  
  }, [AsyncStorage]);


  

  const filterTasks = useCallback(() => {
    if (filter) {
      setVisibleTasks([...stateTasks]);
    }

    if (!filter) {
      setVisibleTasks([...stateTasks?.filter((task) => task.doneAt === null)]);
    }

    try {
      AsyncStorage?.setItem("tasks", JSON.stringify(stateTasks));
    } catch (error) {
      console.log('error setStorage' + error);
      
    }

   
  }, [filter, stateTasks]);

  useEffect(() => {
    filterTasks();
  }, [filterTasks]);

  const handleToggleTask = (id: number) => {
    setStateTasks(
      stateTasks.map((task: ITasksValues) => {
        if (task.id === id) {
          task.doneAt = !!task.doneAt ? null : new Date();
        }

        return task;
      })
    );
    filterTasks();
  };

  const handleToggleFilter = () => {
    setFilter(!filter);
    filterTasks();
  };

  const handleAddTask = (newTask: any) => {
    setStateTasks((state) => [...state, newTask]);
    setShowAddTask(false);
    filterTasks();
  };

  const handleOnDelete = (id: number) => {
    setStateTasks(stateTasks.filter((task) => task.id !== id));
    filterTasks();
  };

  return (
    <SafeAreaView style={styles.container}>
      <AddTask
        isVisible={showAddTask}
        onCancel={() => setShowAddTask(false)}
        onSaveTask={handleAddTask}
      />
      <ImageBackground style={styles.background} source={todayImage}>
        <View style={styles.iconBar}>
          <TouchableOpacity onPress={handleToggleFilter}>
            <Icon
              name={filter ? "eye" : "eye-slash"}
              size={20}
              color={commonStyles.colors.secondary}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.titleBar}>
          <Text style={styles.title}>Hoje</Text>
          <Text style={styles.subTitle}>{today}</Text>
        </View>
      </ImageBackground>
      <View style={styles?.taskList}>
        <FlatList
          data={visibleTasks}
          keyExtractor={(item) => `${item?.id}`}
          renderItem={({ item }) => (
            <Tasks
              description={item?.description}
              estimateAt={item?.estimateAt}
              doneAt={item?.doneAt}
              id={item?.id}
              toggleTask={handleToggleTask}
              onDelete={handleOnDelete}
            />
          )}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.addButton}
        onPress={() => setShowAddTask(true)}
      >
        <Icon name="plus" size={20} color={commonStyles.colors.secondary} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 3,
  },
  taskList: {
    flex: 7,
  },
  titleBar: {
    flex: 1,
    justifyContent: "flex-end",
  },
  title: {
    color: commonStyles.colors.secondary,
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 20,
  },
  subTitle: {
    color: commonStyles.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 20,
  },
  iconBar: {
    flexDirection: "row",
    marginTop: StatusBar.currentHeight && StatusBar.currentHeight + 20,
    marginRight: 20,
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  addButton: {
    position: "absolute",
    right: 30,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: commonStyles.colors.today,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TaskList;
