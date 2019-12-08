function solve() {
    let btn = Array.from(document.querySelectorAll('button'))[0];
    btn.addEventListener('click', function() {
        let ul = Array.from(document.querySelectorAll('ul'))[0];
        if(ul.style.display !== 'block'){
            ul.style.display = 'block'
        }
        else {
            ul.style.display = 'none';
            document.getElementById('box').style.color = 'white';
            document.getElementById('box').style.backgroundColor = 'black';
        }

        let colorBtns = Array.from(document.querySelectorAll('li'));

        for(let li of colorBtns){
            li.addEventListener('click', function(){
                document.getElementById('box').style.color = 'black';
                document.getElementById('box').style.backgroundColor = li.textContent;
            })
        }
    })
}