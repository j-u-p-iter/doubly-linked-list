import { DoublyLinkedListNode } from './DoublyLinkedListNode';

type Callback<Result = void> = (current: DoublyLinkedListNode | null, index: number) => Result;

export class DoublyLinkedList {
  private length = 0;
  private head = null;
  private tail = null;

  private isIndexInvalid(index: number) {
    if (typeof index !== 'number' || index < 0 || index >= this.length) {
      return true;
    }

    return false;
  }

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

  /**
   * Finds the node by the index.
   *
   */
  public findAt(nodeIndex: number): DoublyLinkedListNode | null {
    if (this.isIndexInvalid(nodeIndex)) { return null; }

    const methodToSearch = (nodeIndex < this.length / 2 ? this.find : this.findReverse).bind(this);

    const foundNode = methodToSearch((_, index) => index === nodeIndex);

    return foundNode;
  };

  /**
   * Finds the node in the list according to the
   *   condition, provided in the callback.
   *
   *   The node is searched from left to right, from
   *     the head to the tail.
   *
   */
  public find(
    callback: Callback<boolean>, 
    startingNode: DoublyLinkedListNode = this.head
  ): DoublyLinkedListNode | null {
    if (typeof callback !== 'function') {
      throw new Error('.find(callback) method expects a callback.');
    }

    if (!startingNode || !(startingNode instanceof DoublyLinkedListNode)) {
      throw new Error('.find(callback) expects to start from a starting node.');
    }

    let current = startingNode;
    let counter = 0;

    while(current instanceof DoublyLinkedListNode) {
      if (callback(current, counter)) {
        return current;
      }

      current = current.getNext();
      counter++;
    }

    return null;
  }

  /**
   * Finds the node in the list according to the
   *   condition, provided in the callback.
   *
   *   The node is searched from right to left, from
   *     the tail to the head.
   *
   */
  public findReverse(
    callback: Callback<boolean>, 
    startingNode: DoublyLinkedListNode = this.tail
  ) {
    if (typeof callback !== 'function') {
      throw new Error('.findReverse(callback) method expects a callback.');
    }

    if (!startingNode || !(startingNode instanceof DoublyLinkedListNode)) {
      throw new Error('.findReverse(callback) expects to start from a starting node.');
    }

    let current = startingNode;
    let counter = this.length - 1;

    while(current instanceof DoublyLinkedListNode) {
      if (callback(current, counter)) {
        return current;
      }

      current = current.getPrev();
      counter--;
    }

    return null;
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
