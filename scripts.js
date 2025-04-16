function showCards(producttype) {
    const cardContainer = document.getElementById("card-container");
    const templateCard = document.getElementById("card-template");

    if (!templateCard) {
        console.error("Template card element (#card-template) not found.");
        cardContainer.innerHTML = "<div class='error-message'>UI Error: Template missing</div>";
        return;
    }
    const template = templateCard.cloneNode(true);
    template.removeAttribute("id");

    cardContainer.innerHTML = "";

    if (!producttype || !Array.isArray(producttype) || producttype.length === 0) {
        console.log("No products to display.");
        cardContainer.innerHTML = "<div class='no-products-message'>No products match your current filters.</div>";
        return;
    }

    console.log("showCards: Displaying", producttype.length, "products"); 
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < producttype.length; i++) {
        const item = producttype[i];
        const nextCard = template.cloneNode(true);
        nextCard.style.display = "block";
        try {
            if (typeof item !== 'object' || item === null) throw new Error("Invalid item data");
            editCardContent(nextCard, item);
            fragment.appendChild(nextCard);
        } catch (editError) {
            console.error("Error processing product item:", item, editError);
        }
    }
    cardContainer.appendChild(fragment);
}

function editCardContent(card, item) {
    if (!card || !item) {
        console.error("Invalid arguments passed to editCardContent");
        return;
    }
    card.style.display = "block";

    const productImage = card.querySelector(".product-image");
    if (productImage) {
        if (item.imageUrl && typeof item.imageUrl === 'string') {
            productImage.innerHTML = `<img src="${item.imageUrl}" alt="${item.name || 'Product'}">`;
            productImage.classList.add("has-image");
        } else {
            productImage.textContent = "Product Image";
            productImage.classList.remove("has-image");
        }
    }

    const productName = card.querySelector(".product-name");
    if (productName) {
        productName.textContent = item.name || "Unnamed Product";
    }

    const sustainabilityBadge = card.querySelector(".sustainability-badge");
    if (sustainabilityBadge) {
        const sustainabilityCount = (Array.isArray(item.sustainability) ? Math.min(item.sustainability.length, 5) : 0);
        let leafHTML = '';
        for (let i = 0; i < 5; i++) {
            leafHTML += `<span class="leaf ${i < sustainabilityCount ? 'filled' : ''}">🍃</span>`;
        }
        const featureCount = Array.isArray(item.sustainability) ? item.sustainability.length : 0;
        sustainabilityBadge.innerHTML = `
            <div class="leaf-container">${leafHTML}</div>
            <span class="sustainability-text">${featureCount} sustainability feature${featureCount !== 1 ? 's' : ''}</span>
        `;
    }

    let productDetails = card.querySelector(".product-details");
    const cardContent = card.querySelector(".card-content");
    const priceAction = card.querySelector(".price-action");

    if (!productDetails && cardContent && priceAction) {
        productDetails = document.createElement("div");
        productDetails.className = "product-details";
        cardContent.insertBefore(productDetails, priceAction);
    }

    if (productDetails) {
        let detailsHTML = '';
        if (item.brand) detailsHTML += `<p><strong>Brand:</strong> ${item.brand}</p>`;
        if (item.format) detailsHTML += `<p><strong>Format:</strong> ${item.format}</p>`;
        if (Array.isArray(item.sustainability)) detailsHTML += `<p><strong>Sustainability:</strong> ${item.sustainability.join(", ")}</p>`;
        if (Array.isArray(item.skinType)) detailsHTML += `<p><strong>Skin Type:</strong> ${item.skinType.join(", ")}</p>`;
        if (Array.isArray(item.hairType)) detailsHTML += `<p><strong>Hair Type:</strong> ${item.hairType.join(", ")}</p>`;
        if (Array.isArray(item.size)) detailsHTML += `<p><strong>Size:</strong> ${item.size.join(", ")}</p>`;
        productDetails.innerHTML = detailsHTML;
    }

    const price = card.querySelector(".price");
    if (price) {
        const priceValue = parseFloat(item.price);
        price.textContent = !isNaN(priceValue) ? `$${priceValue.toFixed(2)}` : "$--.--";
    }

    const category = steps[currentStepIndex];
    const isSelected = Array.isArray(selectedLook[category]) && selectedLook[category].some(
        selected => selected && selected.name === item.name
    );

    const addButton = card.querySelector(".add-btn");
    if (addButton) {
        addButton.textContent = isSelected ? "Remove" : "Add";
        addButton.classList.toggle("selected", isSelected);
        addButton.onclick = function () {
            const currentCategoryItems = selectedLook[category] || [];
            const itemIndex = currentCategoryItems.findIndex(selected => selected && selected.name === item.name);
            const isCurrentlySelected = itemIndex > -1;

            if (!isCurrentlySelected) {
                selectedLook[category].push(item);
            } else {
                selectedLook[category].splice(itemIndex, 1);
            }
            addButton.textContent = !isCurrentlySelected ? "Remove" : "Add";
            addButton.classList.toggle("selected", !isCurrentlySelected);
            updateSidebar();
        };
    }
}

function updateSidebar() {
    const list = document.getElementById("selectedList");
    const totalEl = document.getElementById("totalPrice");
    const headerTotalEl = document.getElementById("headerTotal");
    list.innerHTML = "";
    let total = 0;
    let hasItems = false;
    for (let category of steps) {
        const items = selectedLook[category];
        if (Array.isArray(items)) {
            for (let item of items) {
                if (item && typeof item === 'object') { 
                    hasItems = true;
                    const li = document.createElement("li");
                    li.textContent = `${item.name} - $${(item.price || 0).toFixed(2)}`;
                    list.appendChild(li);

                    total += parseFloat(item.price || 0);
                }
            }
        }
    }
    if (!hasItems) {
        list.innerHTML = '<p class="no-items">No items selected</p>';
    }
    totalEl.textContent = total.toFixed(2);
    headerTotalEl.textContent = total.toFixed(2);
}

function getUniqueFormats(array) {
    if (!Array.isArray(array)) return [];
    const formats = array.map(item => (item && item.format) ? item.format.toLowerCase() : null);
    const uniqueFormats = Array.from(new Set(formats.filter(f => f !== null)));
    return uniqueFormats;
}

function updateFilterOptions(array) {
    const dropdown = document.getElementById("formatFilter");
    if (!dropdown) return;
    const currentVal = dropdown.value;
    dropdown.innerHTML = ""; 
    const uniqueFormats = getUniqueFormats(array);
    const allOption = document.createElement("option");
    allOption.value = "all";
    allOption.textContent = "All";
    dropdown.appendChild(allOption);
    uniqueFormats.forEach(format => {
        const option = document.createElement("option");
        option.value = format;
        option.textContent = format.charAt(0).toUpperCase() + format.slice(1);
        dropdown.appendChild(option);
    });
    if (dropdown.querySelector(`option[value="${currentVal}"]`)) {
        dropdown.value = currentVal;
    } else {
        dropdown.value = "all";
    }
}

function resetLook() {
    for (let category of steps) {
        selectedLook[category] = [];
    }
    updateSidebar();
    filterAndUpdateDisplay();
    alert("Your look has been reset!");
}

function completeLook() {
    let text = "Your Sustainable Look:\n\n";
    let total = 0;

    for (let category of steps) {
        const items = selectedLook[category];
        if (items.length > 0) {
            text += `• ${category.toUpperCase()}:\n`;
            items.forEach(item => {
                text += `   - ${item.name} (${item.brand}) - $${item.price}\n`;
                total += item.price;
            });
            text += '\n';
        }
    }

    text += `Total Price: $${total.toFixed(2)}\n`;

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "my-sustainable-look.txt";
    downloadLink.click();

    URL.revokeObjectURL(url);
    alert("Look saved successfully!");
}

function NextStep() {
    if (currentStepIndex < steps.length - 1) {
        goToStep(currentStepIndex + 1);
    } else {
        alert("makeover done!");
    }
}

function PreviousStep() {
    if (currentStepIndex > 0) {
        goToStep(currentStepIndex - 1);
    } else {
        alert("no previous step available!");
    }
}

let sustainabilityFilterValue = 0;

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM loaded - Setting up direct event listeners");
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("input", () => {
            filterAndUpdateDisplay();
        });
    }


    const formatFilter = document.getElementById("formatFilter");
    const priceSlider = document.getElementById("priceSlider");
    const priceValueDisplay = document.getElementById("priceValue");
    const leafFilters = document.querySelectorAll('.leaf-filter');

    if (formatFilter) {
        formatFilter.onchange = function () {
            console.log("Format filter changed, triggering filter...");
            filterAndUpdateDisplay();
        };
    } else { console.error("Format filter element not found!"); }

    if (priceSlider && priceValueDisplay) {
        priceSlider.oninput = function () {
            priceValueDisplay.textContent = '$' + this.value;
        };
        priceSlider.onchange = function () {
            console.log("Price slider changed, triggering filter...");
            filterAndUpdateDisplay();
        };
    } else { console.error("Price slider or value display element not found!"); }

    if (leafFilters.length > 0) {
        leafFilters.forEach(function (leaf) {
            leaf.onclick = function () {
                const value = parseInt(this.getAttribute('data-value'));
                let previousValue = sustainabilityFilterValue;

                leafFilters.forEach(function (l) { l.classList.remove('active'); });

                if (sustainabilityFilterValue === value) {
                    sustainabilityFilterValue = 0;
                    console.log("Sustainability filter toggled OFF");
                } else {
                    sustainabilityFilterValue = value;
                    console.log(`Sustainability filter set to: ${value}`);
                    leafFilters.forEach(function (l) {
                        if (parseInt(l.getAttribute('data-value')) <= value) {
                            l.classList.add('active');
                        }
                    });
                }

                if (sustainabilityFilterValue !== previousValue) {
                    console.log("Sustainability changed, triggering filter...");
                    filterAndUpdateDisplay();
                }
            };
        });
    } else { console.warn("Leaf filter elements not found."); }

    console.log("Initial page load, calling goToStep(0)");
    goToStep(0);
});

function filterAndUpdateDisplay() {
    try {
        const currentCategory = steps[currentStepIndex];
        const originalProducts = window[currentCategory];
        if (!Array.isArray(originalProducts)) {
            showCards([]);
            return;
        }

        const searchInput = document.getElementById("searchInput");
        const searchQuery = searchInput ? searchInput.value.trim().toLowerCase() : "";

        const formatValue = document.getElementById("formatFilter").value;
        const priceValue = parseFloat(document.getElementById("priceSlider").value);

        let filtered = originalProducts.filter(product => {
            if (!product || typeof product !== 'object') return false;

            const passesPrice = parseFloat(product.price) <= priceValue;
            const passesFormat = formatValue === "all" || product.format.toLowerCase() === formatValue.toLowerCase();
            const passesSustainability = sustainabilityFilterValue === 0 || (product.sustainability?.length >= sustainabilityFilterValue);

            const matchesSearch = !searchQuery || product.name.toLowerCase().includes(searchQuery) || product.brand.toLowerCase().includes(searchQuery);

            return passesPrice && passesFormat && passesSustainability && matchesSearch;
        });

        showCards(filtered);

    } catch (error) {
        console.error("Filter error:", error);
        const fallback = window[steps[currentStepIndex]];
        showCards(Array.isArray(fallback) ? fallback : []);
    }
}


function goToStep(index) {
    console.log(`--- goToStep triggered for index: ${index} ---`);
    currentStepIndex = index;
    const category = steps[currentStepIndex];
    const products = window[category];

    if (!Array.isArray(products)) {
        console.error(`ERROR: No product data for category ${category} in goToStep.`);
        document.getElementById("card-container").innerHTML = `<div class='error-message'>Error loading products for ${category}.</div>`;
        return;
    }

    console.log("1. Updating active tab UI");
    document.querySelectorAll(".category-tabs .tab").forEach(function (tab, i) {
        tab.classList.toggle("active", i === index);
    });

    console.log("2. Resetting sustainabilityFilterValue state");
    sustainabilityFilterValue = 0;

    console.log("3. Resetting filter UI controls");
    try {
        const formatFilter = document.getElementById("formatFilter");
        const priceSlider = document.getElementById("priceSlider");
        const priceValueDisplay = document.getElementById("priceValue");
        if (formatFilter) formatFilter.value = "all";
        if (priceSlider) priceSlider.value = 200;
        if (priceValueDisplay) priceValueDisplay.textContent = "$200";
        document.querySelectorAll('.leaf-filter').forEach(function (leaf) {
            leaf.classList.remove('active');
        });
    } catch (uiResetError) {
        console.error("Error resetting filter UI controls:", uiResetError);
    }

    console.log("4. Updating format filter options");
    updateFilterOptions(products);

    console.log(`5. Displaying initial ${products.length} products for ${category}`);
    showCards(products);
    console.log(`--- goToStep finished for index: ${index} ---`);
}

function closePopup() {
    document.getElementById("welcome-popup").style.display = "none";
}


            