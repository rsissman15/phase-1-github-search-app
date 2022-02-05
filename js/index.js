document.addEventListener("DOMContentLoaded",()=>{

    const form=document.getElementById('github-form')

    form.addEventListener('submit',e=>{
        e.preventDefault();
        getUsers(e.target[0].value);
    })


    function getUsers(userName){
        fetch(`https://api.github.com/search/users?q=${userName}`,{
            method:'GET',
            headers:{
                Accept: "application/vnd.github.v3+json"
            }
        })
        .then(res=>res.json())
        .then(response=>{
            response.items.map(data=>displayUser(data));
        })
    }

    function displayUser(user){
        const userList=document.querySelector("#user-list");

        const li=document.createElement('li');

        const h3=document.createElement('h3');

        const image=document.createElement('img');
        image.src=user.avatar_url;
        image.id=user.login

        image.addEventListener('click', getRepositories);


        h3.innerText=user.login;
        
        li.append(image,h3);
        userList.append(li);

    }

    function getRepositories(e){
        fetch(`https://api.github.com/users/${e.target.id}/repos`,{
            method:'GET',
            headers:{
                Accept: "application/vnd.github.v3+json"
            }
        })
            .then(res=>res.json())
            .then(response=>console.log(response));
        

    }
    
})






