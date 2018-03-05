const app = angular.module('todoListApp', []);

/*
Custom directive for auto-focusing on an input element. Retrieved from:
https://coderwall.com/p/a41lwa/angularjs-auto-focus-into-input-field-when-ng-show-event-is-triggered
*/
app.directive('showFocus', function($timeout) {
  return function(scope, element, attrs) {
    scope.$watch(attrs.showFocus, function(newValue) {
      $timeout(function() {
        newValue && element[0].focus();
      });
    }, true);
  };
});

app.controller('TodoListCtrl', function() {
  this.inputValue = '';
  this.listItems = [];

  // Add a new item to the list of items
  this.addItem = function(evt) {
    /*
    For readability, declare the following constant variables containing the
    numerical values of both the target key pressed by the user and the enter
    key.
    */
    const targetKey = evt.which;
    const enterKey = 13;

    /*
    Also declare a constant that contains the result of checking whether or not
    the input contains a non-whitespace character.
    */
    const containsNonWhitespaceChar = this.inputValue.match(/\S/);

    /*
    Before adding an item, check if the key values match and if the input
    contains a non-whitespace character.
    */
    if (targetKey === enterKey && containsNonWhitespaceChar) {
      this.listItems.push({
        id: Math.floor(Math.random() * Date.now()),
        name: this.inputValue,
        isEditable: false,
        isComplete: false,
        hover: false
      });
      this.inputValue = '';
    }
  };

  // Delete an item from the list of items
  this.deleteItem = function(itemIndex) {
    this.listItems.splice(itemIndex, 1);
  };

  // Toggle edit mode on an item
  this.toggleEditMode = function(itemIndex, evt = null) {
    // Declare the following variables for increased readability
    const item = this.listItems[itemIndex];
    const blurEvent = evt && evt.type === 'blur';
    const enterKeyEvent = evt && evt.which === 13;

    /*
    Enter or exit edit mode depending on the value of an item's isEditable
    property and the event or lack of an event passed in.
    */
    if (item.isEditable && (blurEvent || enterKeyEvent)) {
      item.isEditable = false;
    } else if (evt === null) {
      item.isEditable = true;
    }
  };

  /*
  Change an item's hover state when the mouse enters or leaves that item's
  corresponding list element.
  */
  this.changeHoverState = function(itemIndex) {
    const item = this.listItems[itemIndex];
    item.hover = !item.hover;
  };
});
