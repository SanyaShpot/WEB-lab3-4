class ArtificialTree {
    constructor(treeName, manufacturer, height, price, material, imageUrl) {
        this.treeName = treeName;
        this.manufacturer = manufacturer;
        this.height = height;
        this.price = price;
        this.material = material;
        this.imageUrl = imageUrl;
    }
}

let trees = [
    new ArtificialTree('Різдвяна', 'EcoTree', 180, 1500, 'Поліпропілен', 'https://content2.rozetka.com.ua/goods/images/big/224684109.jpg'),
    new ArtificialTree('Лапландська', 'GreenDay', 150, 2100, 'Метал+Пластик', 'https://images.prom.ua/3546449582_yalinka-shtuchna-z.jpg'),
    new ArtificialTree('Снігова Королева', 'EcoTree', 170, 1200, 'Пластик', 'https://images.prom.ua/2660785995_w640_h640_2660785995.jpg'),
    new ArtificialTree('Лісова', 'Christmas', 200, 2200, 'Метал', 'https://content.rozetka.com.ua/goods/images/big/302719124.jpg')
];

let isSorted = false;
let isTotalPriceVisible = false;
let currentFilteredTrees = [...trees];





function updateFilteredTrees() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    
    currentFilteredTrees = trees.filter(tree => tree.material.toLowerCase().includes(searchInput));

    if (isSorted) {
        currentFilteredTrees.sort((a, b) => a.price - b.price);
    }

    const totalPriceElement = document.getElementById('total-price');
    if (isTotalPriceVisible) {
        const totalPrice = currentFilteredTrees.reduce((sum, tree) => sum + tree.price, 0);
        totalPriceElement.textContent = `Total Price: ${totalPrice} ₴`;
    } else {
        totalPriceElement.textContent = '';
    }

    displayTrees(currentFilteredTrees);
}



function displayTrees(treeList) {
    const treeContainer = document.getElementById('tree-container');
    treeContainer.innerHTML = '';
    treeList.forEach((tree) => {
        const originalIndex = trees.indexOf(tree);

        const treeBlock = `
            <div class="tree-block">
                <img src="${tree.imageUrl}" alt="${tree.treeName}" class="tree-image">
                <h4>${tree.treeName}</h4>
                <p>Виробник: ${tree.manufacturer}</p>
                <p>Висота: ${tree.height} см</p>
                <p>Ціна: ${tree.price} ₴</p>
                <p>Матеріал: ${tree.material}</p>
                <button onclick="editTree(${originalIndex})" class="tree-edit">Edit</button>
                <button onclick="deleteTree(${originalIndex})" class="tree-delete">Delete</button>
            </div>
        `;
        treeContainer.insertAdjacentHTML('beforeend', treeBlock);
    });
}



function sortTrees() {
    isSorted = !isSorted;
    updateFilteredTrees();
}

function searchTrees() {
    updateFilteredTrees();
}

function countTotalPrice() {
    isTotalPriceVisible = !isTotalPriceVisible;
    updateFilteredTrees();
}

function showAddTreeForm() {
    document.querySelector('.controls').style.display = 'none';
    document.getElementById('add-tree-form').style.display = 'block';
}

function hideAddTreeForm() {
    document.querySelector('.controls').style.display = 'block';
    document.getElementById('add-tree-form').style.display = 'none';
}



function addTree() {
    const treeName = document.getElementById('tree-name').value;
    const manufacturer = document.getElementById('manufacturer').value;
    const height = document.getElementById('height').value;
    const price = parseFloat(document.getElementById('price').value);
    const material = document.getElementById('material').value;
    const imageUrl = document.getElementById('image-url').value;

    if (!treeName || !manufacturer || !height || isNaN(price) || !material || !imageUrl) {
        alert('Enter all required fields!');
        return;
    }

    const newTree = new ArtificialTree(treeName, manufacturer, height, price, material, imageUrl);

    const editIndex = document.getElementById('add-tree-btn').getAttribute('data-edit-index');
    if (editIndex !== null) {
        trees[editIndex] = newTree;
        currentFilteredTrees[editIndex] = newTree;
        document.getElementById('add-tree-btn').removeAttribute('data-edit-index');
    } else {
        trees.push(newTree);
        currentFilteredTrees.push(newTree);
    }

    updateFilteredTrees();
    hideAddTreeForm();
}




function editTree(index) {
    const tree = trees[index];
    document.getElementById('tree-name').value = tree.treeName;
    document.getElementById('manufacturer').value = tree.manufacturer;
    document.getElementById('height').value = tree.height;
    document.getElementById('price').value = tree.price;
    document.getElementById('material').value = tree.material;
    document.getElementById('image-url').value = tree.imageUrl;

    showAddTreeForm();

    document.getElementById('add-tree-btn').setAttribute('data-edit-index', index);
}



function deleteTree(index) {
    trees.splice(index, 1);
    updateFilteredTrees();
}

function toggleButtonActive(button) {
    button.classList.toggle('active');
}

document.querySelectorAll('.controls button').forEach(button => {
    button.addEventListener('click', function() {
        toggleButtonActive(this);
    });
});

updateFilteredTrees();
