const app = angular.module('todoListApp', []);
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
      this.listItems.push(this.inputValue);
      this.inputValue = '';
    }
  };
});
