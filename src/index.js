import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login.js';
import Home from './components/Home.js';
import CreateWallet from './components/createWallet.js';
import Transaction from './components/Transaction.js';
import Description from './components/Description.js';
import ImportWallet from './components/importWallet.js';
import History from './components/History.js';
import Welcome from './components/welcome.js';
import AddAccount from './components/addAccount.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route exact path='/' element={<Welcome />}>
      </Route>
      <Route path='/createwallet' element={<CreateWallet />}></Route>
      <Route path='/home' element={<Home />}></Route>
      <Route path="/transaction" element={<Transaction />}></Route>
      <Route path='/description' element={<Description />}></Route>
      <Route path='/importwallet' element={<ImportWallet />}></Route>
      <Route path='/history' element ={<History />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/addaccount" element={<AddAccount />}></Route>
    </Routes>
    
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

