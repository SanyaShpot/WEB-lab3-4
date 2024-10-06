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
    treeList.forEach((tree, index) => {
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
    clearForm();
    document.getElementById('modal').style.display = 'block';
}

function hideAddTreeForm() {
    document.getElementById('modal').style.display = 'none';
}

function clearForm() {
    document.getElementById('tree-name').value = '';
    document.getElementById('manufacturer').value = '';
    document.getElementById('height').value = '';
    document.getElementById('price').value = '';
    document.getElementById('material').value = '';
    document.getElementById('image-url').value = '';
    document.getElementById('save-tree-btn').removeAttribute('data-edit-index');
}





function addTree() {
    const treeName = document.getElementById('tree-name').value.trim();
    const manufacturer = document.getElementById('manufacturer').value.trim();
    const height = document.getElementById('height').value.trim();
    const price = parseFloat(document.getElementById('price').value.trim());
    const material = document.getElementById('material').value.trim();
    const imageUrl = document.getElementById('image-url').value.trim();

    if (!treeName || !manufacturer || !height || isNaN(price) || !material || !imageUrl) {
        alert('Please fill in all fields correctly.');
        return;
    }

    const editIndex = document.getElementById('save-tree-btn').getAttribute('data-edit-index');
    
    if (editIndex !== null) {
        trees[editIndex] = new ArtificialTree(treeName, manufacturer, height, price, material, imageUrl);
    } else {
        trees.push(new ArtificialTree(treeName, manufacturer, height, price, material, imageUrl));
    }

    hideAddTreeForm();
    updateFilteredTrees();
}




function editTree(index) {
    const tree = trees[index];
    document.getElementById('tree-name').value = tree.treeName;
    document.getElementById('manufacturer').value = tree.manufacturer;
    document.getElementById('height').value = tree.height;
    document.getElementById('price').value = tree.price;
    document.getElementById('material').value = tree.material;
    document.getElementById('image-url').value = tree.imageUrl;

    const saveButton = document.getElementById('save-tree-btn');
    saveButton.setAttribute('data-edit-index', index);

    document.getElementById('modal').style.display = 'block';
}




function deleteTree(index) {
    if (confirm('Are you sure you want to delete this tree?')) {
        trees.splice(index, 1);
        updateFilteredTrees();
    }
}

document.getElementById('search').addEventListener('input', updateFilteredTrees);

window.onload = function() {
    updateFilteredTrees();
};
