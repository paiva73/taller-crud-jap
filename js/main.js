const URL = (paramUrl) => `https://6542beb501b5e279de1f8312.mockapi.io/${paramUrl}`

//Results
const results = document.getElementById('results');
//GET
const btnBuscar = document.getElementById('btnGet1');
const idABuscar = document.getElementById('inputGet1Id');
//POST
const btnPost = document.getElementById('btnPost');
const postName = document.getElementById('inputPostNombre');
const postLastName = document.getElementById('inputPostApellido');
//PUT
const inputModificar = document.getElementById("inputPutId");
const btnModificar = document.getElementById("btnPut");
const btnSendChanges = document.getElementById('btnSendChanges');
const putName = document.getElementById('inputPutNombre');
const putLastName = document.getElementById('inputPutApellido');
//DELETE
const btnDelete = document.getElementById("btnDelete");
const inputDelete = document.getElementById("inputDelete");

//Alternar la propiedad disabled
document.addEventListener('DOMContentLoaded', () => {

    function func1(input, button) {
        if(input.value.trim() !== ''){
            button.removeAttribute('disabled');
        } else {
            button.setAttribute('disabled', 'true');
        }
    };

    function func2 (input1, input2, button) {
        if (input1.value.trim() !== '' && input2.value.trim() !== '') {
            button.removeAttribute('disabled');
        } else {
            button.setAttribute('disabled', 'true');
        }
    }

    function func3 (input1, input2, button) {
        if (input1.value.trim() !== '' && input2.value.trim() !== '') {
            button.removeAttribute('disabled');
            button.setAttribute('data-bs-dismiss', 'modal');
            
        } else {
            button.setAttribute('disabled', 'true');
            button.removeAttribute('data-bs-dismiss');
        }
    }

    postName.addEventListener('input', () => {
        func2(postName, postLastName, btnPost);
    });
    
    postLastName.addEventListener('input', () => {
        func2(postName, postLastName, btnPost);
    });

    inputModificar.addEventListener('input', () => {
        func1(inputModificar, btnModificar);
    });

    inputDelete.addEventListener('input', () => {
        func1(inputDelete, btnDelete);
    })

    putName.addEventListener('input', () => {
        func3(putName, putLastName, btnSendChanges);
    });
    
    putLastName.addEventListener('input', () => {
        func3(putName, putLastName, btnSendChanges);
    });
})
  
//FETCH GET 
async function showUser(paramUrl){
    try {
        const response = await fetch(URL(paramUrl));
        if(!response.ok) {
            throw error();
        }
        const data = await response.json();
        showData(data);
    } catch (error) {
        console.log('Ha ocurrido un error.');
    }
};

//GET
btnBuscar.addEventListener('click', () => {
    results.innerHTML = '';
    if(idABuscar.value.trim() == ""){
        showUser('users');
    } else {
        showUser(`users/${idABuscar.value}`);
    }
    idABuscar.value = ''; 
});

//FETCH POST
async function postUser(){
    const name = postName.value.trim();
    const lastName = postLastName.value.trim();

    const newUser = {
        name: name,
        lastname: lastName
    };
    
    const optionsPost = {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
            "Content-Type": "application/json"
        } 
    }

    try {
        const response = await fetch(URL('users'), optionsPost);
        if(!response.ok) {
            throw error();
        } else{
            showUser('users');
        }
         
    } catch (error) {
        console.log('Ha ocurrido un error.');
    }
};

btnPost.addEventListener('click', () => {
    results.innerHTML = '';
    postUser();
    postName.value = '';
    postLastName.value = '';
    btnPost.setAttribute('disabled', 'true');
})

//FETCH PUT
async function putUser(param) {

    const name = document.getElementById('inputPutNombre').value; 
    const lastname = document.getElementById('inputPutApellido').value;

    const updatedUser = {
        name: name,
        lastname: lastname
    };

    const optionsPut = {
        method: "PUT",
        body: JSON.stringify(updatedUser),
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
        const response = await fetch(URL(`${param}`), optionsPut);
        if(!response.ok) {
            throw error();
        }
        showUser('users');
    } catch (error) {
        console.log('Ha ocurrido un error.');
    }
}
btnSendChanges.addEventListener('click', () => {
    results.innerHTML = '';
    putUser(`users/${inputModificar.value}`);
    inputModificar.value = '';
    putName.value = '';
    putLastName.value = '';
    btnModificar.setAttribute('disabled', 'true');
});

//FETCH DELETE
  async function deleteUser(param){
    
    const optionsDelete = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      };

    try {
        const response = await fetch(URL(`${param}`), optionsDelete);
        if(!response.ok) {
           throw error();
        }

        showUser('users');
    } catch (error) {
        console.log('Ha ocurrido un error.');
    }
};

//DELETE
btnDelete.addEventListener('click', () => {
    results.innerHTML = '';
    deleteUser(`users/${inputDelete.value}`);
    inputDelete.value = '';
    btnDelete.setAttribute('disabled', 'true');
})

function showData(datosEpicos) {
    if(Array.isArray(datosEpicos)){
        datosEpicos.forEach(element => {
            results.innerHTML += `
                <ul class="card bg-dark py-2 pl-3">
                    <li>ID: ${element.id}</li>
                    <li>NAME: ${element.name}</li>
                    <li>LASTNAME: ${element.lastname}</li>
                </ul>
                `
        });

    }else {
        results.innerHTML += `
        <ul class="card bg-dark py-2 pl-3">
            <li>ID: ${datosEpicos.id}</li>
            <li>NAME: ${datosEpicos.name}</li>
            <li>LASTNAME: ${datosEpicos.lastname}</li>
        </ul>
        `
    }
}


function error() {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2000,
        width: 600,
        background: '#F8D7DA',
        color: '#9B1D20',
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'error',
        title: 'Algo salió mal...'
      })
}


