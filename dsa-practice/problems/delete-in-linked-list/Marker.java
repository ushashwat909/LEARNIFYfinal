class Marker {
    // Delete the B-th node (0-based) from the linked list
    public ListNode solve(ListNode A, int B) {
        // If deleting the head node (position 0)
        if (B == 0) {
            return A.next;
        }
        
        // Traverse to position B-1
        ListNode temp = A;
        for (int i = 0; i < B - 1; i++) {
            temp = temp.next;
        }
        
        // Delete the B-th node
        ListNode bth = temp.next;
        temp.next = bth.next;
        bth.next = null; // Optional: break the link
        
        return A;
    }

    // Compare the output with expected result
    public boolean isCorrect(ListNode A, int B, ListNode output) {
        ListNode expected = solve(A, B);
        
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





