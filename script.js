document.addEventListener('DOMContentLoaded', () => {
    const jsonPath = 'products.json';

    fetch(jsonPath)
        .then(response => response.json())
        .then(products => {
            displayProducts(products); // Initially display all products

            // Setup radio button filters for categories
            document.querySelectorAll('input[name="productType"]').forEach(radio => {
                radio.addEventListener('change', function() {
                    // Hide all category-specific filter divs and clear filters
                    hideAllFilterDivs();
                    clearAllCheckboxFilters();

                    // Show the relevant filter div based on the checked radio button
                    const normalizedValue = normalizeCategoryName(this.value);
                    const filterDiv = document.getElementById(`content-${normalizedValue}`);
                    if (filterDiv) {
                        filterDiv.style.display = 'block';
                    }

                    // Filter and display products based on the selected category
                    applyFilters(products, this.value);
                });
            });

            // Setup checkbox filters for attributes within each category
            document.querySelectorAll('.filter input[type="checkbox"]').forEach(checkbox => {
                checkbox.addEventListener('change', () => {
                    const selectedCategory = document.querySelector('input[name="productType"]:checked')?.value;
                    applyFilters(products, selectedCategory);
                });
            });
        })
        .catch(error => console.error('Error loading the JSON:', error));

    function hideAllFilterDivs() {
        document.querySelectorAll('.category-filters').forEach(div => {
            div.style.display = 'none';
        });
    }

    // Function to clear all selected checkbox filters
    function clearAllCheckboxFilters() {
        document.querySelectorAll('.category-filters input[type="checkbox"]:checked').forEach(checkbox => {
            checkbox.checked = false;
        });
    }

    function normalizeCategoryName(categoryName) {
        return categoryName.toLowerCase().replace(/\s+/g, '-'); // Replace spaces with dashes
    }

    function applyFilters(products, selectedCategory) {
        const filters = {};
        // Collect filters for the selected category
        document.querySelectorAll('.filter input[type="checkbox"]:checked').forEach(checkbox => {
            const attribute = checkbox.dataset.attribute;
            const value = checkbox.dataset.value;
            if (!filters[attribute]) {
                filters[attribute] = [];
            }
            filters[attribute].push(value);
        });

        // Filter products based on the selected category and checked filters within that category
        const filteredProducts = products.filter(product => {
            // First, filter by category
            if (selectedCategory && product.category !== selectedCategory) {
                return false;
            }
            // Then apply additional filters from checkboxes
            return Object.keys(filters).every(key =>
                !filters[key].length || filters[key].includes(product[key])
            );
        });

        displayProducts(filteredProducts);
    }

    function displayProducts(filteredProducts) {
        const displayArea = document.getElementById('productDisplay');
        displayArea.innerHTML = ''; // Clear previous content

        filteredProducts.forEach(product => {
            // Create the container for the product card
            const productCardLink = document.createElement('a');
            productCardLink.href = product.url; // Assuming 'product.url' is the URL to the product page
            productCardLink.classList.add('product-card');
            productCardLink.target = "_blank"; // Optional: Opens the link in a new tab/window

            // Create and append the picture
            const productImage = document.createElement('img');
            productImage.src = product.picture;
            productImage.alt = `Image of ${product.name}`;
            productCardLink.appendChild(productImage);
    
            // Create and append the product name
            const productName = document.createElement('h3');
            productName.textContent = product.name;
            productCardLink.appendChild(productName);
    
            // Create and append the category
            const productCategory = document.createElement('p');
            productCategory.textContent = `Category: ${product.category}`;
            productCardLink.appendChild(productCategory);
    
            // Create and append the capacity
            const productCapacity = document.createElement('p');
            productCapacity.textContent = `Capacity: ${product.capacity}`;
            productCardLink.appendChild(productCapacity);
    
            // Create and append the efficiency
            const productEfficiency = document.createElement('p');
            productEfficiency.textContent = `Efficiency: ${product.efficiency}`;
            productCardLink.appendChild(productEfficiency);
    
            // Create and append the stages
            const productStages = document.createElement('p');
            productStages.textContent = `Stages: ${product.stages}`;
            productCardLink.appendChild(productStages);
    
            // Create and append the price
            const productPrice = document.createElement('p');
            productPrice.textContent = `Price: ${product.price}`;
            productCardLink.appendChild(productPrice);
    
            // Create and append the fuel source
            const productFuelSource = document.createElement('p');
            productFuelSource.textContent = `Fuel Source: ${product['fuel source']}`; // Note the use of bracket notation for the space in 'fuel source'
            productCardLink.appendChild(productFuelSource);
    
            // Append the entire card to the display area
            displayArea.appendChild(productCardLink);
        });
    }
});
