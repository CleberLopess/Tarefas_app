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

//components
import Tasks from "../components/Tasks";
import Icon from "react-native-vector-icons/FontAwesome";

//utils
import commonStyles from "../commonStyles";
import { today } from "../../hooks/useMoment";

//interface
import { ITasksValues } from "../interfaces/ITasks";

const TaskList = () => {
  const [stateTasks, setStateTasks] = useState<ITasksValues[]>(tasksMok);
  const [filter, setFilter] = useState<boolean>(true);
  const [visibleTasks, setVisibleTasks] = useState<ITasksValues[]>([]);

  const filterTasks = useCallback(() => {
    if (filter) {
      setVisibleTasks([...stateTasks]);
    }

    if (!filter) {
      setVisibleTasks([...stateTasks.filter((task) => task.doneAt === null)]);
    }
  }, [filter]);

  const toggleTask = (id: number) => {
    setStateTasks(
      stateTasks.map((task: ITasksValues) => {
        if (task.id === id) {
          task.doneAt = !!task.doneAt ? null : new Date(1995, 11, 17);
        }

        return task;
      })
    );
    filterTasks();
  };

  const toggleFilter = () => {
    setFilter(!filter);
    filterTasks();
  };

  useEffect(() => {
    filterTasks();
  }, [filterTasks]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.background} source={todayImage}>
        <View style={styles.iconBar}>
          <TouchableOpacity onPress={toggleFilter}>
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
      <View style={styles.taskList}>
        <FlatList
          data={visibleTasks}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <Tasks
              description={item.description}
              estimateAt={item.estimateAt}
              doneAt={item.doneAt}
              id={item.id}
              toggleTask={toggleTask}
            />
          )}
        />
      </View>
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
});

export default TaskList;
