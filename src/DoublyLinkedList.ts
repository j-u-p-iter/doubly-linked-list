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

  /**
   * Removes the last node 
   *   from the list.
   *
   */
  public pop() {
    if (this.isEmpty()) { return; }

    const removedNode = this.tail;

    if (this.length === 1) {
      this.clear();

      removedNode.setPrev(null);

      return removedNode;
    }

    this.tail = removedNode.getPrev(); 

    this.tail.setNext(null);

    removedNode.setPrev(null);

    this.length--;

    return removedNode;
  }

  /**
   * Removes first node 
   *   from the list.
   *
   */
  public shift() {
    const currentHead = this.head;

    if (this.isEmpty()) {
      return;
    }

    if (this.length === 1) {
      this.clear();
    } else {
      this.head = this.head.getNext();
      this.head.setPrev(null);

      this.length--;
    }

    return currentHead.setNext(null);
  }

  /**
   * Adds new node to the 
   *   beginning of the list.
   *
   */
  public unshift(value) {
    const newNode = this.valueToNode(value);

    if (this.isEmpty()) {
      return this.push(newNode);
    }

    newNode.setNext(this.head);

    this.head.setPrev(newNode);

    this.head = newNode;

    this.length++;

    return this;
  }

  /**
   * Clears the list.
   *
   */
  public clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
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

  static fromArray(array): DoublyLinkedList {
    if (!Array.isArray(array)) {
      throw new Error('fromArray(array) method expects an array');
    }

    const doublyLinkedList = new DoublyLinkedList();

    array.forEach((value) => {
      doublyLinkedList.push(value);
    });

    return doublyLinkedList;
  }
}
