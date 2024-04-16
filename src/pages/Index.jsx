import { useState } from "react";
import { Box, Input, Button, List, ListItem, ListIcon, Checkbox, VStack, Heading } from "@chakra-ui/react";
import { FaTrash, FaCheckCircle } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const handleAddTask = () => {
    if (input.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: input,
        isCompleted: false,
      };
      setTasks([...tasks, newTask]);
      setInput("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  };

  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <VStack p={5}>
      <Heading mb="8">Todo List</Heading>
      <Box mb="4">
        <Input placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={handleKeyPress} />
        <Button onClick={handleAddTask} ml="2" colorScheme="blue">
          Add Task
        </Button>
      </Box>
      <List spacing={3} w="100%">
        {tasks.map((task) => (
          <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center">
            <Checkbox isChecked={task.isCompleted} onChange={() => toggleTaskCompletion(task.id)}>
              {task.text}
            </Checkbox>
            <Button onClick={() => deleteTask(task.id)} size="sm" colorScheme="red">
              <ListIcon as={FaTrash} />
            </Button>
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};

export default Index;
