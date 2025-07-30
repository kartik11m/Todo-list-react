import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],            
    filter: 'ALL',        
    searchTerm: ''       
  },
  reducers: {
    loadTodos(state, action) {
      state.items = action.payload;
    },
    addTodo(state, action) {
      state.items.push({
        id: uuidv4(),
        todo: action.payload,
        isCompleted: false
      });
    },
    toggleTodo(state, action) {
      const todo = state.items.find(i => i.id === action.payload);
      if (todo) todo.isCompleted = !todo.isCompleted;
    },
    deleteTodo(state, action) {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    }
  }
});

export const {
  loadTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
  setFilter,
  setSearchTerm
} = todosSlice.actions;


export const selectFilteredTodos = state => {
  const { items, filter, searchTerm } = state.todos;


  let filtered = items.filter(todo => {
    if (filter === 'ALL') return true;
    if (filter === 'COMPLETED') return todo.isCompleted;
    return !todo.isCompleted; 
  });

  
  if (searchTerm.trim()) {
    const q = searchTerm.trim().toLowerCase();
    filtered = filtered.filter(todo =>
      todo.todo.toLowerCase().includes(q)
    );
  }

  return filtered;
};

export default todosSlice.reducer;