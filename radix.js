async function countingSortForRadix(ele, exp) {
    const output = Array(ele.length).fill(0);
    const count = Array(10).fill(0);

    for (let i = 0; i < ele.length; i++) {
        const index = Math.floor(parseInt(ele[i].style.height) / exp) % 10;
        count[index]++;
        ele[i].style.background = 'blue';
        await waitforme(delay);
        ele[i].style.background = 'cyan';
    }

    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    for (let i = ele.length - 1; i >= 0; i--) {
        const index = Math.floor(parseInt(ele[i].style.height) / exp) % 10;
        output[count[index] - 1] = parseInt(ele[i].style.height);
        count[index]--;
        ele[i].style.background = 'blue';
        await waitforme(delay);
    }

    for (let i = 0; i < ele.length; i++) {
        ele[i].style.height = `${output[i]}px`;
        ele[i].style.background = 'green';
        await waitforme(delay);
    }
}

async function radixSort() {
    const ele = document.querySelectorAll(".bar");
    const max = Math.max(...Array.from(ele, e => parseInt(e.style.height)));

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        await countingSortForRadix(ele, exp);
        for (let i = 0; i < ele.length; i++) {
            ele[i].style.background = 'cyan';
        }
    }

    for (let i = 0; i < ele.length; i++) {
        ele[i].style.background = 'green';
    }
}

const radixSortBtn = document.querySelector(".radixSort");
radixSortBtn.addEventListener('click', async function(){
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await radixSort();
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});
