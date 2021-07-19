import './App.css';
import Todos from './Todos';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

function App() {
  return (
    <Container fixed className="main-container">
    <div className="App">
      <Typography variant="h4" gutterBottom>
        Daily Planner
      </Typography>
      <Todos />
    </div>
    </Container>
  );
}

export default App;
