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

  describe('pop method', () => {
    it('removes last node from the list', () => {
      const doublyLinkedList = DoublyLinkedList.fromArray(['10', '12', '15']);

      expect(doublyLinkedList.getLength()).toBe(3);
      expect(doublyLinkedList.getTail().getValue()).toEqual('15');

      doublyLinkedList.pop();
      
      expect(doublyLinkedList.getLength()).toBe(2);
      expect(doublyLinkedList.getTail().getValue()).toEqual('12');
      expect(doublyLinkedList.getTail().getNext()).toBe(null);
      expect(doublyLinkedList.getTail().getPrev().getValue()).toBe('10');
    });

    it('returns removed node', () => {
      const doublyLinkedList = DoublyLinkedList.fromArray(['10', '12', '15']);

      const removedNode = doublyLinkedList.pop();
      
      expect(removedNode.getValue()).toEqual('15');
      expect(removedNode.getPrev()).toBe(null);
      expect(removedNode.getNext()).toBe(null);
    });

    describe('when there is one node in the list', () => {
      it('clears the list', () => {
        const doublyLinkedList = DoublyLinkedList.fromArray(['10']);

        const removedNode = doublyLinkedList.pop();
        
        expect(removedNode).toEqual(new DoublyLinkedListNode('10'));
        expect(doublyLinkedList.getHead()).toBe(null);
        expect(doublyLinkedList.getTail()).toBe(null);
        expect(doublyLinkedList.getLength()).toBe(0);
      });
    });

    describe('when the list is empty', () => {
      it('returns undefined', () => {
        const doublyLinkedList = new DoublyLinkedList();

        expect(doublyLinkedList.pop()).not.toBeDefined();
        expect(doublyLinkedList.getLength()).toBe(0);
      });
    })
  });

  describe('shift method', () => {
    it('removes first node from the list', () => {
      const doublyLinkedList = DoublyLinkedList.fromArray(['10', '12', '15']);

      expect(doublyLinkedList.getLength()).toBe(3);
      expect(doublyLinkedList.getHead().getValue()).toEqual('10');

      doublyLinkedList.shift();
      
      expect(doublyLinkedList.getLength()).toBe(2);
      expect(doublyLinkedList.getHead().getValue()).toEqual('12');
      expect(doublyLinkedList.getHead().getPrev()).toBe(null);
    });

    it('returns the removed node', () => {
      const doublyLinkedList = DoublyLinkedList.fromArray(['10', '12', '15']);

      const removedNode = doublyLinkedList.shift();

      expect(removedNode.getValue()).toEqual('10');
      expect(removedNode.getNext()).toBe(null);
      expect(removedNode.getPrev()).toBe(null);
    });

    describe('when there is one node in the list', () => {
      it('clears the list', () => {
        const doublydLinkedList = DoublyLinkedList.fromArray(['10']);

        const removedNode = doublydLinkedList.shift();
        
        expect(removedNode.getValue()).toEqual('10');
        expect(doublydLinkedList.getHead()).toBe(null);
        expect(doublydLinkedList.getTail()).toBe(null);
        expect(doublydLinkedList.getLength()).toBe(0);
      });
    });

    describe('when the list is empty', () => {
      it('returns undefined', () => {
        const doublydLinkedList = new DoublyLinkedList();

        expect(doublydLinkedList.shift()).not.toBeDefined();
        expect(doublydLinkedList.getLength()).toBe(0);
      });
    })
  });

  describe('unshift method', () => {
    it('returns new linked list', () => {
      const doublyLinkedList = new DoublyLinkedList();

      const result = doublyLinkedList.unshift('12');

      expect(result).toEqual(doublyLinkedList);
    });

    describe('when the list is empty', () => {
      it('head and tail points to the same node', () => {
        const doublyLinkedList = new DoublyLinkedList();

        doublyLinkedList.unshift('10');

        const head = doublyLinkedList.getHead();
        const tail = doublyLinkedList.getTail();

        expect(head).toEqual(new DoublyLinkedListNode('10'));
        expect(head.getNext()).toEqual(null);
        expect(head.getPrev()).toEqual(null);
        expect(tail).toEqual(new DoublyLinkedListNode('10'));
        expect(tail.getNext()).toBe(null);
        expect(tail.getPrev()).toBe(null);
        expect(doublyLinkedList.getLength()).toEqual(1);
      });
    });

    describe('when there is more than one node', () => {
      it('replace the head with the newly added node shifting the current head to the right', () => {
        const doublyLinkedList = new DoublyLinkedList();

        doublyLinkedList.unshift('12');
        doublyLinkedList.unshift(new DoublyLinkedListNode('25'));

        const head = doublyLinkedList.getHead();
        const tail = doublyLinkedList.getTail();

        expect(head).toEqual(new DoublyLinkedListNode('25', tail));
        expect(head.getNext()).toEqual(tail);
        expect(head.getPrev()).toEqual(null);

        expect(tail).toEqual(new DoublyLinkedListNode('12', null, head));
        expect(tail.getNext()).toBe(null);
        expect(tail.getPrev()).toEqual(new DoublyLinkedListNode('25', tail));

        expect(doublyLinkedList.getLength()).toEqual(2);
      });
    });
  });
});
