import { DoublyLinkedListNode } from './DoublyLinkedListNode';


export class DoublyLinkedList {
  private length = 0;
  private head = null;
  private tail = null;

  private valueToNode(value: any) {
    let newNode;

    if (value instanceof DoublyLinkedListNode) {
      newNode = value;
    } else {
      newNode = new DoublyLinkedListNode(value);
    }

    return newNode;
  }

  constructor() {};

  public push(value: any) {
    const newNode = this.valueToNode(value);

    /**
     * When there is only one node,
     *   the head and the tail refer to the same node.
     *   The next and prev properties for both 
     *   nodes are equal to null.
     */
    if (this.isEmpty()) {
      this.head = this.tail = newNode;
      this.tail.setNext(null).setPrev(null);
    } else {
      newNode.setPrev(this.tail);
      this.tail.setNext(newNode);
      this.tail = newNode;
    }

    this.length++;

    return this;
  }

  public isEmpty() {
    return this.head === null;
  }

  public getLength() {
    return this.length;
  }

  public getHead() {
    return this.head;
  }

  public getTail() {
    return this.tail;
  }
}
