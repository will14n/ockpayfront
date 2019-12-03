function dragStart(ev) {
  ev.dataTransfer.effectAllowed='move';
  ev.dataTransfer.setData("Text", ev.target.getAttribute('id'));
  ev.dataTransfer.setDragImage(ev.target,50,50);
  return true;
}

// these functions prevents default behavior of browser
function dragEnter(ev) {
  event.preventDefault();
  return true;
}
function dragOver(ev) {
  event.preventDefault();
}

// function defined for when drop element on target
function dragDrop(ev) {
  var data = ev.dataTransfer.getData("Text");
  node = document.getElementById(data);
  ev.target.appendChild(node);
  ev.stopPropagation();
  node = document.getElementById(data).removeChild(document.getElementById(data).childNodes[2]);
  finalizeRequest(document.getElementById(data).id);
  return false;
}