const API_URL = "http://localhost:5000/api/items";


// ======================================
// INDEX PAGE
// ======================================

const itemsContainer = document.getElementById("itemsContainer");
const emptyState = document.getElementById("emptyState");
const itemCount = document.getElementById("itemCount");


// Fetch and display items
async function fetchItems() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch items");
        }

        const items = await response.json();

        displayItems(items);

    } catch (error) {

        console.error("Error:", error);

        itemsContainer.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-danger">
                    <i class="bi bi-exclamation-triangle me-2"></i>
                    Failed to load items.
                    Please make sure the backend server is running.
                </div>
            </div>
        `;

    }

}


// Display items
function displayItems(items) {

    itemsContainer.innerHTML = "";


    // Update item count
    itemCount.textContent =
        `${items.length} ${items.length === 1 ? "Item" : "Items"}`;


    // Empty state
    if (items.length === 0) {

        emptyState.classList.remove("d-none");

        return;

    }

    emptyState.classList.add("d-none");


    // Create cards
    items.forEach(item => {

        const card = createItemCard(item);

        itemsContainer.innerHTML += card;

    });

}


// Create item card
function createItemCard(item) {

    const itemId = item._id || item.id;

    const type = item.type || "Unknown";

    const typeClass =
        type.toLowerCase() === "lost"
            ? "lost"
            : "found";


    return `
        <div class="col-md-6 col-lg-4">

            <div class="item-card">

                <!-- CARD HEADER -->

                <div class="item-card-header">

                    <span class="item-type ${typeClass}">
                        ${escapeHTML(type)}
                    </span>

                    <i class="bi bi-box-seam text-primary fs-4"></i>

                </div>


                <!-- ITEM NAME -->

                <h4 class="item-name">
                    ${escapeHTML(item.name)}
                </h4>


                <!-- LOCATION -->

                <p class="item-detail">
                    <i class="bi bi-geo-alt-fill text-danger me-2"></i>

                    ${escapeHTML(item.location)}
                </p>


                <!-- DATE -->

                <p class="item-detail">

                    <i class="bi bi-calendar-event-fill text-primary me-2"></i>

                    ${formatDate(item.date)}

                </p>


                <!-- EMAIL -->

                <p class="item-detail">

                    <i class="bi bi-envelope-fill text-primary me-2"></i>

                    <a
                        href="mailto:${escapeHTML(item.email)}"
                        class="text-decoration-none"
                    >
                        ${escapeHTML(item.email)}
                    </a>

                </p>


                <!-- DESCRIPTION -->

                <div class="item-description">

                    <strong>
                        <i class="bi bi-card-text me-1"></i>
                        Description
                    </strong>

                    <p class="mb-0 mt-2">
                        ${escapeHTML(item.description)}
                    </p>

                </div>


                <!-- DELETE BUTTON -->

                <button
                    class="btn btn-outline-danger delete-btn"
                    onclick="deleteItem('${itemId}')"
                >

                    <i class="bi bi-trash3 me-1"></i>

                    Delete

                </button>

            </div>

        </div>
    `;

}

// DELETE ITEM

async function deleteItem(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this item?"
    );


    if (!confirmDelete) {
        return;
    }


    try {

        const response = await fetch(
            `${API_URL}/${id}`,
            {
                method: "DELETE"
            }
        );


        if (!response.ok) {
            throw new Error("Failed to delete item");
        }


        // Refresh items
        fetchItems();


    } catch (error) {

        console.error("Delete error:", error);

        alert("Failed to delete item.");

    }

}


// ADD ITEM PAGE

const addItemForm = document.getElementById("addItemForm");


if (addItemForm) {

    addItemForm.addEventListener("submit", async function (event) {

        event.preventDefault();


        // Get form values
        const item = {

            name:
                document.getElementById("itemName").value.trim(),

            type:
                document.getElementById("itemType").value,

            location:
                document.getElementById("itemLocation").value.trim(),

            date:
                document.getElementById("itemDate").value,

            email:
                document.getElementById("itemEmail").value.trim(),

            description:
                document.getElementById("itemDescription").value.trim()

        };


        try {

            const response = await fetch(
                API_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(item)
                }
            );


            if (!response.ok) {

                const errorData = await response.json();

                throw new Error(
                    errorData.message || "Failed to add item"
                );

            }


            alert("Item added successfully!");


            // Go back to homepage
            window.location.href = "index.html";


        } catch (error) {

            console.error("Error:", error);

            alert(
                error.message || "Failed to add item."
            );

        }

    });

}
// FORMAT DATE

function formatDate(date) {

    if (!date) {
        return "No date";
    }


    const formattedDate = new Date(date);


    if (isNaN(formattedDate.getTime())) {
        return "Invalid date";
    }


    return formattedDate.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


// SECURITY

// Prevent HTML injection when displaying
// user-provided data.

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text ?? "";

    return div.innerHTML;

}


// LOAD ITEMS

if (itemsContainer) {

    fetchItems();

}