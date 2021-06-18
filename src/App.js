import logo from './logo.svg';
import './App.css';
import ProtectedRoute from './utils/protectedRoute'
import { Route, Switch } from 'react-router-dom';
import AdminLogin from './admin/admin.login'

function App() {
  return (
    <Switch>
        {/* <Route path='/' component={Home} exact /> */}
        <Route path='/signin/admin' component={AdminLogin} exact />
        {/* <Route path='/signup' component={SignUp} exact /> */}
        {/* <Route path='/signup' component={SignUp} exact /> */}
        {/* <ProtectedRoute path='/admin' component={DashHome} exact /> */}
        {/* <ProtectedRoute path='/folder/:name' component={Folder} exact /> */}
        <Route path="*" component={()=>{return (<h1>error page</h1>)}} />
    </Switch>
  );
}

export default App;
