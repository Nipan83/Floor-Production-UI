import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col } from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Admin from './components/Admin/Admin.js';
import Dashboard from './components/Dashboard/Dashboard.js';
import Navigation from './components/Layout/Navigation.js';

function App() {

  return (
      <React.Fragment>
          <Router>
            <Navigation />
            <div>
                  <Row>
                      <Col sm={12} id="page-content-wrapper">
                          <Switch>
                              <Route path='/admin' render={(props) => (<Admin />)}/>
                              <Route path="/" exact={true} component={Dashboard} />
                            </Switch>
                      </Col> 
                  </Row>
            </div>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              theme={"colored"}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </Router>
          <div id="overlay"></div>  
      </React.Fragment>
  );
}

export default App;
