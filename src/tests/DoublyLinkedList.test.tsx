import { DoublyLinkedList } from '../DoublyLinkedList';
import { DoublyLinkedListNode } from '../DoublyLinkedListNode';

describe('DoublyLinkedList', () => {
  it('is empty by default', () => {
    const doublyLinkedList = new DoublyLinkedList();

    expect(doublyLinkedList.getHead()).toBe(null);
    expect(doublyLinkedList.getTail()).toBe(null);
    expect(doublyLinkedList.getLength()).toBe(0);
    expect(doublyLinkedList.isEmpty()).toBe(true);
  });

  describe('push method', () => {
    describe('when the list is empty', () => {
      it('head and tail points to the same node', () => {
        const doublyLinkedList = new DoublyLinkedList();

        doublyLinkedList.push('10');

        const head = doublyLinkedList.getHead();
        const tail = doublyLinkedList.getTail();

        expect(head).toEqual(new DoublyLinkedListNode('10'));
        expect(tail).toEqual(new DoublyLinkedListNode('10'));
        expect(head.getNext()).toEqual(null);
        expect(head.getPrev()).toEqual(null);
        expect(tail.getNext()).toBe(null);
        expect(tail.getPrev()).toBe(null);
        expect(doublyLinkedList.getLength()).toEqual(1);
      });
    });

    describe('when there is more than one node', () => {
      it('replace the tail with the newly added node', () => {
        const doublyLinkedList = new DoublyLinkedList();

        doublyLinkedList.push('12');
        doublyLinkedList.push(new DoublyLinkedListNode('25'));

        const head = doublyLinkedList.getHead();
        const tail = doublyLinkedList.getTail();

        expect(head).toEqual(new DoublyLinkedListNode('12', tail));
        expect(tail).toEqual(new DoublyLinkedListNode('25', null, head));
        expect(head.getNext()).toEqual(tail);
        expect(head.getPrev()).toEqual(null);
        expect(tail.getNext()).toBe(null);
        expect(tail.getPrev()).toBe(head);
        expect(doublyLinkedList.getLength()).toEqual(2);
      });
    });

    describe('returns new linked list', () => {
      it('replace the tail with the newly added node', () => {
        const doublyLinkedList = new DoublyLinkedList();

        const result = doublyLinkedList.push('12');

        expect(result).toEqual(doublyLinkedList);
      });
    });
  });
});
