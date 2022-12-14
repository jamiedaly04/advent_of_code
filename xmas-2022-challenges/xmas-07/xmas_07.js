// PART 1
//---------------------------------
import { Tree } from './trees.js';
import { input } from './inputs.js'

const testInput = [
    '$ cd /',
    '$ ls',
    'dir a',
    '14848514 b.txt',
    '8504156 c.dat',
    'dir d',
    '$ cd a',
    '$ ls',
    'dir e',
    '29116 f',
    '2557 g',
    '62596 h.lst',
    '$ cd e',
    '$ ls',
    '584 i',
    '$ cd..',
    '$ cd..',
    '$ cd d',
    '$ ls',
    '4060174 j',
    '8033020 d.log',
    '5626152 d.ext',
    '7214296 k',
]

let tree = new Tree('/', 0);
//(Key, childKey, childValue)
/* tree.insert('/', 'A', 0);
tree.insert('/', 'B', 0);
tree.insert('A', 'E', 0);
tree.insert('B', 'D', 0); */

let currentNode
let directoryName
console.log(tree)

/*
console.log(tree.find(11).hasParent)
console.log(tree.root.key)
console.log(tree.root.hasChildren)
console.log(tree.find(12).parent.key) */


for (let i = 0; i < testInput.length; i++) {
    if (testInput[i].includes('$ cd')) {
        if (testInput[i].includes('/')) {
            //Go to base directory
            console.log(testInput[i])
            currentNode = tree.find(tree.root.key)
        }
        else if (testInput[i].includes('..')) {
            //Go up a directory
            console.log(testInput[i])
            if (currentNode.hasParent) {
                currentNode = tree.find(currentNode.key).parent.key
            }
        }
        else {
            //Go into x directory
            console.log(testInput[i])
            directoryName = (testInput[i].slice(4)).trim()
            currentNode = tree.find(directoryName)
        }
    } else if (testInput[i].includes('$ ls')) {
        console.log(testInput[i])
        i++
        do {
            if (testInput[i].includes('$ cd')) {
                i--
                break;
            } else {
                if (testInput[i].startsWith('dir')) {
                    //Create DIR
                    console.log(testInput[i])
                    tree.insert(currentNode.key, testInput[i].slice(4).trim(), 0);
                } else {
                    //Add file value to node
                    console.log(testInput[i])
                    let splitValue = testInput[i].split(" ")
                    currentNode.value += parseInt(splitValue[0])
                    console.log(currentNode.value)
                }
                i++
            }
        } while (i < testInput.length)

    } else {
        console.log('In ELSE statement, need to investigate why this has happened')
    }
}



function nodeTotalCalc(item) {
    if (tree.find(item).hasParent) {
        tree.find(item).parent.sumOfChildren += (tree.find(item).sumOfChildren + tree.find(item).value)
        tree.find(item).sumOfChildren += tree.find(item).value
    } else {
        tree.find(item).sumOfChildren += tree.find(item).value
    }
}

const nodeArray = [...tree.postOrderTraversal()].map(x => (x.key))
console.log(nodeArray)
nodeArray.forEach(nodeTotalCalc)

console.log(tree)

const sumOfChildrenArray = [...tree.postOrderTraversal()].map(x => (x.sumOfChildren))
console.log(sumOfChildrenArray)

let part1Total = 0

for (let x in sumOfChildrenArray) {
    if (sumOfChildrenArray[x] <= 100000) {
       part1Total += sumOfChildrenArray[x]
    }
}
console.log(part1Total)