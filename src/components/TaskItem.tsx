import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import penIcon from "../assets/icons/pen/pen.png";
import trashIcon from "../assets/icons/trash/trash.png";
import { EditTaskOptions } from "../pages/Home";
import { Task } from "./TasksList";

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
    padding: 0,
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    fontFamily: "Inter-Medium",
    textDecorationLine: "line-through",
    padding: 0,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonsDivider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(196, 196, 196, 0.24)",
  },
});

interface TaskItemProps {
  index: number;
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (options: EditTaskOptions) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  index,
  toggleTaskDone,
  removeTask,
  editTask,
}) => {
  const textInputRef = useRef<TextInput>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState(task.title);

  useEffect(() => {
    if (isEditing) {
      textInputRef.current?.focus();
    } else {
      textInputRef.current?.blur();
    }
  }, [isEditing]);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setNewTaskTitle(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask({ taskId: task.id, taskNewTitle: newTaskTitle });
    setIsEditing(false);
  }

  return (
    <Fragment>
      <TouchableOpacity
        testID={`button-${index}`}
        activeOpacity={0.7}
        style={styles.taskButton}
        onPress={() => toggleTaskDone(task.id)}
      >
        <View
          testID={`marker-${index}`}
          style={task.done ? styles.taskMarkerDone : styles.taskMarker}
        >
          {task.done && <Icon name="check" size={12} color="#FFF" />}
        </View>

        <TextInput
          ref={textInputRef}
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
          editable={isEditing}
          onSubmitEditing={handleSubmitEditing}
          style={task.done ? styles.taskTextDone : styles.taskText}
          multiline
        />
      </TouchableOpacity>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={{ paddingRight: 12 }}
          onPress={isEditing ? handleCancelEditing : handleStartEditing}
        >
          {isEditing ? (
            <Icon name="x" size={24} color="#b2b2b2" />
          ) : (
            <Image source={penIcon} />
          )}
        </TouchableOpacity>

        <View style={styles.buttonsDivider} />

        <TouchableOpacity
          testID={`trash-${index}`}
          onPress={() => removeTask(task.id)}
          disabled={isEditing}
          style={{
            paddingLeft: 12,
            paddingRight: 20,
            opacity: isEditing ? 0.2 : 1,
          }}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </Fragment>
  );
};
