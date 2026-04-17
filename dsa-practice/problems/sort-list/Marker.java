class Marker {
    // Sort linked list using merge sort (O(n log n))
    public ListNode sortList(ListNode A) {
        return sortL(A);
    }
    
    private ListNode sortL(ListNode head) {
        // Base case: empty list or single node
        if (head == null || head.next == null) {
            return head;
        }
        
        // Find the middle node using slow and fast pointers
        ListNode pre = head;
        ListNode slow = head;
        ListNode fast = head;
        
        while (fast != null && fast.next != null) {
            pre = slow;
            slow = slow.next;
            fast = fast.next.next;
        }
        
        // Split the list at the middle
        pre.next = null;
        
        // Recursively sort both halves
        ListNode left = sortL(head);
        ListNode right = sortL(slow);
        
        // Merge the sorted halves
        return merge(left, right);
    }
    
    private ListNode merge(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode head = dummy;
        
        while (l1 != null && l2 != null) {
            // Find the smaller node
            if (l1.val <= l2.val) {
                head.next = l1;
                l1 = l1.next;
            } else {
                head.next = l2;
                l2 = l2.next;
            }
            head = head.next;
        }
        
        // Add the remaining nodes
        head.next = (l1 != null) ? l1 : l2;
        
        return dummy.next;
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

    // Compare the output with expected result
    public boolean isCorrect(ListNode A, ListNode output) {
        // Clone the input to avoid modifying the original
        ListNode cloned = cloneList(A);
        ListNode expected = sortList(cloned);
        
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
}

