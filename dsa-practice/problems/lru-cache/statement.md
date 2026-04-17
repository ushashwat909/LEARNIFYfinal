# LRU Cache

## Problem Description

Design and implement a data structure for Least Recently Used (LRU) cache. It should support the following operations: get and set.

- `get(key)` - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
- `set(key, value)` - Set or insert the value if the key is not already present. When the cache reaches its capacity, it should invalidate the least recently used item before inserting the new item.

The LRUCache will be initialized with an integer corresponding to its capacity. Capacity indicates the maximum number of unique keys it can hold at a time.

**Definition of "least recently used"**: An access to an item is defined as a get or a set operation of the item. "Least recently used" item is the one with the oldest access time.

**NOTE**: If you are using any global variables, make sure to clear them in the constructor.

## Problem Constraints

1 <= capacity <= 10^6
1 <= key, value <= 10^9

## Input Format

The input contains a single line with:
- First two numbers: `numOperations` and `capacity`
- Then `numOperations` operations follow, each operation is either:
  - `G key` - This corresponds to a function call `get(key)`
  - `S key value` - This corresponds to a function call `set(key, value)`

Note that the function calls are made in order.

## Output Format

Return an array of integers containing the results of all `get` operations in the order they were called. If a `get` operation returns -1, include -1 in the result array.

## Example Input

**Input 1:**
```
capacity = 2
set(1, 10)
set(5, 12)
get(5)        returns 12
get(1)        returns 10
get(10)       returns -1
set(6, 14)    this pushes out key = 5 as LRU is full.
get(5)        returns -1
```

**Input 2:**
```
capacity = 3
set(1, 1)
set(2, 2)
set(3, 3)
get(1)        returns 1
set(4, 4)     this pushes out key = 2 as LRU
get(2)        returns -1
```

## Example Output

**Output 1:**
```
[12, 10, -1, -1]
```

**Output 2:**
```
[1, -1]
```

## Example Explanation

**Explanation 1:**

- Initialize cache with capacity = 2
- set(1, 10): Cache = {1: 10}
- set(5, 12): Cache = {1: 10, 5: 12}
- get(5): Returns 12, Cache = {1: 10, 5: 12} (5 becomes most recently used)
- get(1): Returns 10, Cache = {1: 10, 5: 12} (1 becomes most recently used)
- get(10): Returns -1 (key 10 not in cache)
- set(6, 14): Cache is full, remove LRU (key 5), Cache = {1: 10, 6: 14}
- get(5): Returns -1 (key 5 was evicted)

**Explanation 2:**

- Initialize cache with capacity = 3
- set(1, 1), set(2, 2), set(3, 3): Cache = {1: 1, 2: 2, 3: 3}
- get(1): Returns 1, Cache = {2: 2, 3: 3, 1: 1} (1 becomes most recently used)
- set(4, 4): Cache is full, remove LRU (key 2), Cache = {3: 3, 1: 1, 4: 4}
- get(2): Returns -1 (key 2 was evicted)


