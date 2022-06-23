const cargarDatos = () => {
    // alert('Hola mundo')
    fetch('https://dataserverdaw.herokuapp.com/escritores/xml')
    .then((response) => response.text())
    .then(data => {
        const parser = new DOMParser()
        const xml = parser.parseFromString(data, 'text/xml')
        const escritores = xml.getElementsByTagName('escritor')
        const select = document.getElementsByTagName('select')[0]
        for (let i = 0; i < escritores.length; i++) {
            const escritor = escritores[i]
            const optElement = document.createElement('option')
            optElement.innerText = escritor.querySelector('nombre').textContent
            optElement.value = escritor.querySelector('id').textContent
            select.appendChild(optElement)
        }
    })
}
document.addEventListener('DOMContentLoaded', cargarDatos)

document.querySelector('select').addEventListener('change',  (evt) => {
    /** @param {HTMLSelectElement} select */
    const select = document.querySelector('select')
    const opt = select.options[select.selectedIndex]
    console.log(select)
    fetch('https://dataserverdaw.herokuapp.com/escritores/frases')// JSON response
    .then(r => r.text())
    .then(data => {
        const response = JSON.parse(data)
        /** @type {Array<Object>}  */
        const phrases = response.frases
        phrases.filter(phrase => phrase.id_autor == select.value)
        .forEach(phrase => {
            const contentHtml = `
            <div class="col-lg-3">
                <div class="test-inner ">
                    <div class="test-author-thumb d-flex">
                        <div class="test-author-info">
                            <h4>${opt.textContent}</h4>                                            
                        </div>
                    </div>
                    <span>${phrase.texto}</span>
                    <i class="fa fa-quote-right"></i>
                </div>
            </div>
            `
            document.getElementById('frases').innerHTML += contentHtml
        })
    })
})


