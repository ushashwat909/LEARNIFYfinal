class Marker {
    // Insert a new node with value B at position C (0-based) in linked list
    public ListNode solve(ListNode A, int B, int C) {
        ListNode new_node = new ListNode(B);
        
        // If list is empty, return new node
        if (A == null) {
            return new_node;
        }
        
        // If inserting at head (position 0)
        if (C == 0) {
            new_node.next = A;
            return new_node;
        }
        
        // Traverse to position C-1
        ListNode temp = A;
        for (int i = 0; i < C - 1; i++) {
            if (temp.next != null) {
                temp = temp.next;
            } else {
                // Reached end of list, insert at tail
                break;
            }
        }
        
        // Insert the new node
        ListNode cth = temp.next;
        temp.next = new_node;
        new_node.next = cth;
        
        return A;
    }

    // Compare the output with expected result
    public boolean isCorrect(ListNode A, int B, int C, ListNode output) {
        ListNode expected = solve(A, B, C);
        
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





