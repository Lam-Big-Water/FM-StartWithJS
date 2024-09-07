# Document

### Here’s a bird’s-eye view of what we have when JavaScript runs in a web browser:
![Chatflow](https://javascript.info/article/browser-environment/windowObjects.svg)

### Structure
```html
<!DOCTYPE HTML>
<html>
<head>
  <title>About elk</title>
</head>
<body>
  The truth about elk.
</body>
</html>
```
![Chatflow](https://github.com/Lam-Big-Water/FM-StartWithJS/blob/main/theModernJS/dom/structure.png)


# DOM nodes
![DOMnodes](https://javascript.info/article/dom-navigation/dom-links.svg)

- For all nodes: parentNode, childNodes, firstChild, lastChild, previousSibling, nextSibling.

![Element nodes](https://javascript.info/article/dom-navigation/dom-links-elements.svg)

### Tasks
```html
<html>
<body>
  <div>Users:</div>
  <ul>
    <li>John</li>
    <li>Pete</li>
  </ul>
</body>
</html>

<script>
  // The <div> DOM node
  document.body.firstElementChild
  document.body.children[0]
  // or (the first node is space, so we take 2nd)
  document.body.childNodes[1]

  // The <ul> DOM node
  document.body.latsElementChild
  document.body.children[1]

  // The second <li> (with Pete)
  document.body.lastElementChild.latsElementChild.
</script>
```

```text
Is it true that elem.lastChild.nextSibling is always null?

Yes, true. The element elem.lastChild is always the last one, it has no nextSibling.

Is it true that elem.children[0].previousSibling is always null?

No, wrong, because elem.children[0] is the first child among elements. But there may exist non-element nodes before it. So previousSibling may be a text node.

```

