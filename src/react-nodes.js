// react-nodes.js - React components implementing nodes of a tree structure where the nodes are either folders or final nodes.

import React from 'react';

import "@material/card/dist/mdc.card.css";

import IconButton from '@marcoparrone/iconbutton';

import {
  move_node_backward, move_node_forward, move_node_upward, move_node_downward,
  save_nodes
} from '@marcoparrone/nodes';

class Node extends React.Component {
  render() {
    let content = [];
    let count = 0;
    let element = null;
    let keyprefix = "Node-" + this.props.id;
    if (this.props.type !== 'folder') {
      content.push(React.createElement('label', { 'key': keyprefix },
        [this.props.title, '&nbsp', React.createElement(IconButton, {
          'key': keyprefix + "-OpenButton", 'label': this.props.text['text_open'], 'icon': 'open_in_new',
          'callback': event => this.props.openNode(this.props.id)
        })]));
    } else {
      content.push(React.createElement('label', {'key': keyprefix + '-Label'}, this.props.title));
      content.push(React.createElement('br', {'key': keyprefix + '-Br'}));
      if (this.props.children !== undefined && this.props.children !== null && this.props.children !== []) {
        count = this.props.children.length;
        for (let i = 0; i < count; i++) {
          element = this.props.children[i];
          if (element.visible !== 0) {
            content.push(React.createElement(Node, {
              'id': this.props.id + "." + i.toString(),
              'key': keyprefix + "." + i.toString(),
              'type': element.type,
              'title': element.title,
              'children': element.children,
              'showedit': this.props.showedit,
              'showmove': this.props.showmove,
              'showadd': this.props.showadd,
              'addNode': this.props.addNode,
              'openNode': this.props.openNode,
              'editNode': this.props.editNode,
              'movebackwardNode': this.movebackwardNode,
              'moveforwardNode': this.moveforwardNode,
              'moveupwardNode': this.moveupwardNode,
              'movedownwardNode': this.movedownwardNode,
              'text': this.props.text
            }));
          }
        }
      }
      if (this.props.showadd === 'yes') {
        content.push(React.createElement(IconButton, {'key': keyprefix + '-AddButton', 'label': this.props.text['text_add'], 'icon': 'add', 'callback': event => this.props.addNode(this.props.id)}));
      }
    }
    if (this.props.showedit === 'yes') {
      content.push(React.createElement(IconButton, {'key': keyprefix + '-EditButton', 'label': this.props.text['text_edit'], 'icon': 'edit', 'callback': event => this.props.editNode(this.props.id)}));
    }
    if (this.props.showmove === 'yes') {
      content.push(React.createElement(IconButton, {'key': keyprefix + '-BackwardButton', 'label': this.props.text['text_move_backward'], 'icon': 'keyboard_arrow_left', 'callback': event => this.props.movebackwardNode(this.props.id)}));
      content.push(React.createElement(IconButton, {'key': keyprefix + '-ForwardButton', 'label': this.props.text['text_move_forward'], 'icon': 'keyboard_arrow_right', 'callback': event => this.props.moveforwardNode(this.props.id)}));
      content.push(React.createElement(IconButton, {'key': keyprefix + '-UpwardButton', 'label': this.props.text['text_move_upward'], 'icon': 'keyboard_arrow_up', 'callback': event => this.props.moveupwardNode(this.props.id)}));
      content.push(React.createElement(IconButton, {'key': keyprefix + '-DownwardButton', 'label': this.props.text['text_move_downward'], 'icon': 'keyboard_arrow_down', 'callback': event => this.props.movedownwardNode(this.props.id)}));
    }
    return React.createElement('div', {'className': 'mdc-card  mdc-card--outlined', 'key': keyprefix + 'Card'},
      React.createElement('div', {'className': 'card-body mdc-typography--body2'}, content));
  }
}

export default class NodesArray extends React.Component {
  constructor(props) {
    super(props);
    this.nodes = this.props.nodes ? this.props.nodes : [];
    this.item = this.props.item ? this.props.item : 'nodes';
    this.state = { nodes: this.nodes };
    this.updateState = this.updateState.bind(this);
    this.saveNodes = this.saveNodes.bind(this);
    this.movebackwardNode = this.movebackwardNode.bind(this);
    this.moveforwardNode = this.moveforwardNode.bind(this);
    this.moveupwardNode = this.moveupwardNode.bind(this);
    this.movedownwardNode = this.movedownwardNode.bind(this);
  }

  updateState(nodes) {
    this.nodes = nodes;
    this.setState({ nodes: this.nodes });
  }

  saveNodes() {
    save_nodes(this.nodes, this.item);
    this.setState({ nodes: this.nodes });
  }

  movebackwardNode(cursor) {
    if (move_node_backward(this.nodes, cursor)) {
      this.saveNodes();
    }
  }

  moveforwardNode(cursor) {
    if (move_node_forward(this.nodes, cursor)) {
      this.saveNodes();
    }
  }

  moveupwardNode(cursor) {
    const emptynode = {type: 'folder', title: "InvisibleElement", content: "InvisibleContent", visible: 0};
    if (move_node_upward(this.nodes, cursor, emptynode)) {
      this.saveNodes();
    }
  }

  movedownwardNode(cursor) {
    const emptynode = {type: 'folder', title: "InvisibleElement", content: "InvisibleContent", visible: 0};
    if (move_node_downward(this.nodes, cursor, emptynode)) {
      this.saveNodes();
    }
  }

  render () {
    let nodesRepresentation = [];
    for (let i = 0; i < this.state.nodes.length; i++) {
      if (this.nodes[i].visible !== 0) {
        nodesRepresentation.push(React.createElement(Node, {
          'id': i.toString(),
          'key': 'Node' + i,
          'type': this.state.nodes[i].type,
          'title': this.state.nodes[i].title,
          'children': this.state.nodes[i].children,
          'showedit': this.props.showedit,
          'showmove': this.props.showmove,
          'showadd': this.props.showadd,
          'addNode': this.props.addNode,
          'openNode': this.props.openNode,
          'editNode': this.props.editNode,
          'movebackwardNode': this.movebackwardNode,
          'moveforwardNode': this.moveforwardNode,
          'moveupwardNode': this.moveupwardNode,
          'movedownwardNode': this.movedownwardNode,
          'text': this.props.text
        }));
      }
    }
    return React.createElement('section', {'className': 'nodesSection'}, nodesRepresentation);
  }
}

export {Node, NodesArray};