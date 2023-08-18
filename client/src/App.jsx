import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import TaskList from './components/TaskList';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import UpdateTaskForm from './components/UpdateTask';
import ShowTask from './components/ShowTask';
import CreateTask from './components/CreateTask';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<TaskList />} />
          <Route path='/create' element={<CreateTask />} />
          <Route path='/edit' element={<UpdateTaskForm />} />
          <Route path='/show' element={<ShowTask />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;