import NonDocumentChildNodeUtility from '../../../src/nodes/child-node/NonDocumentChildNodeUtility';
import CharacterDataUtility from '../../../src/nodes/character-data/CharacterDataUtility';
import Window from '../../../src/window/Window';
import ChildNodeUtility from '../../../src/nodes/child-node/ChildNodeUtility';

describe('TextNode', () => {
	let window;
	let document;

	beforeEach(() => {
		window = new Window();
		document = window.document;
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe('get nodeName()', () => {
		it('Returns "#text".', () => {
			const node = document.createTextNode('test');
			expect(node.nodeName).toBe('#text');
		});
	});
	describe('get length()', () => {
		it('Returns "#comment".', () => {
			const node = document.createTextNode('test');
			expect(node.length).toBe(4);
		});
	});

	describe('get textContent()', () => {
		it('Returns text content.', () => {
			const node = document.createTextNode('test');
			expect(node.textContent).toBe('test');
		});
	});

	describe('set textContent()', () => {
		it('Sets text content.', () => {
			const node = document.createTextNode('test');
			node.textContent = 'new text';
			expect(node.textContent).toBe('new text');
		});
	});

	describe('get nodeValue()', () => {
		it('Returns text content.', () => {
			const node = document.createTextNode('test');
			expect(node.nodeValue).toBe('test');
		});
	});

	describe('set nodeValue()', () => {
		it('Sets text content.', () => {
			const node = document.createTextNode('test');
			node.nodeValue = 'new text';
			expect(node.nodeValue).toBe('new text');
		});
	});

	describe('get data()', () => {
		it('Returns text content.', () => {
			const node = document.createTextNode('test');
			expect(node.data).toBe('test');
		});
	});

	describe('set data()', () => {
		it('Sets text content.', () => {
			const node = document.createTextNode('test');
			node.data = 'new text';
			expect(node.data).toBe('new text');
		});
	});

	describe('get previousElementSibling()', () => {
		it('Returns previous element sibling..', () => {
			const node = document.createTextNode('test');
			const previousElementSibling = document.createElement('div');
			jest
				.spyOn(NonDocumentChildNodeUtility, 'previousElementSibling')
				.mockImplementation(childNode => {
					expect(childNode).toBe(node);
					return previousElementSibling;
				});

			expect(node.previousElementSibling).toBe(previousElementSibling);
		});
	});

	describe('get nextElementSibling()', () => {
		it('Returns next element sibling..', () => {
			const node = document.createTextNode('test');
			const nextElementSibling = document.createElement('div');
			jest
				.spyOn(NonDocumentChildNodeUtility, 'nextElementSibling')
				.mockImplementation(childNode => {
					expect(childNode).toBe(node);
					return nextElementSibling;
				});

			expect(node.nextElementSibling).toBe(nextElementSibling);
		});
	});

	describe('toString()', () => {
		it('Returns "[object Text]".', () => {
			const node = document.createTextNode('test');
			expect(node.toString()).toBe('[object Text]');
		});
	});

	describe('remove()', () => {
		it('Removes the node from its parent.', () => {
			const text = document.createTextNode('test');
			let isCalled = false;

			jest.spyOn(ChildNodeUtility, 'remove').mockImplementation(childNode => {
				expect(childNode).toBe(text);
				isCalled = true;
			});

			text.remove();
			expect(isCalled).toBe(true);
		});
	});

	describe('replaceWith()', () => {
		it('Replaces a Node in the children list of its parent with a set of Node or DOMString objects.', () => {
			const text = document.createTextNode('test');
			const node1 = document.createComment('test1');
			const node2 = document.createComment('test2');
			let isCalled = false;

			jest.spyOn(ChildNodeUtility, 'replaceWith').mockImplementation((childNode, ...nodes) => {
				expect(childNode).toBe(text);
				expect(nodes).toEqual([node1, node2]);
				isCalled = true;
			});

			text.replaceWith(node1, node2);
			expect(isCalled).toBe(true);
		});
	});

	describe('before()', () => {
		it("Inserts a set of Node or DOMString objects in the children list of this ChildNode's parent, just before this ChildNode. DOMString objects are inserted as equivalent Text nodes.", () => {
			const text = document.createTextNode('test');
			const node1 = document.createComment('test1');
			const node2 = document.createComment('test2');
			let isCalled = false;

			jest.spyOn(ChildNodeUtility, 'before').mockImplementation((childNode, ...nodes) => {
				expect(childNode).toBe(text);
				expect(nodes).toEqual([node1, node2]);
				isCalled = true;
			});

			text.before(node1, node2);
			expect(isCalled).toBe(true);
		});
	});

	describe('after()', () => {
		it("Inserts a set of Node or DOMString objects in the children list of this ChildNode's parent, just after this ChildNode. DOMString objects are inserted as equivalent Text nodes.", () => {
			const text = document.createTextNode('test');
			const node1 = document.createComment('test1');
			const node2 = document.createComment('test2');
			let isCalled = false;

			jest.spyOn(ChildNodeUtility, 'after').mockImplementation((childNode, ...nodes) => {
				expect(childNode).toBe(text);
				expect(nodes).toEqual([node1, node2]);
				isCalled = true;
			});

			text.after(node1, node2);
			expect(isCalled).toBe(true);
		});
	});
	describe('appendData()', () => {
		it('Appends data.', () => {
			const node = document.createTextNode('test');
			const expectedData = 'data';
			let isCalled = false;

			jest.spyOn(CharacterDataUtility, 'appendData').mockImplementation((characterData, data) => {
				expect(characterData).toBe(node);
				expect(data).toBe(expectedData);
				isCalled = true;
			});

			node.appendData(expectedData);
			expect(isCalled).toBe(true);
		});
	});

	describe('deleteData()', () => {
		it('Deletes data.', () => {
			const node = document.createTextNode('test');
			const expectedOffset = -1;
			const expectedCount = -1;
			let isCalled = false;

			jest
				.spyOn(CharacterDataUtility, 'deleteData')
				.mockImplementation((characterData, offset, count) => {
					expect(characterData).toBe(node);
					expect(offset).toBe(expectedOffset);
					expect(count).toBe(expectedCount);
					isCalled = true;
				});

			node.deleteData(expectedOffset, expectedCount);
			expect(isCalled).toBe(true);
		});
	});

	describe('insertData()', () => {
		it('Inserts data.', () => {
			const node = document.createTextNode('test');
			const expectedOffset = -1;
			const expectedData = 'data';
			let isCalled = false;

			jest
				.spyOn(CharacterDataUtility, 'insertData')
				.mockImplementation((characterData, offset, data) => {
					expect(characterData).toBe(node);
					expect(offset).toBe(expectedOffset);
					expect(data).toBe(expectedData);
					isCalled = true;
				});

			node.insertData(expectedOffset, expectedData);
			expect(isCalled).toBe(true);
		});
	});

	describe('replaceData()', () => {
		it('Replaces data.', () => {
			const node = document.createTextNode('test');
			const expectedOffset = -1;
			const expectedCount = -1;
			const expectedData = 'data';
			let isCalled = false;

			jest
				.spyOn(CharacterDataUtility, 'replaceData')
				.mockImplementation((characterData, offset, count, data) => {
					expect(characterData).toBe(node);
					expect(offset).toBe(expectedOffset);
					expect(count).toBe(expectedCount);
					expect(data).toBe(expectedData);
					isCalled = true;
				});

			node.replaceData(expectedOffset, expectedCount, expectedData);
			expect(isCalled).toBe(true);
		});
	});

	describe('substringData()', () => {
		it('Returns a sub-string.', () => {
			const node = document.createTextNode('test');
			const expectedOffset = -1;
			const expectedCount = -1;

			jest
				.spyOn(CharacterDataUtility, 'substringData')
				.mockImplementation((characterData, offset, count) => {
					expect(characterData).toBe(node);
					expect(offset).toBe(expectedOffset);
					expect(count).toBe(expectedCount);
					return 'substring';
				});

			expect(node.substringData(expectedOffset, expectedCount)).toBe('substring');
		});
	});

	describe('cloneNode()', () => {
		it('Clones the node.', () => {
			const node = document.createTextNode('test');
			const clone = node.cloneNode();
			expect(clone.data).toBe(node.data);
		});
	});
});
