'use strict';

function List() {
      this.last = null;
    }
  List.prototype.push = function(item)  {
    const prev = this.last;
    const element = { prev, item };
    this.last = element;
    return element;
  }

function Stack() {
    List.call(this);
    this.size = 0;
}
Stack.prototype = Object.create(List.prototype);
Stack.prototype.push = function(item) {
  List.prototype.push.bind(this, item)();
    this.size++;
}
Stack.prototype.pop = function() {
    const element = this.last;
    if (!element) return null;
    this.last = element.prev;
    this.size--;
    return element.item;

}
Stack.prototype[Symbol.iterator] = function() {
    return {
        last: this.last,
      next() {
          const last = this.last;
          if (last) this.last = this.last.prev;
          return last ?  {
           done: false,
           value: last.item
          } : {
              done: true,
              value: null
          }
      }
    }
}
Stack.prototype.clear = function() {
    this.last = null;
    this.size = 0;
}
Stack.prototype.clone = function() {
    return Object.create(this)
}
// Usage

const obj1 = { name: 'first' };
const obj2 = { name: 'second' };
const obj3 = { name: 'third' };

const list = new Stack();
list.push(obj1);
list.push(obj2);
list.push(obj3);
for (const value of list) {
    console.log(value)
}
console.dir(list.pop());
console.dir(list.pop());
console.dir(list.pop());
console.dir(list.pop());


