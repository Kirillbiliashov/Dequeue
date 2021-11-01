'use strict'

const util = require('util');
const EventEmitter = require('events');
const ee = new EventEmitter();

const average = (arr) => {
    let sum = 0;
    for (const value of arr) {
        if (typeof value !== 'number') throw new TypeError('array should contain only numbers');
        sum += value;
    }
    return Math.floor(sum / arr.length)
}

const queue = () => {
    const stackTime = [];
    const stats = {
        elapsedTime: new Date().getTime(),
        processed: 0,
        processing: 0,
        minTime: 0,
        maxTime: 0,
        averageTime: 0,
    }
    ee.on('put', () => {
        stats.processing++;
        stackTime.push(new Date().getTime());
    });
    ee.on('pick', () => {
        let { minTime, maxTime } = stats;
        stats.processed++;
        stats.processing--;
        let elemTime = stackTime.shift();
        elemTime = new Date().getTime() - elemTime;
        if (minTime === 0) minTime = elemTime;
        if (maxTime === 0) maxTime = elemTime;
        stats.minTime = (elemTime < minTime) ? elemTime : minTime;
        stats.maxTime = (elemTime > maxTime) ? elemTime : minTime;
        stackTime.push(elemTime);
        stats.averageTime = average(stackTime);
    });
    ee.on('print', () => stats.elapsedTime = new Date().getTime() - stats.elapsedTime);
    let first;
    let last;
    let msec = null;
    let delay = 0;
    let wait = false;
    return {
        put(item, priority = 0) {
            if (!wait) {
                if (msec) {
                    wait = true;
                    delay = 0;
                }
                let current = last;
                const element = { next: null, item, priority };
                if (priority !== 0) {
                    let prev;
                    current = first;
                    while (priority >= current.priority && current.priority !== 0) {
                        prev = current;
                        current = current.next;
                    }
                    element.next = current;
                    if (first.priority === 0) first = element;
                    else prev.next = element;
                    return;
                }
                if (current) {
                    current.next = element;
                    last = element;
                } else {
                    first = element;
                    last = element;
                }
                this.size++;
                ee.emit('put')
            } else {
                delay += msec;
                setTimeout(() => {
                    wait = false;
                    this.put(item, priority)
                }, delay);
            }
        },
        pick(cb) {
            const element = first;
            if (!element) return null;
            if (last === element) {
                first = null;
                last = null;
            } else {
                first = element.next;
            }
            this.size--;
            ee.emit('pick');
            cb(element.item);

        },
        clear() {
            last = null;
            first = null;
            this.size = 0;
        },
        clone() {
            return Object.create(this)
        },
        timeout(ms) {
            msec = ms;
            wait = true;
            return this;
        },
        size: 0,
        [Symbol.iterator]() {
            return {
                first: first,
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
        },
        [util.inspect.custom]() {
            ee.emit('print');
            return stats
        }
    }
}

const q = queue();  
const obj1 = { name: 'first' };
const obj2 = { name: 'second' };
const obj3 = { name: 'third' };
q.put(obj1);
q.put(obj2);
q.put(obj3);
setTimeout(() =>  q.pick(console.log), 200 );
setTimeout(() =>  q.pick(console.log), 400 );
setTimeout(() =>  q.pick(console.log), 600 );

setTimeout(() => {
console.log(q);        
}, 800)


