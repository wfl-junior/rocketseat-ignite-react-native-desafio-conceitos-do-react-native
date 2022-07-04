import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});

export interface EditTaskOptions {
  taskId: Task["id"];
  taskNewTitle: Task["title"];
}

export const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskAlreadyExists = tasks.some(task => task.title === newTaskTitle);

    if (taskAlreadyExists) {
      return Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome",
      );
    }

    setTasks(tasks => [
      ...tasks,
      {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
      },
    ]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks(tasks => {
      return tasks.map(task => {
        if (task.id === id) {
          return {
            ...task,
            done: !task.done,
          };
        }

        return task;
      });
    });
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        { text: "Não" },
        {
          text: "Sim",
          onPress: () => {
            setTasks(tasks => {
              return tasks.filter(task => task.id !== id);
            });
          },
        },
      ],
    );
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskOptions) {
    setTasks(tasks => {
      return tasks.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            title: taskNewTitle,
          };
        }

        return task;
      });
    });
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
};
