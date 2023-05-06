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

  describe('findAt method', () => {
    describe('when the list is empty', () => {
      it('returns null', () => {
        const doublyLinkedList = new DoublyLinkedList();

        const node = doublyLinkedList.findAt(2);

        expect(node).toEqual(null);
      });
    });

    describe('when the index is negative', () => {
      it('returns null', () => {
        const doublyLinkedList = new DoublyLinkedList();

        doublyLinkedList.push(new DoublyLinkedListNode('10'));

        const node = doublyLinkedList.findAt(-1);

        expect(node).toEqual(null);
      })
    });

    describe('when the index is higher than list length or equal list length', () => {
      it('returns null', () => {
        const doublyLinkedList = DoublyLinkedList.fromArray(['10', '12', '15']);

        const node = doublyLinkedList.findAt(3);

        expect(node).toEqual(null);
      });
    });

    describe('when the index is valid and the list is not empty', () => {
      it('returns correct node', () => {
        const doublyLinkedList = DoublyLinkedList.fromArray(['10', '12', '15']);

        const node = doublyLinkedList.findAt(1);

        expect(node.getValue()).toEqual('12');
      });
    });
  });

  describe('setAt method', () => {
    describe('when the list is empty', () => {
      it('returns false', () => {
        const doublyLinkedList = new DoublyLinkedList();

        const result = doublyLinkedList.setAt(0, 2);

        expect(result).toEqual(false);
        expect(doublyLinkedList.getLength()).toBe(0);
      });
    });

    describe('when the index is negative', () => {
      it('returns false', () => {
        const doublyLinkedList = new DoublyLinkedList();

        doublyLinkedList.push(new DoublyLinkedListNode('10'));

        const result = doublyLinkedList.setAt(-1, '5');

        expect(result).toEqual(false);
        expect(doublyLinkedList.getLength()).toBe(1);
      });
    });

    describe('when the index is valid and the list is not empty', () => {
      it('returns correct node', () => {
        const doublyLinkedList = DoublyLinkedList.fromArray(['10', '12', '15']);

        doublyLinkedList.setAt(1, '5');

        expect(doublyLinkedList.findAt(1).getValue()).toEqual('5');
        expect(doublyLinkedList.getLength()).toBe(3);
      });
    });
  });

  describe('insertAt method', () => {
    describe('if the index is negative', () => {
      it('returns false and does not insert node', () => {
        const doublyLinkedList = new DoublyLinkedList();

        const result = doublyLinkedList.insertAt(-5, 10);

        expect(result).toBe(false);
        expect(doublyLinkedList.getLength()).toBe(0);
      });
    });

    describe('if the index is higher than the length of the list', () => {
      it('returns false and does not insert node', () => {
        const doublyLinkedList = new DoublyLinkedList();

        const nodes = [
          new DoublyLinkedListNode('10'),
          new DoublyLinkedListNode('12'),
          new DoublyLinkedListNode('15'),
        ];

        nodes.forEach((node) => doublyLinkedList.push(node));

        const result = doublyLinkedList.insertAt(20, 10);

        expect(result).toBe(false);
        expect(doublyLinkedList.getLength()).toBe(3);
      });
    });

    describe('if the index equals to 0', () => {
      it('inserts node in the beginning of the list', () => {
        const doublyLinkedList = new DoublyLinkedList();

        const nodes = [
          new DoublyLinkedListNode('10'),
          new DoublyLinkedListNode('12'),
          new DoublyLinkedListNode('15'),
        ];

        nodes.forEach((node) => doublyLinkedList.push(node));

        const result = doublyLinkedList.insertAt(0, new DoublyLinkedListNode('5'));

        expect(doublyLinkedList.getLength()).toBe(4);
        expect(doublyLinkedList.getHead().getValue()).toEqual('5');
        expect(result).toBe(true);
      });
    });

    describe('if the index equals to the length of the list', () => {
      it('inserts node at the end of the list', () => {
        const doublyLinkedList = new DoublyLinkedList();

        const nodes = [
          new DoublyLinkedListNode('10'),
          new DoublyLinkedListNode('12'),
          new DoublyLinkedListNode('15'),
        ];

        nodes.forEach((node) => doublyLinkedList.push(node));

        const result = doublyLinkedList.insertAt(3, new DoublyLinkedListNode('5'));

        expect(doublyLinkedList.getLength()).toBe(4);
        expect(doublyLinkedList.getTail().getValue()).toEqual('5');
        expect(result).toBe(true);
      });
    });

    describe('if the index is valid', () => {
      it('inserts node at correct index', () => {
        const doublyLinkedList = new DoublyLinkedList();

        const nodes = [
          new DoublyLinkedListNode('10'),
          new DoublyLinkedListNode('12'),
          new DoublyLinkedListNode('15'),
        ];

        nodes.forEach((node) => doublyLinkedList.push(node));

        const result = doublyLinkedList.insertAt(1, new DoublyLinkedListNode('5'));

        expect(doublyLinkedList.getLength()).toBe(4);
        expect(doublyLinkedList.findAt(0).getValue()).toEqual('10');
        expect(doublyLinkedList.findAt(1).getValue()).toEqual('5');
        expect(doublyLinkedList.findAt(2).getValue()).toEqual('12');
        expect(result).toBe(true);
      });
    });
  });

  describe('removeAt method', () => {
    describe('if the index is negative', () => {
      it('returns false', () => {
        const doublyLinkedList = new DoublyLinkedList();

        const result = doublyLinkedList.removeAt(-5);

        expect(result).toBe(false);
        expect(doublyLinkedList.getLength()).toBe(0);
      });
    });

    describe('if the index is higher than the length of the list', () => {
      it('returns false', () => {
        const doublyLinkedList = new DoublyLinkedList();

        const nodes = [
          new DoublyLinkedListNode('10'),
          new DoublyLinkedListNode('12'),
          new DoublyLinkedListNode('15'),
        ];

        nodes.forEach((node) => doublyLinkedList.push(node));

        const result = doublyLinkedList.removeAt(20);

        expect(result).toBe(false);
        expect(doublyLinkedList.getLength()).toBe(3);
      });
    });

    describe('if the index equals to 0', () => {
      it('removes node from the beginning of the list', () => {
        const doublyLinkedList = new DoublyLinkedList();

        const nodes = [
          new DoublyLinkedListNode('10'),
          new DoublyLinkedListNode('12'),
          new DoublyLinkedListNode('15'),
        ];

        nodes.forEach((node) => doublyLinkedList.push(node));

        const result = doublyLinkedList.removeAt(0);

        expect(doublyLinkedList.getLength()).toBe(2);
        expect(doublyLinkedList.getHead().getValue()).toEqual('12');
        expect(result).toBe(true);
      });
    });

    describe('if the index equals to the length of the list - 1', () => {
      it('removes the last node of the list', () => {
        const doublyLinkedList = new DoublyLinkedList();

        const nodes = [
          new DoublyLinkedListNode('10'),
          new DoublyLinkedListNode('12'),
          new DoublyLinkedListNode('15'),
        ];

        nodes.forEach((node) => doublyLinkedList.push(node));

        const result = doublyLinkedList.removeAt(2);

        expect(doublyLinkedList.getLength()).toBe(2);
        expect(doublyLinkedList.getTail().getValue()).toEqual('12');
        expect(result).toBe(true);
      });
    });

    describe('if the index is valid', () => {
      it('removes node with correct index', () => {
        const doublyLinkedList = new DoublyLinkedList();

        const nodes = [
          new DoublyLinkedListNode('10'),
          new DoublyLinkedListNode('12'),
          new DoublyLinkedListNode('15'),
        ];

        nodes.forEach((node) => doublyLinkedList.push(node));

        const result = doublyLinkedList.removeAt(1);

        expect(doublyLinkedList.getLength()).toBe(2);
        expect(doublyLinkedList.findAt(0).getValue()).toEqual('10');
        expect(doublyLinkedList.findAt(1).getValue()).toEqual('15');
        expect(result).toBe(true);
      });
    });
  });

  describe('forEach method', () => {
    it('traverses list from the very beginning till the very end', () => {
      const doublyLinkedList = DoublyLinkedList.fromArray(['10', '12', '15']);

      const callback = jest.fn(() => {});
      doublyLinkedList.forEach(callback)

      expect(callback).toHaveBeenCalledTimes(3);

      expect((callback.mock.calls[0] as any)[0].getValue()).toBe('10')
      expect((callback.mock.calls[0] as any)[1]).toEqual(0)

      expect((callback.mock.calls[1] as any)[0].getValue()).toBe('12')
      expect((callback.mock.calls[1] as any)[1]).toEqual(1)

      expect((callback.mock.calls[2] as any)[0].getValue()).toBe('15')
      expect((callback.mock.calls[2] as any)[1]).toEqual(2)
    });
  });

  describe('forEachReverse method', () => {
    it('traverses list from the very beginning till the very end', () => {
      const doublyLinkedList = DoublyLinkedList.fromArray(['10', '12', '15']);

      const callback = jest.fn(() => {});
      doublyLinkedList.forEachReverse(callback)

      expect(callback).toHaveBeenCalledTimes(3);

      expect((callback.mock.calls[0] as any)[0].getValue()).toBe('15')
      expect((callback.mock.calls[0] as any)[1]).toEqual(0)

      expect((callback.mock.calls[1] as any)[0].getValue()).toBe('12')
      expect((callback.mock.calls[1] as any)[1]).toEqual(1)

      expect((callback.mock.calls[2] as any)[0].getValue()).toBe('10')
      expect((callback.mock.calls[2] as any)[1]).toEqual(2)
    });
  });
});
