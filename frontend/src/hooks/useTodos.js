import { useState } from 'react';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const setTodosData = (data) => setTodos(data);
  const setLoadingState = (state) => setLoading(state);
  const setErrorMessage = (message) => setError(message);

  return {
    todos,
    loading,
    error,
    setTodosData,
    setLoadingState,
    setErrorMessage,
  };
};
