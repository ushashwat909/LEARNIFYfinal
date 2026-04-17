import java.util.*;

class Marker {
    // Helper class to store node with its list index
    static class NodeEntry {
        int val;
        int listIndex;
        ListNode node;
        
        NodeEntry(int val, int listIndex, ListNode node) {
            this.val = val;
            this.listIndex = listIndex;
            this.node = node;
        }
    }
    
    public ListNode mergeKLists(ListNode[] A) {
        if (A == null || A.length == 0) {
            return null;
        }
        
        // Min heap to store (value, listIndex, node)
        PriorityQueue<NodeEntry> minHeap = new PriorityQueue<>((a, b) -> Integer.compare(a.val, b.val));
        
        // Initialize the heap with the first node of each list
        for (int i = 0; i < A.length; i++) {
            if (A[i] != null) {
                minHeap.offer(new NodeEntry(A[i].val, i, A[i]));
            }
        }
        
        // Create a dummy head for the merged linked list
        ListNode dummy = new ListNode(0);
        ListNode current = dummy;
        
        // Process the heap until it is empty
        while (!minHeap.isEmpty()) {
            NodeEntry minEntry = minHeap.poll();
            ListNode node = minEntry.node;
            
            // Add the node to the result
            current.next = node;
            current = current.next;
            
            // If there's a next node in the list, push it to the heap
            if (node.next != null) {
                minHeap.offer(new NodeEntry(node.next.val, minEntry.listIndex, node.next));
            }
        }
        
        return dummy.next;
    }
    
    // Helper method to compare two linked lists
    private boolean compareLists(ListNode l1, ListNode l2) {
        while (l1 != null && l2 != null) {
            if (l1.val != l2.val) {
                return false;
            }
            l1 = l1.next;
            l2 = l2.next;
        }
        return l1 == null && l2 == null;
    }
    
    // Clone a linked list
    private ListNode cloneList(ListNode head) {
        if (head == null) {
            return null;
        }
        ListNode dummy = new ListNode(0);
        ListNode current = dummy;
        ListNode original = head;
        
        while (original != null) {
            current.next = new ListNode(original.val);
            current = current.next;
            original = original.next;
        }
        
        return dummy.next;
    }
    
    // Clone array of linked lists
    private ListNode[] cloneListArray(ListNode[] A) {
        if (A == null) {
            return null;
        }
        ListNode[] cloned = new ListNode[A.length];
        for (int i = 0; i < A.length; i++) {
            cloned[i] = cloneList(A[i]);
        }
        return cloned;
    }

    public boolean isCorrect(ListNode[] A, ListNode output) {
        // Clone the input array to avoid modifying original
        ListNode[] AClone = cloneListArray(A);
        ListNode expected = mergeKLists(AClone);
        return compareLists(expected, output);
    }
}

