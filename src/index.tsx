import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

import type { Item } from './types/item';

let localStorageItems = localStorage.getItem("simple-app-items");
if (localStorageItems === null) {
  localStorageItems = "{}";
}
let items = JSON.parse(localStorageItems) as Item[];
if (!items.length) {
  items = [
    {
      title: "タイトル",
      content: "内容"
    }
  ];
}
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App initialItems={items} />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
