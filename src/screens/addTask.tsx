import React, { useState } from "react";
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Text,
  Platform,
  Alert,
} from "react-native";

//utils
import commonStyles from "../commonStyles";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatDate } from "../../hooks/useMoment";

import { IAddTask } from "../interfaces/IAddTask";

const AddTask = ({ onCancel, isVisible, onSaveTask }: IAddTask) => {
  const [description, setDescription] = useState("");
  const [estimateAt, setEstimateAt] = useState(new Date());
  const [showDatePicker, serShowDatePicker] = useState(false);

  const getDatePicker = () => {
    let datePicker = (
      <DateTimePicker
        onChange={(_, date) => {
          setEstimateAt(date!), serShowDatePicker(false);
        }}
        value={estimateAt}
        mode="date"
      />
    );

    const dateString = formatDate(estimateAt);

    if (Platform.OS === "android") {
      return (datePicker = (
        <SafeAreaView style={styles.contentDate}>
          <Text>Para quando é essa tarefa?</Text>
          <TouchableOpacity onPress={() => serShowDatePicker(true)}>
            <Text style={styles.date}>{dateString}</Text>
          </TouchableOpacity>
          {showDatePicker && datePicker}
        </SafeAreaView>
      ));
    }
  };

  const saveTask = () => {
    if (!description.trim()) {
      return Alert.alert("Dados inválidos", "Descrição não informada!");
    }

    const newTask = {
      description,
      estimateAt,
      id: Math.random(),
      doneAt: null,
    };

    onSaveTask(newTask);
    setDescription("");
    setEstimateAt(new Date());
    serShowDatePicker(false);
  };

  return (
    <Modal
      transparent
      visible={isVisible}
      onRequestClose={onCancel}
      animationType="slide"
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <SafeAreaView style={styles.background} />
      </TouchableWithoutFeedback>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Nova tarefa</Text>
        <SafeAreaView style={styles.contentInput}>
          <Text>Qual a descrição?</Text>
          <TextInput
            style={styles.input}
            placeholder="Informe a descrição"
            value={description}
            onChangeText={(ev) => setDescription(ev)}
          />
        </SafeAreaView>
        {getDatePicker()}
        <SafeAreaView style={styles.buttons}>
          <TouchableOpacity>
            <Text
              style={styles.button}
              onPress={() => {
                onCancel(), setDescription("");
              }}
            >
              Cancelar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={saveTask}>
            <Text style={styles.button}>Salvar</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaView>
      <TouchableWithoutFeedback onPress={onCancel}>
        <SafeAreaView style={styles.background} />
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "rgba(0,0,0, 0.7)",
  },
  container: {
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: commonStyles.colors.today,
    color: commonStyles.colors.secondary,
    textAlign: "center",
    padding: 15,
    fontSize: 18,
  },
  contentInput: {
    margin: 15,
  },
  input: {
    height: 40,
    marginTop: 5,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e3e3e3",
    borderRadius: 6,
    padding: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    margin: 20,
    marginRight: 30,
    color: commonStyles.colors.today,
  },
  contentDate: {
    margin: 15,
  },
  date: {
    // fontSize: 20,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#e3e3e3",
    borderRadius: 6,
    padding: 10,
  },
});

export default AddTask;
