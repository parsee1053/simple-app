import { useState } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';

import AddModal from './components/AddModal';
import AppNavbar from './components/AppNavbar';
import EditModal from './components/EditModal';
import ItemCard from './components/ItemCard';

export default function App(props) {
  const [items, setItems] = useState(props.initialItems);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [index, setIndex] = useState(null);
  const [preSearchItems, setPreSearchItems] = useState(null);

  function showAddModal() {
    setAddModal(true);
  }

  function closeAddModal() {
    setAddModal(false);
  }

  function addItem() {
    const currentItems = Array.from(items);
    const title = document.getElementById("AddInputTitle").value.trim();
    const content = document.getElementById("AddTextareaContent").value.trim();
    if (!validateItem(title, content)) {
      return;
    }
    currentItems.push({
      title: title,
      content: content
    });
    setItems(currentItems);
    closeAddModal();
    localStorage.setItem("simple-app-items", JSON.stringify(currentItems)); // localStorageに保存
  }

  function showEditModal(index) {
    setEditModal(true);
    setIndex(index);
  }

  function closeEditModal() {
    setEditModal(false);
    setIndex(null);
  }

  function editItem() {
    const currentItems = Array.from(items);
    const title = document.getElementById("EditInputTitle").value.trim();
    const content = document.getElementById("EditTextareaContent").value.trim();
    if (!validateItem(title, content)) {
      return;
    }
    currentItems[index] = {
      title: title,
      content: content
    };
    setItems(currentItems);
    closeEditModal();
    localStorage.setItem("simple-app-items", JSON.stringify(currentItems)); // localStorageに保存
  }

  function deleteItem(index) {
    if (window.confirm(`「${items[index].title}」を削除してもよろしいですか？`)) {
      const currentItems = Array.from(items);
      currentItems.splice(index, 1);
      setItems(currentItems);
      localStorage.setItem("simple-app-items", JSON.stringify(currentItems)); // localStorageに保存
    }
  }

  function startSearch(e) {
    setPreSearchItems(items);
    if (e.target.value.length > 0) {
      search(e);
    }
  }

  function search(e) {
    const value = e.target.value.trim();
    if (!value) {
      endSearch();
      return;
    }
    const filterItems = preSearchItems.filter((item) => {
      if (item.title.indexOf(value) > -1 || item.content.indexOf(value) > -1) {
        return true;
      }
      return false;
    });
    setItems(filterItems);
  }

  function endSearch() {
    setItems(preSearchItems);
  }

  function validateItem(title, content) {
    if (title.length <= 0 && content.length <= 0) {
      alert("タイトルと内容を入力してください．");
      return false;
    }
    if (title.length <= 0) {
      alert("タイトルを入力してください．");
      return false;
    }
    if (content.length <= 0) {
      alert("内容を入力してください．");
      return false;
    }

    return true;
  }

  return (
    <>
      <AppNavbar
        showAddModal={() => showAddModal()}
        startSearch={(e) => startSearch(e)}
        search={(e) => search(e)}
        endSearch={() => endSearch()}
      />
      <Container>
        {items.map((item, index) =>
          <ItemCard
            key={index}
            item={item}
            showEditModal={() => showEditModal(index)}
            deleteItem={() => deleteItem(index)}
          />
        )}
        <AddModal
          isShow={addModal}
          closeAddModal={() => closeAddModal()}
          addItem={() => addItem()}
        />
        <EditModal
          isShow={editModal}
          item={items[index]}
          closeEditModal={() => closeEditModal()}
          editItem={() => editItem(index)}
        />
      </Container>
    </>
  );
}
