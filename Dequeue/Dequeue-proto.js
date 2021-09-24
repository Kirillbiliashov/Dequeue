'use strict';

function LinkedList() {
    this.first = null;
    this.last = null;
    this.length = 0;
    
  }
  
  LinkedList.prototype.push = function(item) {
    const last = this.last;
    const element = { prev: last, next: null, item };
    if (last) {
      last.next = element;
      this.last = element;
    } else {
      this.first = element;
      this.last = element;
    }
    this.length++;
    return element;
  };
  
  LinkedList.prototype.pop = function() {
    const element = this.last;
    if (!element) return null;
    if (this.first === element) {
      this.first = null;
      this.last = null;
    } else {
      this.last = element.prev;
      this.last.next = null;
    }
    this.length--;
    return element;
  };



function Dequeue() {
    this.first = null;
    this.last = null;
    this.events = [];
    this.dequeue = function() {
        const arr = [];
        for (const value of this) {
            arr.push(value);
        }
        return arr;
    }
    this.emit = function(name, el, dequeue) {
        this.events[name](el, dequeue);
    }
  }

Dequeue.prototype = Object.create(LinkedList.prototype);

  Dequeue.prototype.on = function(name, fn) {
this.events[name] = fn
  }

  Dequeue.prototype.push = function(item) {
   const element = LinkedList.prototype.push.bind(this, item)();
    this.size++;
    this.emit('push', element, this.dequeue())
  }

  Dequeue.prototype.pop = function() {
    const element = LinkedList.prototype.pop.bind(this)();
    this.emit('pop', element, this.dequeue());
    return element.item;
  }

  Dequeue.prototype.unshift = function(item) {
    const first = this.first;
    const element = { prev: null, next: first, item };
    if (first) {
      first.prev = element;
      this.first = element;
    } else {
      this.first = element;
      this.last = element;
    }
    this.emit('unshift', element.item, this.dequeue())
    this.length++;
  }

  Dequeue.prototype.shift = function() {
    const element = this.first;
    if (!element) return null;
    if (this.last === element) {
      this.first = null;
      this.last = null;
    } else {
      this.first = element.next;
      this.first.prev = null;
    }
    this.length--;
    this.emit('shift', element.item, this.dequeue())
    return element.item;
  }

  Dequeue.prototype[Symbol.iterator] = function() {
      return {
          first: this.first,
          next() {
              const first = this.first;
              if (first) this.first = this.first.next;
              return first ? {
                  done: false,
                  value: first.item
              } : {
                  done: true,
                  value: null
              }
          }
      }
  }

  Dequeue.prototype.clear = function() {
      this.first = null;
      this.last = null;
      this.length = 0;
  }

  Dequeue.prototype.clone = function() {
      return Object.create(this);
  }
// Usage

const obj1 = { name: 'first' };
const obj2 = { name: 'second' };
const obj3 = { name: 'third' };

const list = new Dequeue();
list.on('push', (el, dequeue) => {
console.log('pushed el: ' + el);
console.log(dequeue);
})
list.push(obj1);
list.push(obj2);
list.unshift(obj3);

console.dir(list.pop());
console.dir(list.shift());
console.dir(list.shift());
