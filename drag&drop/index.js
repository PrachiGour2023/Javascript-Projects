const sortableList = document.querySelector(".sortable-list");
const items = sortableList.querySelectorAll(".item");

items.forEach(item => {
    item.addEventListener("dragstart", () => {
        item.classList.add("dragging");
    })
    item.addEventListener("dragend", () => {
        item.classList.remove("dragging");
    })
})

const dragSortableList = (e) => {
    // console.log(e)
    e.preventDefault();
    const draggingItem = sortableList.querySelector(".dragging");
    const siblings = [...sortableList.querySelectorAll(".item:not(.dragging)")]
    const nextSibling = siblings.find(sibling => {
        return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    });

    sortableList.insertBefore(draggingItem, nextSibling);
}

sortableList.addEventListener("dragover", dragSortableList);
sortableList.addEventListener("dragenter", (e) => e.preventDefault());