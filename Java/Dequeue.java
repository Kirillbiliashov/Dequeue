
public final class Dequeue<T> {
  private Node<T> first = null;
  private Node<T> last = null;

  public void push(T item) {
    Node<T> last = this.last;
    Node<T> elem = new Node<>(last, null, item);
    if (last != null) {
      last.setNext(elem);
      this.last = elem;
    } else {
      this.first = elem;
      this.last = elem;
    }
  }

  public T pop() {
    Node<T> elem = this.last;
    if (elem == null)
      return null;
    if (this.first == elem) {
      this.first = null;
      this.last = null;
    } else {
      this.last = elem.getPrev();
      this.last.setNext(null);
    }
    return elem.getItem();
  }

  public void unshift(T item) {
    Node<T> first = this.first;
    Node<T> elem = new Node<T>(null, first, item);
    if (first != null) {
      first.setPrev(elem);
      this.first = elem;
    } else {
      this.first = elem;
      this.last = elem;
    }
  }

  public T shift() {
    Node<T> elem = this.first;
    if (elem == null)
      return null;
    if (this.last == elem) {
      this.first = null;
      this.last = null;
    } else {
      this.first = elem.getNext();
      this.first.setPrev(null);
    }
    return elem.getItem();
  }

  public static void main(String[] args) {
    Dequeue<String> strDequeue = new Dequeue<>();
    strDequeue.push("first");
    strDequeue.push("second");
    strDequeue.unshift("third");
    System.out.println(strDequeue.pop());
    System.out.println(strDequeue.shift());
    System.out.println(strDequeue.shift());
  }
}
