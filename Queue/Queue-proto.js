'use strict'

function Queue() {
      this.first = null;
      this.last = null;
      this.size = 0;
}

Queue.prototype.put = function(item) {
    const last = this.last;
    const element = { next: null, item };
    if (last) {
      last.next = element;
      this.last = element;
    } else {
      this.first = element;
      this.last = element;
    } 
    this.size++;
}

Queue.prototype.pick = function() {
    const element = this.first;
    if (!element) return null;
    if (this.last === element) {
      this.first = null;
      this.last = null;
    } else {
      this.first = element.next;
    }
    this.size--;
    return element.item;
}

Queue.prototype[Symbol.iterator] = function() {
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

Queue.prototype.clear = function() {
    this.first = null;
    this.last = null;
    this.size = 0;
}
Queue.prototype.clone = function() {
    return Object.create(this)
}
  
