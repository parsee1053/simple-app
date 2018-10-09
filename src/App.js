import React, { Component } from 'react';
import './App.css';
import Navbar from 'react-bootstrap/lib/Navbar';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Panel from 'react-bootstrap/lib/Panel';
import Modal from 'react-bootstrap/lib/Modal';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.initialItems,
      addModal: false,
      editModal: false,
      index: null,
      preSearchItems: null
    };
    this.showAddModal = this.showAddModal.bind(this);
    this.closeAddModal = this.closeAddModal.bind(this);
    this.addItem = this.addItem.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.editItem = this.editItem.bind(this);
    this.startSearch = this.startSearch.bind(this);
    this.search = this.search.bind(this);
    this.endSearch = this.endSearch.bind(this);
  }

  showAddModal() {
    this.setState({ addModal: true });
  }

  closeAddModal() {
    this.setState({ addModal: false });
  }

  addItem() {
    const items = Array.from(this.state.items);
    const title = document.getElementById("AddInputTitle").value.trim();
    const content = document.getElementById("AddTextareaContent").value.trim();
    if (title.length <= 0 && content.length <= 0) {
      alert("タイトルと内容を入力してください．");
      return;
    }
    if (title.length <= 0) {
      alert("タイトルを入力してください．");
      return;
    }
    if (content.length <= 0) {
      alert("内容を入力してください．");
      return;
    }
    items.push({
      title: title,
      content: content
    });
    this.setState({ items: items });
    this.closeAddModal();
    localStorage.setItem("simple-app-items", JSON.stringify(items)); // localStorageに保存
  }

  showEditModal(index) {
    this.setState({
      editModal: true,
      index: index
    });
  }

  closeEditModal() {
    this.setState({
      editModal: false,
      index: null
    });
  }

  editItem() {
    const items = Array.from(this.state.items);
    const title = document.getElementById("EditInputTitle").value.trim();
    const content = document.getElementById("EditTextareaContent").value.trim();
    if (title.length <= 0 && content.length <= 0) {
      alert("タイトルと内容を入力してください．");
      return;
    }
    if (title.length <= 0) {
      alert("タイトルを入力してください．");
      return;
    }
    if (content.length <= 0) {
      alert("内容を入力してください．");
      return;
    }
    items[this.state.index] = {
      title: title,
      content: content
    };
    this.setState({ items: items });
    this.closeEditModal();
    localStorage.setItem("simple-app-items", JSON.stringify(items)); // localStorageに保存
  }

  deleteItem(index) {
    if (window.confirm(`「${this.state.items[index].title}」を削除してもよろしいですか？`)) {
      const items = Array.from(this.state.items);
      items.splice(index, 1);
      this.setState({ items: items });
      localStorage.setItem("simple-app-items", JSON.stringify(items)); // localStorageに保存
    }
  }

  startSearch(e) {
    this.setState({ preSearchItems: this.state.items });
    if (e.target.value.length > 0) {
      this.search(e);
    }
  }

  search(e) {
    const value = e.target.value.trim();
    if (!value) {
      this.endSearch();
      return;
    }
    const filterItems = this.state.preSearchItems.filter((item) => {
      if (item.title.indexOf(value) > -1 || item.content.indexOf(value) > -1) {
        return true;
      }
      return false;
    });
    this.setState({ items: filterItems });
  }

  endSearch() {
    this.setState({ items: this.state.preSearchItems });
  }

  render() {
    return (
      <React.Fragment>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>Simple App</Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Form pullLeft>
              <Button className="Button" bsStyle="primary" onClick={this.showAddModal}><i class="fas fa-plus"></i> 追加</Button>
            </Navbar.Form>
            <Navbar.Form pullRight>
              <FormControl type="text" placeholder="検索" onFocus={this.startSearch} onChange={this.search} onBlur={this.endSearch} />
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>
        <div className="container PanelContainer">
          {this.state.items.map((item, index) => {
            return (
              <Panel className="center-block" key={index}>
                <Panel.Heading>
                  <Panel.Title className="PanelTitle">{item.title}</Panel.Title>
                </Panel.Heading>
                <Panel.Body className="PanelBody">
                  {item.content}
                  <hr />
                  <ButtonToolbar>
                    <Button className="Button" bsStyle="primary" onClick={this.showEditModal.bind(this, index)}><i class="fas fa-edit"></i> 編集</Button>
                    <Button className="Button" bsStyle="danger" onClick={this.deleteItem.bind(this, index)}><i class="fas fa-trash-alt"></i> 削除</Button>
                  </ButtonToolbar>
                </Panel.Body>
              </Panel>
            );
          })}
          <Modal show={this.state.addModal} onHide={this.closeAddModal}>
            <Modal.Header closeButton>
              <Modal.Title>項目を追加</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form className="center-block">
                <FormGroup>
                  <ControlLabel>タイトル</ControlLabel>
                  <FormControl type="text" id="AddInputTitle" />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>内容</ControlLabel>
                  <FormControl className="Textarea" componentClass="textarea" id="AddTextareaContent" />
                </FormGroup>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button className="Button" onClick={this.closeAddModal}>キャンセル</Button>
              <Button className="Button" bsStyle="primary" onClick={this.addItem}>OK</Button>
            </Modal.Footer>
          </Modal>
          <Modal show={this.state.editModal} onHide={this.closeEditModal}>
            <Modal.Header closeButton>
              <Modal.Title>項目を編集</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form className="center-block">
                <FormGroup>
                  <ControlLabel>タイトル</ControlLabel>
                  <FormControl type="text" id="EditInputTitle" defaultValue={this.state.editModal && this.state.items[this.state.index].title} />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>内容</ControlLabel>
                  <FormControl className="Textarea" componentClass="textarea" id="EditTextareaContent" defaultValue={this.state.editModal && this.state.items[this.state.index].content} />
                </FormGroup>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button className="Button" onClick={this.closeEditModal}>キャンセル</Button>
              <Button className="Button" bsStyle="primary" onClick={this.editItem}>OK</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
