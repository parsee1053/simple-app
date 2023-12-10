import React, { useState } from 'react';
import './App.css';
import Navbar from 'react-bootstrap/lib/Navbar';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Panel from 'react-bootstrap/lib/Panel';
import FormControl from 'react-bootstrap/lib/FormControl';

import AddModal from './components/AddModal';
import EditModal from './components/EditModal';

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
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>Simple App</Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullLeft>
            <Button className="Button" bsStyle="primary" onClick={() => showAddModal()}><i className="fas fa-plus"></i> 追加</Button>
          </Navbar.Form>
          <Navbar.Form pullRight>
            <FormControl type="text" placeholder="検索" onFocus={(e) => startSearch(e)} onChange={(e) => search(e)} onBlur={() => endSearch()} />
          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>
      <div className="container PanelContainer">
        {items.map((item, index) => {
          return (
            <Panel className="center-block" key={index}>
              <Panel.Heading>
                <Panel.Title className="PanelTitle">{item.title}</Panel.Title>
              </Panel.Heading>
              <Panel.Body className="PanelBody">
                {item.content}
                <hr />
                <ButtonToolbar>
                  <Button className="Button" bsStyle="primary" onClick={() => showEditModal(index)}><i className="fas fa-edit"></i> 編集</Button>
                  <Button className="Button" bsStyle="danger" onClick={() => deleteItem(index)}><i className="fas fa-trash-alt"></i> 削除</Button>
                </ButtonToolbar>
              </Panel.Body>
            </Panel>
          );
        })}
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
      </div>
    </>
  );
}
