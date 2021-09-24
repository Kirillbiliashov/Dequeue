'use strict'

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

const dequeue = () => {
const events = [];
const dequeue = (deck) => {
  const arr = [];
  for (const value of deck) {
    arr.push(value);
  }
  return arr;
}
const emit = (name, elem, dequeue) => {
events[name](elem, dequeue);
}
const obj = {
  on(name, fn) {
    events[name] = fn
  },
    push(item) {
     const element = LinkedList.prototype.push.bind(this, item)();
        emit('push', element.item, dequeue(this));
    },
    pop() {
      const element = LinkedList.prototype.pop.bind(this)();
      emit('pop', element.item, dequeue(this));
      return element.item;
    },
    unshift(item) {
      const element = { prev: null, next: this.first, item };
      if (this.first) {
        this.first.prev = element;
        this.first = element;
      } else {
        this.first = element;
        this.last = element;
      }
      this.length++;
      emit('unshift', element.item, dequeue(this));
    },
    shift() {
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
      emit('shift', element.item, dequeue(this));
      return element.item;
    },
    clear() {
      this.first = null;
      this.last = null;
      this.length = 0;
    },
    clone() {
      return Object.create(this)
    },
    [Symbol.iterator]() {
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
}
Object.setPrototypeOf(obj, LinkedList.prototype);
return obj;
}

const obj1 = { name: 'first' };
const obj2 = { name: 'second' };
const obj3 = { name: 'third' };

const list = dequeue();
list.on('pop', (element, dequeue) => {
 console.log('popped el: ' + element.name + ' new dequeue is: ');
 console.log(dequeue);
})
list.push(obj1);
list.push(obj2);
list.unshift(obj3);
list.pop();
