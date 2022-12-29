import React, {memo, useCallback} from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";

//components
import Icon from "react-native-vector-icons/FontAwesome";

//utils
import commonStyles from "../../commonStyles";
import {formatDate} from '../../../hooks/useMoment'

//interface
import { ITasks } from "../../interfaces/ITasks";


const Tasks = ({ description, doneAt, estimateAt, toggleTask, id }: ITasks) => {
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

  return (
    <SafeAreaView style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderColor: "#aaa",
    borderBottomWidth: 1,
    alignItems: "center",
    paddingVertical: 10,
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
});

export default memo(Tasks);
