import { useState } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import AddModal from './components/AddModal';
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
      <Navbar collapseOnSelect sticky="top" className="bg-body-secondary">
        <Container>
          <Navbar.Brand>Simple App</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Button
                className="Button"
                variant="primary"
                onClick={() => showAddModal()}
              >
                <i className="fas fa-plus me-2"></i>
                追加
              </Button>
            </Nav>
            <Form>
              <Form.Control
                type="text"
                placeholder="検索"
                onFocus={(e) => startSearch(e)}
                onChange={(e) => search(e)}
                onBlur={() => endSearch()}
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
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
