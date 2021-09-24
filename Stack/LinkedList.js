'use strict';

class LinkedList {
    constructor() {
        this.first = null;
        this.last = null;
        this.length = 0;
    }
    push(data) {
        const node = new Node(this, data);
        node.prev = this.last;
        if (this.length === 0) this.first = node;
        else this.last.next = node;
        this.last = node;
        this.length++;
        return node;
    }
    pop() {
        if (this.length === 0) return null;
        const node = this.last;
        this.last = node.prev;
        if (this.last) this.last.next = null;
        node.list = null;
        node.prev = null;
        node.next = null;
        this.length--;
        return node.data;
    }
    unshift(data) {
        const node = new Node(this, data);
        node.next = this.first;
        if (this.length === 0) this.last = node;
        else this.first.prev = node;
        this.first = node;
        this.length++;
        return node;
    }
    shift() {
        if (this.length === 0) return null;
        const node = this.first;
        this.first = node.next;
        if (this.first) this.first.prev = null;
        node.list = null;
        node.prev = null;
        node.next = null;
        this.length--;
        return node.data;
    }
    insert(index, data) {
        const newElement = new Node(this, data);
        let current = this.first;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        let prev = current.prev;
        current.prev = newElement;
        newElement.next = current;
        prev.next = newElement;
        newElement.prev = prev;
    }
    delete(index, count) {
        let current = this.first;
        for (let i = 0; i < index + count; i++) {
            if (i >= index) {
                let prev = current.prev;
                let next = current.next;
                prev.next = next;
                next.prev = prev;
            }
            current = current.next;
        }
    }
    clone() {
        const cloned = new LinkedList();
        cloned.first = this.first;
        cloned.last = this.last;
        cloned.length = this.length;
        return cloned;
    }
    compare(list) {
        if (this.length !== list.length) return false;
        let firstInList = list.first;
        let first = this.first;
        for (let i = 0; i < this.length; i++) {
            if (firstInList.data !== first.data) {
                return false
            }
            firstInList = firstInList.next;
            first = first.next;
        }
        return true;
    }
    find(fn) {
        for (const value of this) {
            if (fn(value) === true) return value;
        }
    }
    filter(fn) {
        const filtered = new LinkedList();
        for (const value of this) {
            if (fn(value) === true) filtered.push(value);
        }
        return filtered;
    }
    indexOf(data) {
        let i = 0;
        for (const value of this) {
            if (value === data) return i;
            i++;
        }
        return -1;
    }
    includes(data) {
        return (this.indexOf(data) !== - 1)
    }
    map(cb) {
        const mapped = new LinkedList();
        for (const value of this) {
            mapped.push(cb(value));
        }
        return mapped;
    }
    reverse() {
        const reversed = new LinkedList();
        for (const value of this) {
            reversed.unshift(value);
        }
        this.first = reversed.first;
        this.last = reversed.last;
    }
    search(field, value) {
        for (const data of this) {
            if (data[field] === value) return data;
        }
    }
    select(obj) {
        const filtered = new LinkedList();
        const keys = Object.keys(obj);
        for (const data of this) {
            if (keys.every(key => obj[key] === data[key])) filtered.push(data);
        }
        return filtered;
    }
    order(field) {
        const ordered = new LinkedList();
        const orderedArray = [];
        for (const data of this) {
            orderedArray.push(data)
        }
        orderedArray.sort((a, b) => a[field] < b[field] ? -1 : 1).map(elem => ordered.push(elem))
        return ordered;
    }
    findASync(fn, cb) {
        const data = this.find(fn);
        if (data) cb(data);
    }
    filterAsync(fn, cb) {
        const filteredList = this.filter(fn);
        if (filteredList) cb(filteredList);
    }
    [Symbol.iterator]() {
        return {
            first: this.first,
            next() {
                const first = this.first;
                if (first) {
                    this.first = first.next;
                }
                return first ? {
                    done: false,
                    value: first.data
                } : {
                    done: true
                }
            }
        }
    }

}

class Node {
    constructor(list, data) {
        this.list = list;
        this.data = data;
        this.prev = null;
        this.next = null;
    }

}
