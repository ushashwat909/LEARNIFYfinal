import java.util.*;

class Node {
    int key;
    int value;
    Node prev;
    Node next;
    
    Node(int key, int value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    private int capacity;
    private Map<Integer, Node> map;  // key -> Node
    private Node head;  // dummy head, head.next = LRU
    private Node tail;  // dummy tail, tail.prev = MRU
    
    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.map = new HashMap<>();
        
        // Create dummy head and tail nodes
        this.head = new Node(-1, -1);
        this.tail = new Node(-1, -1);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    
    private void remove(Node node) {
        Node prev = node.prev;
        Node next = node.next;
        prev.next = next;
        next.prev = prev;
        node.next = null;
        node.prev = null;
    }
    
    private void addBefore(Node y, Node newNode) {
        Node x = y.prev;
        newNode.next = y;
        newNode.prev = x;
        x.next = newNode;
        y.prev = newNode;
    }
    
    private void moveToMRU(Node node) {
        remove(node);
        addBefore(this.tail, node);
    }
    
    public int get(int key) {
        if (!map.containsKey(key)) {
            return -1;
        }
        
        Node node = map.get(key);
        moveToMRU(node);
        return node.value;
    }
    
    public void set(int key, int value) {
        // If key already exists, update value and move to MRU
        if (map.containsKey(key)) {
            Node node = map.get(key);
            node.value = value;
            moveToMRU(node);
            return;
        }
        
        // If cache is full, remove LRU (node after head)
        if (map.size() == capacity) {
            Node lru = head.next;
            remove(lru);
            map.remove(lru.key);
        }
        
        // Insert new node at MRU position (before tail)
        Node newNode = new Node(key, value);
        addBefore(this.tail, newNode);
        map.put(key, newNode);
    }
}

class Marker {
    // Execute LRU Cache operations and return results of get operations
    public int[] executeLRUCache(int capacity, String operations) {
        // Parse operations string: "numOperations G key1 S key2 value2 ..."
        String[] tokens = operations.trim().split("\\s+");
        
        // First token is numOperations (we can ignore it, just process all operations)
        List<Integer> results = new ArrayList<>();
        LRUCache cache = new LRUCache(capacity);
        
        // Start from index 1 (skip numOperations)
        int i = 1;
        while (i < tokens.length) {
            String op = tokens[i];
            if (op.equals("G")) {
                // Get operation: G key
                int key = Integer.parseInt(tokens[i + 1]);
                int result = cache.get(key);
                results.add(result);
                i += 2;
            } else if (op.equals("S")) {
                // Set operation: S key value
                int key = Integer.parseInt(tokens[i + 1]);
                int value = Integer.parseInt(tokens[i + 2]);
                cache.set(key, value);
                i += 3;
            } else {
                i++;
            }
        }
        
        // Convert list to array
        int[] resultArray = new int[results.size()];
        for (int j = 0; j < results.size(); j++) {
            resultArray[j] = results.get(j);
        }
        return resultArray;
    }
    
    // Compare the output with expected result
    public boolean isCorrect(int capacity, String operations, int[] output) {
        int[] expected = executeLRUCache(capacity, operations);
        
        if (expected.length != output.length) {
            return false;
        }
        
        for (int i = 0; i < expected.length; i++) {
            if (expected[i] != output[i]) {
                return false;
            }
        }
        
        return true;
    }
}


