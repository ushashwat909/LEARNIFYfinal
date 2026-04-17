class Marker {
    // Merge two sorted linked lists
    public ListNode mergeTwoLists(ListNode A, ListNode B) {
        ListNode fh = new ListNode(0); // Dummy node
        ListNode temp = fh;
        
        while (A != null && B != null) {
            if (A.val < B.val) {
                temp.next = new ListNode(A.val);
                A = A.next;
            } else {
                temp.next = new ListNode(B.val);
                B = B.next;
            }
            temp = temp.next;
        }
        
        // Attach remaining nodes from A
        if (A != null) {
            temp.next = A;
        }
        
        // Attach remaining nodes from B
        if (B != null) {
            temp.next = B;
        }
        
        return fh.next;
    }

    // Compare the output with expected result
    public boolean isCorrect(ListNode A, ListNode B, ListNode output) {
        ListNode expected = mergeTwoLists(A, B);
        
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

