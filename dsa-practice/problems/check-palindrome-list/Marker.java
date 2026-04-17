class Marker {
    // Check if linked list is a palindrome
    public int lPalin(ListNode A) {
        if (A == null) {
            return 1;
        }
        
        // Step 1: Find the middle of the linked list
        ListNode slow = A;
        ListNode fast = A;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        
        // Step 2: Reverse the second half of the linked list
        ListNode prev = null;
        ListNode curr = slow;
        while (curr != null) {
            ListNode nextNode = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextNode;
        }
        
        // Step 3: Compare the first half and the reversed second half
        ListNode left = A;
        ListNode right = prev;
        while (right != null) {
            if (left.val != right.val) {
                return 0;
            }
            left = left.next;
            right = right.next;
        }
        
        return 1;
    }

    // Compare the output with expected result
    public boolean isCorrect(ListNode A, int output) {
        // Note: We don't clone here because lPalin doesn't modify the list structure permanently
        // (it reverses but we only compare values, and the reversal is for comparison only)
        // However, to be safe, we should clone to avoid side effects
        ListNode AClone = cloneList(A);
        int expected = lPalin(AClone);
        return expected == output;
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
}


