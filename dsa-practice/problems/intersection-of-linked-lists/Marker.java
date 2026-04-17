class Marker {
    // Find the intersection node of two linked lists using two pointers
    public ListNode getIntersectionNode(ListNode A, ListNode B) {
        if (A == null || B == null) {
            return null;
        }
        
        ListNode pointerA = A;
        ListNode pointerB = B;
        
        while (pointerA != pointerB) {
            pointerA = (pointerA != null) ? pointerA.next : B;
            pointerB = (pointerB != null) ? pointerB.next : A;
        }
        
        return pointerA;
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
    public boolean isCorrect(ListNode A, ListNode B, ListNode output) {
        // Note: We don't clone here because getIntersectionNode doesn't modify the lists
        // and we need to preserve the physical intersection if it exists
        ListNode expected = getIntersectionNode(A, B);
        
        // If no intersection, both should be null
        if (expected == null) {
            return output == null;
        }
        
        // If expected is not null but output is null, they don't match
        if (output == null) {
            return false;
        }
        
        // Compare the two linked lists starting from the intersection node
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

