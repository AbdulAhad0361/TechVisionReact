import { useTheme } from '../contexts/ThemeContext';

export default function ThemeTest() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div style={{ padding: '20px', backgroundColor: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#fff' : '#333' }}>
      <h2>Theme Test Component</h2>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}