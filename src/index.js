import { HashMap } from './modules/hashmap.js';

const test = new HashMap(); // Create a new instance

// Populate the hash map with initial data
test.add('apple', 'red');
test.add('banana', 'yellow');
test.add('carrot', 'orange');
test.add('dog', 'brown');
test.add('elephant', 'gray');
test.add('frog', 'green');
test.add('grape', 'purple');
test.add('hat', 'black');
test.add('ice cream', 'white');
test.add('jacket', 'blue');
test.add('kite', 'pink');
test.add('lion', 'golden');

console.log('Length before overwriting:', test.length()); // Should be 12

// Overwrite a few nodes
test.add('apple', 'green');
test.add('banana', 'brown');
test.add('carrot', 'yellow');

console.log('Length after overwriting:', test.length()); // Should still be 12

// Add one more node to trigger resize
test.add('moon', 'silver');

console.log('Length after adding one more node:', test.length()); // Should be 13
console.log('Keys:', test.keys()); // Should list all keys
console.log('Values:', test.values()); // Should list all values
console.log('Entries:', test.entries()); // Should list all key-value pairs

// Test other methods
console.log('Get apple:', test.get('apple')); // Should return 'green'
console.log('Has elephant:', test.has('elephant')); // Should return true
test.remove('dog'); // Remove 'dog'
console.log('Has dog:', test.has('dog')); // Should return false

test.clear(); // Clear the map
console.log('Length after clear:', test.length()); // Should return 0
console.log('Keys after clear:', test.keys()); // Should return []
console.log('Values after clear:', test.values()); // Should return []
console.log('Entries after clear:', test.entries()); // Should return []
