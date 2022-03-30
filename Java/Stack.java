
public final class Stack<T> {
  private Node<T> last;

  public Stack() {
    this.last = null;
  }

  public void push(T data) {
    Node<T> prev = this.last;
    Node<T> elem = new Node<>(prev, null, data);
    this.last = elem;
  }

  public T pop() {
    Node<T> elem = this.last;
    if (elem == null)
      return null;
    this.last = elem.getPrev();
    return elem.getItem();
  }

  public static void main(String[] args) {
    Stack<String> strStack = new Stack<>();
    strStack.push("first");
    strStack.push("second");
    strStack.push("third");
    System.out.println(strStack.pop());
    System.out.println(strStack.pop());
    System.out.println(strStack.pop());
    System.out.println(strStack.pop());
  }

}