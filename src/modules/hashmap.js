// Node constructor
function Node(key, value, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
}

// HashMap constructor
export function HashMap() {
    const loadFactor = 0.75;
    let buckets = new Array(16).fill(null);
    let capacity = buckets.length;
    let occupied = 0;

    const hash = (key) => {
        let hashKey = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i += 1) {
            hashKey = (hashKey * primeNumber + key.charCodeAt(i)) % capacity;
        }
        return hashKey;
    };

    const resize = () => {
        const oldArray = buckets;
        capacity *= 2;
        buckets = new Array(capacity).fill(null);
        occupied = 0;

        oldArray.forEach((bucket) => {
            let current = bucket;
            while (current !== null) {
                add(current.key, current.value);
                current = current.next;
            }
        });
    };

    const add = (key, value) => {
        if (occupied / capacity >= loadFactor) {
            resize();
        }

        const bucketIndex = hash(key);
        let current = buckets[bucketIndex];

        if (current === null) {
            occupied += 1;
            buckets[bucketIndex] = new Node(key, value);
        } else {
            let prev = null;
            while (current !== null && current.key !== key) {
                prev = current;
                current = current.next;
            }
            if (current !== null) {
                current.value = value;
            } else {
                prev.next = new Node(key, value);
                occupied += 1;
            }
        }
    };

    const get = (key) => {
        const bucketIndex = hash(key);
        let current = buckets[bucketIndex];

        while (current !== null && current.key !== key) {
            current = current.next;
        }
        return current === null ? null : current.value;
    };

    const has = (key) => {
        const bucketIndex = hash(key);
        let current = buckets[bucketIndex];

        while (current !== null) {
            if (current.key === key) {
                return true;
            }
            current = current.next;
        }
        return false;
    };

    const remove = (key) => {
        const bucketIndex = hash(key);
        let current = buckets[bucketIndex];
        let previous = null;

        while (current !== null && current.key !== key) {
            previous = current;
            current = current.next;
        }
        if (current === null) {
            return;
        }

        if (previous === null) {
            buckets[bucketIndex] = current.next;
        } else {
            previous.next = current.next;
        }
        occupied -= 1;
    };

    const length = () => occupied;

    const clear = () => {
        buckets = new Array(16).fill(null);
        occupied = 0;
    };

    const keys = () => {
        const arrayOfKeys = [];
        buckets.forEach((bucket) => {
            let current = bucket;
            while (current !== null) {
                arrayOfKeys.push(current.key);
                current = current.next;
            }
        });
        return arrayOfKeys;
    };

    const values = () => {
        const arrayOfValues = [];
        buckets.forEach((bucket) => {
            let current = bucket;
            while (current !== null) {
                arrayOfValues.push(current.value);
                current = current.next;
            }
        });
        return arrayOfValues;
    };

    const entries = () => {
        const arrayOfEntries = [];
        buckets.forEach((bucket) => {
            let current = bucket;
            while (current !== null) {
                arrayOfEntries.push([current.key, current.value]);
                current = current.next;
            }
        });
        return arrayOfEntries;
    };

    return {
        add,
        get,
        has,
        remove,
        length,
        clear,
        keys,
        values,
        entries,
    };
}
