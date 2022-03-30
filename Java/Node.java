
public final class Node<T> {
  private Node<T> prev;
  private Node<T> next;
  private T item;

  public Node(Node<T> prev, Node<T> next, T item) {
    this.prev = prev;
    this.next = next;
    this.item = item;
  }

  public Node(T item) {
    this(null, null, item);
  }

  public T getItem() {
    return this.item;
  }

  public Node<T> getPrev() {
    return this.prev;
  }

  public Node<T> getNext() {
    return this.next;
  }

  public void setPrev(Node<T> prev) {
    this.prev = prev;
  }

  public void setNext(Node<T> next) {
    this.next = next;
  }

}
