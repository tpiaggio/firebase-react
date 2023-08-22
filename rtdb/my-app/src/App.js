import './App.css';
import TimeForm from './components/TimeForm';
import TimesList from './components/TimesList';

function App() {
  return (
    <div className="App">
      <h1>Time entries</h1>
      <TimesList />
      <TimeForm />
    </div>
  );
}

export default App;
