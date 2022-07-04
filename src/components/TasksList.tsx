import React from "react";
import { FlatList } from "react-native";

import { ItemWrapper } from "./ItemWrapper";

import { EditTaskOptions } from "../pages/Home";
import { TaskItem } from "./TaskItem";

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (options: EditTaskOptions) => void;
}

export const TasksList: React.FC<TasksListProps> = ({
  tasks,
  toggleTaskDone,
  removeTask,
  editTask,
}) => (
  <FlatList
    data={tasks}
    keyExtractor={task => String(task.id)}
    contentContainerStyle={{ paddingBottom: 24 }}
    showsVerticalScrollIndicator={false}
    style={{ marginTop: 32 }}
    renderItem={({ item: task, index }) => {
      return (
        <ItemWrapper index={index}>
          <TaskItem
            index={index}
            task={task}
            toggleTaskDone={toggleTaskDone}
            removeTask={removeTask}
            editTask={editTask}
          />
        </ItemWrapper>
      );
    }}
  />
);
