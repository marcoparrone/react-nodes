# react-nodes

React components implementing nodes of a tree structure where the nodes are either folders or final nodes.

## Installation

```sh
npm install @marcoparrone/react-nodes
```

## Usage

The react-nodes module exports two React components: Node and NodesArray.

For an example usage of the Node component, see the NodesArray component implementation inside the src/react-nodes.js file.

The NodesArray component accepts the following properties:

  * item: a string containing the name of the localStorage item where the nodes will be saved;
  * text: an object containing at least the following properties, which will be used for the tooltips of the buttons:
```js
{
    'text_open': 'Open',
    'text_add': 'Add',
    'text_edit': 'Edit',
    'text_move_backward': 'Move Backward',
    'text_move_forward': 'Move Forward',
    'text_move_upward': 'Move Upward',
    'text_move_downward': 'Move Downward'
}
```
  * nodes: an array of objects containing the following properties:
    * type: the value is a string, it's 'folder' for a node with children elements, or something other for a final node,
    * title: the title of the node, it may be a name or a description,
    * visible: an integer, if zero then the node is considered as if it was deleted,
    * children: this one is optional: it may contain an array of children nodes,
    * eventually other properties can be included for application-specific purposes;
  * showedit: optional: if 'yes', then the edit button will be visible;
  * showmove: optional: if 'yes', then the movement buttons will be visible;
  * showadd: optional: if 'yes', then the add button will be visible inside the folder elements;
  * addNode: callback function for the 'add' button: it must accept a string parameter containing the position of the object: in this format: N1.N2.N3, for example 2.3.5 means the 6th children of the 4th children of the 3rd element of the "nodes" array of objects;
  * openNode: callback function for the 'open' button, it must accept a string parameter containing the position of the object, in the same format used for the addNode callback;
  * editNode: callback function for the 'edit' button, it must accept a string parameter containing the position of the object, in the same format used for the addNode callback.


It is important to include the material icons in the HTML page. I usually include them directly in the static HTML page:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
...
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
...
  </head>
  <body>
...
  </body>
</html>
```

## Example usage

Here is some example code of an app which uses @marcoparrone/react-nodes.

```js

// ...

import NodesArray from '@marcoparrone/react-nodes';

const defaultText = require ('./en.json');

class NodesApp extends React.Component {

  constructor(props) {
    super(props);
    this.bookmarks = [];
    this.showedit = 'no';
    this.showmove = 'no';
    this.showadd = 'yes';
    this.i18n = { language: 'en', text: defaultText};

// ...

    this.addNode = this.addNode.bind(this);
    this.openNode = this.openNode.bind(this);
    this.editNode = this.editNode.bind(this);

// ...

    this.NodesArrayRef = React.createRef();

// ...

  }

// ...

  render() {
    return (

// ...

  <NodesArray key="NodesArray" ref={this.NodesArrayRef} item="bookmarks" text={this.i18n.text}
    nodes={this.bookmarks} showedit={this.showedit} showmove={this.showmove} showadd={this.showadd}
    addNode={this.addNode} openNode={this.openNode} editNode={this.editNode} />

// ...

    );
  }
}

// ...

```
