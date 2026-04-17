class Marker {
    // Reverse the linked list in-place and in one-pass
    public ListNode reverseList(ListNode A) {
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

    // Compare the output with expected result
    public boolean isCorrect(ListNode A, ListNode output) {
        ListNode expected = reverseList(A);
        
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





