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
      index: null
    };
    this.showAddModal = this.showAddModal.bind(this);
    this.closeAddModal = this.closeAddModal.bind(this);
    this.addItem = this.addItem.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.editItem = this.editItem.bind(this);
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

  render() {
    return (
      <React.Fragment>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>Simple App</Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Form pullRight>
              <Button bsStyle="primary" onClick={this.showAddModal}>追加</Button>
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
                    <Button bsStyle="primary" onClick={this.showEditModal.bind(this, index)}>編集</Button>
                    <Button bsStyle="danger" onClick={this.deleteItem.bind(this, index)}>削除</Button>
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
                  <FormControl componentClass="textarea" id="AddTextareaContent" />
                </FormGroup>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.closeAddModal}>キャンセル</Button>
              <Button bsStyle="primary" onClick={this.addItem}>追加</Button>
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
                  <FormControl componentClass="textarea" id="EditTextareaContent" defaultValue={this.state.editModal && this.state.items[this.state.index].content} />
                </FormGroup>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.closeEditModal}>キャンセル</Button>
              <Button bsStyle="primary" onClick={this.editItem}>保存</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}

export default App;