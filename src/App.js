import logo from './logo.svg';
import './App.css';
import ProtectedRoute from './utils/protectedRoute'
import { Route, Switch } from 'react-router-dom';
import AdminLogin from './admin/admin.login'
import AdminDashboard from './admin/admin.dash'

function App() {
  return (
    <Switch>
        {/* <Route path='/' component={Home} exact /> */}
        <Route path='/login/admin' component={AdminLogin} exact />
        {/* <Route path='/signup' component={SignUp} exact /> */}
        {/* <Route path='/signup' component={SignUp} exact /> */}
        <ProtectedRoute path='/admin' component={AdminDashboard} exact />
        {/* <ProtectedRoute path='/folder/:name' component={Folder} exact /> */}
        <Route path="*" component={()=>{return (<h1>error page</h1>)}} />
    </Switch>
  );
}

export default App;
