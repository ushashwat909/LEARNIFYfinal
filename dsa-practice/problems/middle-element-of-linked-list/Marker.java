class Marker {
    // Find the middle element of linked list using slow and fast pointers
    public int solve(ListNode A) {
        ListNode slow = A;
        ListNode fast = A;
        
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        
        return slow.val;
    }

    // Compare the output with expected result
    public boolean isCorrect(ListNode A, int output) {
        int expected = solve(A);
        return expected == output;
    }
}

