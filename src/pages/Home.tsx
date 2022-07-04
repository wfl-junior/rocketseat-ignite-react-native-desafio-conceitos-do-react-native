import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});

export const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
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
    setTasks(tasks => {
      return tasks.filter(task => task.id !== id);
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
      />
    </View>
  );
};
