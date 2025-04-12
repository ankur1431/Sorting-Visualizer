async function countingSort() {
    const ele = document.querySelectorAll(".bar");
    const max = Math.max(...Array.from(ele, e => parseInt(e.style.height)));
    const count = Array(max + 1).fill(0);

    // Count occurrences
    for (let i = 0; i < ele.length; i++) {
        const value = parseInt(ele[i].style.height);
        count[value]++;
        ele[i].style.background = 'blue';
        await waitforme(delay);
        ele[i].style.background = 'cyan';
    }

    // Cumulative count
    for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
    }

    // Build the sorted array
    const output = Array(ele.length);
    for (let i = ele.length - 1; i >= 0; i--) {
        const value = parseInt(ele[i].style.height);
        output[count[value] - 1] = value;
        count[value]--;
        ele[i].style.background = 'blue';
        await waitforme(delay);
        ele[i].style.background = 'cyan';
    }

    // Display sorted array
    for (let i = 0; i < ele.length; i++) {
        ele[i].style.height = `${output[i]}px`;
        ele[i].style.background = 'green';
        await waitforme(delay);
    }
}

const countingSortBtn = document.querySelector(".countingSort");
countingSortBtn.addEventListener('click', async function(){
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await countingSort();
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});
