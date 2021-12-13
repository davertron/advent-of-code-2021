const fs = require("fs");
const path = require("path");

function getInput(filename) {
    return fs
        .readFileSync(path.join(__dirname, filename), "utf-8")
        .trim()
        .split("\n");
}

function isSmallCave(node) {
    return node.toUpperCase() !== node;
}

function parseInput(lines) {
    const adjacencyList = {};
    for (let line of lines) {
        let [a, b] = line.split("-");
        if (!adjacencyList[a]) adjacencyList[a] = [];
        if (!adjacencyList[b]) adjacencyList[b] = [];
        adjacencyList[a].push(b);
        adjacencyList[b].push(a);
    }

    return adjacencyList;
}

function traverse(node, aList, visited, path, results) {
    if (visited.has(node)) {
        return;
    }
    if (isSmallCave(node)) {
        visited.add(node);
    }
    if ("end" === node) {
        results.push([...path, node]);
    } else {
        const neighbors = aList[node];
        for (let n of neighbors) {
            traverse(n, aList, new Set(visited), [...path, node], results);
        }
    }
}

function part1() {
    const lines = getInput("input.txt");
    const adjList = parseInput(lines);

    const results = [];
    traverse("start", adjList, new Set(), [], results);

    console.log("Part 1: ", results.length);
}

function part2() {
    const lines = getInput("sample1.txt");
    console.log("Part 2: ", null);
}

part1();
part2();
