import { Box, List } from '@mantine/core'
import './App.css'
import useSWR from 'swr';
import AddTodo from './components/AddTodo';

export const ENDPOINT = "http://localhost:4000"
export interface Todo {
  id: number,
  title: string,
  body: string,
  done: boolean
}

function App() {
  const fetcher = (url: string) => {
    return fetch(`${ENDPOINT}/${url}`).then((response) => response.json());
  }

  const {data, mutate} = useSWR<Todo[]>('api/todos', fetcher)

  return (
    <Box sx={(_theme) => ({
      padding: '2rem',
      width: '100%',
      maxWidth: '40rem',
      margin: '0 auto'
    })}>
      <AddTodo mutate={mutate} />
      <List spacing='xs' size='sm' mb={12} center>
        {data?.map((todo) => {
          return <List.Item key={`todo__list__${todo.id}`}>
            {todo.title}
          </List.Item>
        })}
      </List>
    </Box>
  )
}

export default App
