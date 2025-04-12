async function heapify(ele, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    ele[i].style.background = 'blue';
    if (left < n && parseInt(ele[left].style.height) > parseInt(ele[largest].style.height)) {
        largest = left;
    }
    if (right < n && parseInt(ele[right].style.height) > parseInt(ele[largest].style.height)) {
        largest = right;
    }

    if (largest !== i) {
        swap(ele[i], ele[largest]);
        await waitforme(delay);
        await heapify(ele, n, largest);
    }
    ele[i].style.background = 'cyan';
}

async function heapSort() {
    const ele = document.querySelectorAll(".bar");
    const n = ele.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(ele, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        swap(ele[0], ele[i]);
        ele[i].style.background = 'green';
        await waitforme(delay);
        await heapify(ele, i, 0);
    }
    ele[0].style.background = 'green';
}

const heapSortBtn = document.querySelector(".heapSort");
heapSortBtn.addEventListener('click', async function(){
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await heapSort();
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});
