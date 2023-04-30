export class DoublyLinkedListNode {
  private value: any;

  private next = null;

  private prev = null;

  constructor(value, next = null, prev = null) {
    this.setValue(value);
    this.setNext(next);
    this.setPrev(prev);
  }

  public setNext(next: DoublyLinkedListNode | null) {
    if (this.next !== null && !(this.next instanceof DoublyLinkedListNode)) {
      throw new Error(
        'setNext expects a DoublyLinkedListNode or a null'
      );
    }

    this.next = next;

    return this;
  }

  public getNext() {
    return this.next;
  }

  /**
   * Checks if there is a next node.
   *
   */
  public hasNext() {
    return this.next instanceof DoublyLinkedListNode; 
  }

  public setPrev(prev: DoublyLinkedListNode | null) {
    if (this.prev !== null && !(this.prev instanceof DoublyLinkedListNode)) {
      throw new Error(
        'setPrev expects a DoublyLinkedListNode or a null'
      );
    }

    this.prev = prev;

    return this;
  }

  public getPrev() {
    return this.prev;
  }

  /**
   * Checks if there is a prev node.
   *
   */
  public hasPrev() {
    return this.prev instanceof DoublyLinkedListNode;
  }

  public setValue(value) {
    this.value = value;

    return this;
  }

  public getValue() {
    return this.value;
  }

  /**
   * Clones the node
   * 
   * It's very important to clone the object, using this way,
   *   since otherwise you won't be able to check if 
   *   the object is the instance of the SinglyLinkedListNode class like
   *   "node instanceof SinglyLinkedListNode"
   */
  public clone() {
    const props = { ...this };

    const clone = Reflect.construct(this.constructor, []);

    Object.keys(props).forEach((prop) => {
      clone[prop] = props[prop];
    });

    clone.setNext(null);

    return clone;
  }
}
