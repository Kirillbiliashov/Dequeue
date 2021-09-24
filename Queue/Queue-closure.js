const queue = () => {
    let first;
    let last;
    let msec = null;
    let delay = 0;
    let delayForPick = 0;
    let wait = false;
    return {
        put(item, priority) {
            if (!wait) {
                if (msec) {
                    wait = true;
                    delay = 0;
                }
                let current = last;
                const element = { next: null, item, priority };
                if (priority !== 0) {
                    let prev;
                    let i = 0;
                    current = first;
                    while (priority >= current.priority && current.priority !== 0) {
                        prev = current;
                        current = current.next;
                        i++;
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
            } else {
                delay += msec;
                setTimeout(() => {
                    wait = false;
                    this.put(item, priority)
                }, delay);
            }
        },
        pick() {
            const element = first;
            if (!element) return null;
            if (last === element) {
              first = null;
              last = null;
            } else {
              first = element.next;
            }
            this.size--;
            return element.item;
          
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
        }
    }
}
