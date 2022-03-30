
public final class Queue<T> {
  private Node<T> first;
  private Node<T> last;

  public void put(T data) {
    Node<T> last = this.last;
    Node<T> elem = new Node<>(data);
    if (last != null) {
      last.setNext(elem);
      this.last = elem;
    } else {
      this.first = elem;
      this.last = elem;
    }
  }

  public T pick() {
    Node<T> elem = this.first;
    if (elem == null)
      return null;
    if (this.last == elem) {
      this.first = null;
      this.last = null;
    } else {
      this.first = elem.getNext();
    }
    return elem.getItem();
  }

  public static void main(String[] args) {
    Queue<String> queue = new Queue<>();
    queue.put("first");
    queue.put("second");
    queue.put("third");

    System.out.println(queue.pick());
    System.out.println(queue.pick());
    System.out.println(queue.pick());
    System.out.println(queue.pick());
  }

}
