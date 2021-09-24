'use strict'

function List() {
    this.last = null;
  }
List.prototype.push = function(item)  {
  const prev = this.last;
  const element = { prev, item };
  this.last = element;
  return element;
}

const stack = () => {
const obj = {
    push(item) {
      List.prototype.push.bind(this, item)();
       this.size++;
    },
    pop() {
         const element = this.last;
         if (!element) return null;
         this.last = element.prev;
         this.size--;
        return element.item
    },
    clone() {
        return Object.create(this)
    },
    clear() {
        this.last = null;
        this.size = 0;
    },
    [Symbol.iterator]() {
        return {
            last: this.last,
            next() {
              const last = this.last;
              if (last) this.last = this.last.prev;
              return last ? {
                  done: false,
                  value: last.item
              } : {
                  done: true,
                  value: null
              }
            }
        }
    },
    size: 0
}
Object.setPrototypeOf(obj, List.prototype);
return obj;
}

const obj1 = { name: 'first' };
const obj2 = { name: 'second' };
const obj3 = { name: 'third' };

const list = stack();
list.push(obj1);
list.push(obj2);
list.push(obj3);
const cloned = list.clone();

console.dir(list.pop());
console.dir(list.pop());
console.dir(list.pop());
console.dir(list.pop());
