# Default Nodes

Vue Flow comes with built-in nodes that you can use right out of the box.
These node types include `default`, `input` and `output`.

You can set a label on each of these types.

## Default Node

![vue flow default node](https://images.prismic.io/bcakmakoglu/235b4a10-5bdc-41c0-ba3f-4fb402fba65f_Default-node.png?auto=compress,format)

A default node comes with two handles.
It represents a branching point in your map.

You can specify the position of handles in the node definition.

```js:no-line-numbers{5-6}
const nodes = [
  {
    id: '1',
    label: 'Node 1',
    targetHandle: Position.Top, // or Bottom, Left, Right,
    sourceHandle: Position.Right,
  }
]
```

## Input Node

![vue flow input node](https://images.prismic.io/bcakmakoglu/fd871fe3-6c5f-4ef1-8e71-fb66d947866b_Input-node.png?auto=compress,format)

An input node has a single handle, located at the bottom by default.
It represents a starting point of your map.

## Output Node

![vue flow output node](https://images.prismic.io/bcakmakoglu/abe32a60-d0a4-40ee-a710-092570d4d128_Output-node.png?auto=compress,format)

An output node has a single handle, located at the top by default.
It represents an ending point of your map.
