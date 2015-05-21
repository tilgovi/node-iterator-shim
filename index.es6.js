var _create = global.document.createNodeIterator;

export function createNodeIterator(root, whatToShow, filter = null) {
  var iter = _create.call(global.document, root, whatToShow, filter, false);
  return typeof(iter.referenceNode) === 'undefined' ? shim(iter, root) : iter;
}


export function install() {
  global.document.createNodeIterator = createNodeIterator;
}


function shim(iter, root) {
  var _referenceNode = root;
  var _pointerBeforeReferenceNode = true;

  return Object.create(NodeIterator.prototype, {
    root: {
      get: function () {
        return iter.root;
      }
    },

    whatToShow: {
      get: function () {
        return iter.whatToShow;
      }
    },

    filter: {
      get: function () {
        return iter.filter;
      }
    },

    referenceNode: {
      get: function () {
        return _referenceNode;
      }
    },

    pointerBeforeReferenceNode: {
      get: function () {
        return _pointerBeforeReferenceNode;
      }
    },

    nextNode: {
      value: function () {
        let result = iter.nextNode();
        if (result !== null) {
          _referenceNode = iter.nextNode();
        }
        _pointerBeforeReferenceNode = false;
        return _referenceNode;
      }
    },

    previousNode: {
      value: function () {
        let result = iter.previousNode();
        if (result !== null) {
          _referenceNode = iter.previousNode();
        }
        _pointerBeforeReferenceNode = true;
        return _referenceNode;
      }
    }
  });
}
