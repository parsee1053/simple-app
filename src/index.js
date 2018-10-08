import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

let items = JSON.parse(localStorage.getItem("simple-app-items"));
if (!items) {
  items = [
    {
      title: "タイトル",
      content: "内容"
    }
  ];
}
ReactDOM.render(<App initialItems={items} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
