import { createRoot } from 'react-dom/client';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

let items = JSON.parse(localStorage.getItem("simple-app-items"));
if (!items) {
  items = [
    {
      title: "タイトル",
      content: "内容"
    }
  ];
}
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App initialItems={items} />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
