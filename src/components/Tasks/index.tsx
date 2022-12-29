import React, {memo, useCallback} from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Image } from "react-native";


//components
import Icon from "react-native-vector-icons/FontAwesome";
import {Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler'

//utils
import commonStyles from "../../commonStyles";
import {formatDate} from '../../../hooks/useMoment'

//interface
import { ITasks } from "../../interfaces/ITasks";


const Tasks = ({ description, doneAt, estimateAt, toggleTask, id, onDelete }: ITasks) => {
  const doneOrNotStyle = doneAt ? { textDecorationLine: "line-through" } : {};

  const getCheckView = useCallback(() => {
    if (doneAt) {
      return (
        <View style={styles.done}>
          <Icon name="check" size={20} color={"#fff"} />
        </View>
      );
    }

    return <View style={styles.pending} />;
  },[doneAt])

  const changeTextDate = useCallback(() => {
    const formattedDate = formatDate(doneAt ?? estimateAt)
    

    if (!!doneAt) {
        return `Finalizada em: ${formattedDate}`
    }

    return `Criada em: ${formattedDate}`
  },[doneAt, estimateAt])

  const getRightContent = () => {

    return (
      <TouchableOpacity style={styles.right} onPress={() => onDelete(id)}>
        <Icon name='trash' size={30} color='#fff' />
      </TouchableOpacity>
    )
  }

  const getLeftContent = () => {

    return (
      <View style={styles.left}>
        <Icon name='trash' size={30} color='#fff' style={styles.excludeIcon} />
        <Text style={styles.excludeText}>Excluir</Text>
      </View>
    )
  }

  return (
    <GestureHandlerRootView>
    <Swipeable renderRightActions={getRightContent} renderLeftActions={getLeftContent} onSwipeableLeftOpen={() => onDelete(id)} >
    <SafeAreaView style={styles.wrapper}>
        <TouchableWithoutFeedback onPress={() => toggleTask(id)}>
            <View style={styles.checkContainer}>
                {getCheckView()}
            </View>
        </TouchableWithoutFeedback>
        
          <View>
            <Text style={[styles.description, doneOrNotStyle as any]}>
              {description}
            </Text>
            <Text style={styles.date}>{changeTextDate()}</Text>
          </View>
    </SafeAreaView>
    </Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    borderColor: "#aaa",
    borderBottomWidth: 1,
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: '#fff'
   
  },
  checkContainer: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  pending: {
    height: 25,
    width: 25,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#555",
  },
  done: {
    height: 25,
    width: 25,
    borderRadius: 13,
    backgroundColor: "#4d7031",
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    color: commonStyles.colors.mainText,
    fontSize: 15,
  },
  date: {
    color: commonStyles.colors.subtext,
    fontSize: 12,
  },
  right: {
    backgroundColor: 'red',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 20
  },
  left: {
    flex: 1,
    backgroundColor: 'red',
    flexDirection: "row",
    alignItems: "center",
  },
  excludeIcon: {
    marginLeft: 10
  },
  excludeText: {
    color: '#fff',
    fontSize: 20,
    margin: 10
  }
});

export default memo(Tasks);
