class Marker {
    // Reverse a linked list
    private ListNode reverse(ListNode A) {
        ListNode prev = null;
        ListNode cur = A;
        while (cur != null) {
            ListNode next_node = cur.next;
            cur.next = prev;
            prev = cur;
            cur = next_node;
        }
        return prev;
    }
    
    // Check if linked list is a palindrome
    public int lPalin(ListNode A) {
        if (A == null || A.next == null) {
            return 1;
        }
        
        // Find the middle using slow and fast pointers
        ListNode s = A;
        ListNode f = A;
        
        while (f.next != null && f.next.next != null) {
            s = s.next;
            f = f.next.next;
        }
        
        // Reverse the second half
        ListNode sec_head = s.next;
        s.next = null;
        sec_head = reverse(sec_head);
        
        // Compare the two halves
        ListNode temp1 = A;
        ListNode temp2 = sec_head;
        
        while (temp1 != null && temp2 != null) {
            if (temp1.val != temp2.val) {
                return 0;
            }
            temp1 = temp1.next;
            temp2 = temp2.next;
        }
        
        return 1;
    }

    // Compare the output with expected result
    public boolean isCorrect(ListNode A, int output) {
        int expected = lPalin(A);
        return expected == output;
    }
}





