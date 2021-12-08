import './App.css';
import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getThemeProps } from '@mui/system';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  HashRouter
} from "react-router-dom";

//Here I used the following resource as a guide to get the tabs into the app bar: https://codesandbox.io/s/2obdz?file=/src/index.tsx:269-378
import {
  CssBaseline,
  Tabs,
  Tab,
  Box
} from "@material-ui/core";


import Trainingslist from './components/trainings';
import Customerlist from './components/customers';
import CalendarApp from './components/CalendarApp';
import Chart from './components/Chart';

//Here I used the following video as a guide to get the React router to work with the AppBar
//https://www.youtube.com/watch?v=voNhE4vNFa4&ab_channel=bonsaiilabs

function App() {

  const routes = ["/", "/customers", "/calendar", "/charts"];
  return (
    <div className="App">
      <HashRouter>
        <AppBar position = "static">
          <Tabs>
            <Tab
              label="Training sessions"
              value={routes[0]}
              component={Link}
              to={routes[0]}
            />
            <Tab
              label="Customers"
              value={routes[1]}
              component={Link}
              to={routes[1]}
            />
            <Tab
              label="Calendar"
              value={routes[2]}
              component={Link}
              to={routes[2]}
            />
            <Tab
              label="Charts"
              value={routes[3]}
              component={Link}
              to={routes[3]}
            />
          </Tabs>
        </AppBar>
        <Routes>
          <Route exact path="/" element={<Trainingslist />} component={Trainingslist} />
          <Route path="/customers" element={<Customerlist />} />
          <Route path="/calendar" element={<CalendarApp />} />
          <Route path="/charts" element={<Chart />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
