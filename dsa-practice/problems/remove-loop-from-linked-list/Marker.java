class Marker {
    // Remove loop from linked list using Floyd's cycle detection
    public ListNode solve(ListNode A) {
        if (A == null || A.next == null) {
            return A;
        }
        
        ListNode slow = A;
        ListNode fast = A;
        
        // Detect cycle using Floyd's algorithm
        while (true) {
            if (slow == null || fast == null || fast.next == null) {
                // No cycle found, return the list as is
                return A;
            }
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                break;
            }
        }
        
        // Find the start of the cycle
        ListNode b = A;
        while (b != slow) {
            b = b.next;
            slow = slow.next;
        }
        
        // Find the node just before the start of the cycle
        ListNode temp = b;
        while (temp.next != b) {
            temp = temp.next;
        }
        
        // Break the loop
        temp.next = null;
        
        return A;
    }

    // Compare the output with expected result
    public boolean isCorrect(ListNode A, ListNode output) {
        // Clone the input to avoid modifying the original
        ListNode cloned = cloneList(A);
        ListNode expected = solve(cloned);
        
        // Compare the two linked lists
        ListNode exp = expected;
        ListNode out = output;
        
        while (exp != null && out != null) {
            if (exp.val != out.val) {
                return false;
            }
            exp = exp.next;
            out = out.next;
        }
        
        // Both should be null at the same time
        return exp == null && out == null;
    }
    
    // Clone a linked list
    private ListNode cloneList(ListNode head) {
        if (head == null) {
            return null;
        }
        
        // First, create a map to track nodes and detect cycles
        java.util.Map<ListNode, ListNode> nodeMap = new java.util.HashMap<>();
        ListNode current = head;
        ListNode dummy = new ListNode(0);
        ListNode newCurrent = dummy;
        
        while (current != null) {
            // Check if we've seen this node before (cycle detected)
            if (nodeMap.containsKey(current)) {
                // Create a link to the previously created node
                newCurrent.next = nodeMap.get(current);
                break;
            }
            
            // Create a new node
            ListNode newNode = new ListNode(current.val);
            nodeMap.put(current, newNode);
            newCurrent.next = newNode;
            newCurrent = newCurrent.next;
            current = current.next;
        }
        
        return dummy.next;
    }
}

