import React, { useState } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';

import AddModal from './components/AddModal';
import AppNavbar from './components/AppNavbar';
import EditModal from './components/EditModal';
import ItemCard from './components/ItemCard';

import type { Item } from './types/item';

interface AppProps {
  initialItems: Item[];
}

export default function App({ initialItems }: AppProps) {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [itemIndex, setItemIndex] = useState(-1);
  const [preSearchItems, setPreSearchItems] = useState<Item[]>([]);

  function handleShowAddModal() {
    setAddModal(true);
  }

  function handleCloseAddModal() {
    setAddModal(false);
  }

  function handleAddItem() {
    const currentItems = Array.from(items);
    const title = (document.getElementById("AddInputTitle") as HTMLInputElement).value.trim();
    const content = (document.getElementById("AddTextareaContent") as HTMLTextAreaElement).value.trim();
    if (!validateItem(title, content)) {
      return;
    }
    currentItems.push({
      title: title,
      content: content
    });
    setItems(currentItems);
    setAddModal(false);
    localStorage.setItem("simple-app-items", JSON.stringify(currentItems)); // localStorageに保存
  }

  function handleShowEditModal(itemIndex: number) {
    setEditModal(true);
    setItemIndex(itemIndex);
  }

  function handleCloseEditModal() {
    setEditModal(false);
    setItemIndex(-1);
  }

  function handleEditItem() {
    const currentItems = Array.from(items);
    const title = (document.getElementById("EditInputTitle") as HTMLInputElement).value.trim();
    const content = (document.getElementById("EditTextareaContent") as HTMLTextAreaElement).value.trim();
    if (!validateItem(title, content)) {
      return;
    }
    currentItems[itemIndex] = {
      title: title,
      content: content
    };
    setItems(currentItems);
    setEditModal(false);
    setItemIndex(-1);
    localStorage.setItem("simple-app-items", JSON.stringify(currentItems)); // localStorageに保存
  }

  function handleDeleteItem(itemIndex: number) {
    if (window.confirm(`「${items[itemIndex].title}」を削除してもよろしいですか？`)) {
      const currentItems = Array.from(items);
      currentItems.splice(itemIndex, 1);
      setItems(currentItems);
      localStorage.setItem("simple-app-items", JSON.stringify(currentItems)); // localStorageに保存
    }
  }

  function handleStartSearch(e: React.FocusEvent<HTMLInputElement>) {
    setPreSearchItems(items);
    if (e.target.value.length > 0) {
      handleSearch(e);
    }
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.trim();
    if (!value) {
      handleEndSearch();
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

  function handleEndSearch() {
    setItems(preSearchItems);
  }

  function validateItem(title: string, content: string) {
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
        handleShowAddModal={handleShowAddModal}
        handleStartSearch={handleStartSearch}
        handleSearch={handleSearch}
        handleEndSearch={handleEndSearch}
      />
      <Container>
        {Object.values(items).map((item, index) =>
          <ItemCard
            key={index}
            item={item}
            handleShowEditModal={() => handleShowEditModal(index)}
            handleDeleteItem={() => handleDeleteItem(index)}
          />
        )}
        <AddModal
          isShow={addModal}
          handleCloseAddModal={handleCloseAddModal}
          handleAddItem={handleAddItem}
        />
        <EditModal
          isShow={editModal}
          item={items[itemIndex]}
          handleCloseEditModal={handleCloseEditModal}
          handleEditItem={handleEditItem}
        />
      </Container>
    </>
  );
}
