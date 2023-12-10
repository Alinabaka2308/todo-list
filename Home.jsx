import React, { useState } from 'react'

import {
    chakra,
    Button,
    List,
    ListItem,
    Heading,
    Flex,
    Input,
    Text,
} from '@chakra-ui/react'
import { redirect } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion';
import './style.css';

    
export const Home = () => {
    const [todos, setTodos] = useState([])
    const [text, setText] = useState('')

    const createTodoHandler = () => {
        if (text.trim() !== '') {
            setTodos((prevState) => [
                ...prevState,
                { id: Date.now(), text: text.trim(), completed: false },
            ]);
            setText('');
        }
    };

    const removeTodoHandler = (id) => {
        setTodos((prevState) => prevState.filter((todo) => todo.id !== id))
    }

    const toggleCompleteHandler = (id) => {
        setTodos((prevState) =>
            prevState.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    return (
        <Flex
            flexDirection="column"
            h="95vh"
            w="95vw"
            m="2rem"
            gap="1rem"
            alignItems="center"
            backgroundColor={'pink.50'}
            borderRadius={'50px'}
            border={'none'}
            padding={'20px'}
            margin={'15'}
        >
            <Heading 
                
                color={'pink.400'}
                animation={'fadeIn 3s forwards'}
            >Чего бы поделать...
            </Heading>

            <List
                w="90vw"
                h="90vw"
                display="flex"
                flexDirection="column"
                overflowY={'auto'}
                border="2px solid pink"
                borderRadius="20px"
                borderColor={'pink.400'}
                p="10px"
                backgroundColor={''}
                padding-right={'5'}
            >

                <AnimatePresence>
                    {todos.map((todo, index) => (
                        <motion.div
                            key={todo.id}
                            initial={{ opacity:0, y:1500}}
                            animate={{ opacity:1, y:0 }}
                            exit={{ opacity:0, x:-1500, }}
                            transition={{ duration: 0.6 }}
                        >
                            <div>
                            </div>

                            <ListItem
                                key={todo.id}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                borderBottom="3px solid pink"
                                borderRight="3px solid pink"
                                py="8px"
                                backgroundColor={'pink.100'}
                                borderRadius={'20px'}
                                padding='3'
                                margin={'0.5'}
                                color={'pink.400'}
                            >
                                <Text 
                                    textDecoration={todo.completed ? 'line-through' : 'none'}
                                    
                                >
                                    {todo.text}</Text>

                                <div>
                                    <Button
                                        
                                        onClick={() => toggleCompleteHandler(todo.id)}
                                        color='green.300'
                                        borderRadius={'30px'}
                                        margin={'flex'}
                                        marginX="4px"
                                        width={'100'}

                                        _hover={{
                                            background: 'green.500',
                                        }}
                                    >
                                        Сделяль задачку
                                    </Button>

                                    <Button
                                        onClick={() => removeTodoHandler(todo.id)}
                                        color="red.300"
                                        borderRadius={'30px'}
                                        
                                        _hover={{
                                            backgroundColor: 'red.600',
                                        }}
                                    >
                                        Убрать задачку
                                    </Button>
                                </div>
                            </ListItem> 
                        </motion.div>
                    ))}
                </AnimatePresence>
            </List>
            <chakra.form
                onSubmit={(e) => {
                    e.preventDefault() // Без перезагрузки приложения после добавления задачи
                    createTodoHandler(text)
                }}
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap="20px"
                
            >
                <Input
                    placeholder="Ваша задачка..."
                    maxLength={50}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    w="300px"
                    h="32px"
                    color={'pink.700'}
                
                />
                <Button
                    isDisabled={!text.trim().length}
                    type="submit"
                    w="fit-content"
                    background="pink.400"
                    color="pink"
                    _hover={{
                        backgroundColor: 'pink.600',
                    }}
                >
                    Добавить задачку!
                </Button>
            </chakra.form>
        </Flex>
    )
}
