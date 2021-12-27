const api_url = 'https://jsonplaceholder.typicode.com'

const contenedor = document.getElementById('data')
let data = []

let values = ["Name","Email","Phone"]               //Valores a imprimir


const load = async() =>{
    const response  = await fetch(`${api_url}/users`)
    const users = await response.json()
    return users
}


const carga = document.addEventListener('DOMContentLoaded', async () =>{
    try{
        data = await load()
    }catch(e){
        console.log(e)
    }
})

const printinfo = (data, valores) =>{       //Imprime en forma de lista lod datos

    for(let i=0; i< data.length; i++){
        const lista = document.createElement('li')
        lista.appendChild(document.createTextNode(`${valores[i]} : ${data[i]}`))
        contenedor.appendChild(lista)
        
    }
        
}

const CleanList = () =>{                                            //Limpia la lista
    while(contenedor.hasChildNodes()){
        contenedor.removeChild(contenedor.firstChild)
    }
}

document.getElementById("send").addEventListener('click', event =>{       //Evento al presionar el boton
    event.preventDefault()

    let listado = document.getElementsByTagName("LI")
    
    if ( listado.length > 0){
        CleanList()
    }
    
    

    const nombre = document.querySelector('#name').value
    const usernames = []
    let flag = false
    let pos
    let dataarray = []


    for(let i=0; i< data.length; i++){      //crea arreglo solo de usernames
        usernames[i] = data[i].username
    }

    if(usernames.includes(nombre)){         //busca el nombre en el arreglo creado anteriormente
        flag = true
        pos = usernames.indexOf(nombre)
    }

    if(flag == true){

        const impname = data[pos].name
        const impemail = data[pos].email
        const impphone = data[pos].phone

        dataarray.push(impname, impemail, impphone)

        printinfo(dataarray,values)


    }else{
        alert('Username Not Found')
        document.getElementById('formulario').reset()
    }
    
})



document.getElementById("clean").addEventListener('click', event =>{
    document.getElementById('formulario').reset()
    CleanList()
})

