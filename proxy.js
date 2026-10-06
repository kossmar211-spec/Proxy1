document.getElementById('go-btn').addEventListener('click', function() {
    const url = document.getElementById('url-input').value;
    if (!url) return;
    
    // Usamos un servicio CORS proxy como intermediario
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/' + url;
    
    fetch(proxyUrl)
        .then(response => response.text())
        .then(html => {
            // Modificamos los enlaces para que pasen por nuestro proxy
            const modifiedHtml = html.replace(
                /(href|src)=["']?(https?:\/\/)/g,
                '$1="' + window.location.href + '?url='
            );
            
            document.getElementById('content').innerHTML = modifiedHtml;
        })
        .catch(error => {
            document.getElementById('content').innerHTML = 
                '<p>Error al cargar la página: ' + error + '</p>';
        });
});

// Si hay una URL en los parámetros, cargamos esa página
const urlParams = new URLSearchParams(window.location.search);
const url = urlParams.get('url');
if (url) {
    document.getElementById('url-input').value = url;
    document.getElementById('go-btn').click();
}
