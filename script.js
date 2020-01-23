
async function getList() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const list = await response.json();
    return list;
}

(async function () {

    const ulMenu = document.body.appendChild(document.createElement('ul'));
    ulMenu.style.display = 'none';
    ulMenu.classList.add('menu');
    const ulEl = document.createElement('ul');

    const list = await getList();
    createHtml(list);

    ulEl.addEventListener('click', deleteItem);
    document.getElementById('butt-elem').addEventListener('click', addText);
    ulEl.addEventListener('click', showMenu);
 
    function createHtml(arrList) {
        const divEl = document.body.appendChild(document.createElement('div'));
        divEl.classList.add('wrapper');
        const inputEl = divEl.appendChild(document.createElement('input'));
        inputEl.setAttribute('id', 'input-elem');
        inputEl.classList.add('input-elem');
        const buttonEl = divEl.appendChild(document.createElement('button'));
        buttonEl.setAttribute('id', 'butt-elem');
        buttonEl.innerText = 'add';
        buttonEl.classList.add('add')

        divEl.appendChild(ulEl);
        ulEl.setAttribute('id', 'ul-elem');

        createList(arrList);

        createMenu();

    }

    function createList(arrList) {
        const fragment = new DocumentFragment();

        for (let i = 0; i < arrList.length; i++) {
            const spanEl = document.createElement('span');
            spanEl.innerText = arrList[i].title;
            const liEl = document.createElement('li');
            liEl.appendChild(spanEl);

            buttonList = document.createElement('button');
            buttonList.innerText = '...';

            stringWrapper = document.createElement('div');
            stringWrapper.classList.add('string-wrapper');
            stringWrapper.appendChild(liEl);
            stringWrapper.appendChild(buttonList);

            fragment.appendChild(stringWrapper);
        }

        ulEl.appendChild(fragment);
    }

    function createMenu() {
        const options = [];
        const optionNames = ['change', 'save'];
        optionNames.forEach(item => {
            const option = document.createElement('li');
            option.classList.add(item);
            option.innerText = item;
            options.push(option);
        })

        ulMenu.append(...options);
        document.body.appendChild(ulMenu);
    }

    function deleteItem(event) {
        if (event.target.tagName === 'SPAN') {
            const divEl = event.target.parentNode.parentNode.parentNode
            divEl.removeChild(event.target.parentNode.parentNode);
        }
    }

    function addText() {
        const inputEl = document.getElementById('input-elem');
        if (inputEl.value.length === 0) {
            alert('Please fill in the field');
        };
        const array = [];
        const obj = {};
        obj.title = `${inputEl.value}`;
        array.push(obj);

        createList(array)

        inputEl.value = '';
    }

    function showMenu(event) {
        const target = event.target;

        if (event.target.tagName === 'BUTTON') {
            if (ulMenu.style.display === 'none') {
                const coord = target.getBoundingClientRect();
                ulMenu.style.cssText = `display:block; top: ${coord.bottom}px; left: ${coord.left}px`;

            } else {
                ulMenu.style.cssText = `display:none`;
            }

            ulMenu.onclick = function doChangeOrAddOrSave(event) {
                if (event.target.className === 'change') {
                    const inputEl = document.createElement('input');
                    inputEl.value = target.previousElementSibling.innerText;
                    const coord = target.previousElementSibling.getBoundingClientRect();
                    inputEl.style.width = `${coord.width}px`;
                    const divEl = target.previousElementSibling.parentNode;
                    divEl.insertBefore(inputEl, target);
                    target.parentNode.firstElementChild.parentNode.removeChild(target.parentNode.firstElementChild);
                }
                if (event.target.className === 'save') {
                    const liEl = document.createElement('li');
                    spanEl = liEl.appendChild(document.createElement('span'));
                    spanEl.innerText = inputEl.value;
                    liEl.style.width = "auto";

                    const divEl = target.previousElementSibling.parentNode;
                    divEl.insertBefore(liEl, target);
                    target.parentNode.firstElementChild.parentNode.removeChild(target.parentNode.firstElementChild);
                    ulMenu.style.display = "none";
                }
            }
        }
    }
}
)();
