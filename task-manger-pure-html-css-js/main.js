
// # introduction # \\

/*

    *   Time is the more expencive than money
    *   and to manage the tasks that you have to do 
    *   there is suppose to be someone that creat a task manger 
    *   and also make it kinda open source
    *   So me as a full stack dev  
    *   i created a task manager 
    *   i cant wait to see you test it

    $   LECINSE    $
    $ this cade is mine and 
    $ i dont give you the right to steel it 
    $ and say its yours
    $ I give you the right to take it and update it 
    $ or change some thing in it 
    $ but dont forget to mention me
    $   see ya   $    
*/



// defining variable first and the elements
// to be clear el stands for element
const body = document.body
const el_tasks = document.querySelector('.tasks')
const el_form = document.querySelector('.add > form')
const el_addField = el_form.querySelector('input#addField')
const el_header = document.querySelector('.add > header')
const no_task = document.querySelector('.add > .tasks > .no-task')

// definding the tasks array
var tasks =  [

]



// create when the user click on any alphabet key it will focus on the task input
window.addEventListener('keydown',
    e=>{
        el_addField.focus()
    }
)

// handlening when submitting the form
el_form.onsubmit = (e)=>{
    e.preventDefault()
    const text = el_addField.value
    text ? addTask(text) : ''


    // to cleat the input after sending
    el_addField.value = ''


    // this is about the fancy thing so dont care about it  
    el_header.innerHTML= ''
}






// a function to scroll into the view
const scrollIntoView = ()=>{
    const task = document.querySelectorAll('.task')
    task && task[task.length - 1].scrollIntoView()
}    



// a function to generate an id to the task
const newId = ()=>{
    try{
        return tasks[tasks.length - 1].uid + 1
    }catch(e){
        return 1
    }
}




// to update the tasks debending on an object
const addTask = (text)=>{


    // push the taks to the task array 
    tasks.push({uid:newId(), text:text})
    
    // we clear every task to write the new tasks
    el_tasks.querySelectorAll('.task').forEach(e=>e.remove())
    

    // we add the tasks to the dom
    tasks.map(
        e=>{
            const div = document.createElement('div')
            div.className = 'task'
            div.append(e.text)
            div.setAttribute('c', e.uid)
            el_tasks.append(div)
            div.ondblclick = (e)=>{
                console.log('hi')
                deletTask(e.target)
            }
        }    
    )    

    // if the list is long we can scroll into the last task 
    scrollIntoView()
    
}    



/* 
    * a fuction to delete  the task
    * and we make it asyncrise fuction cause window.confirm might taks some time
*/
const deletTask = async (el)=>{
    // we get the element id from the dom
    const c = el.getAttribute('c')
    // we creat a window to be sure that you wanna to delete it and bcz this might take some time
    // we force the function to wait for it
    const authtentication = await window.confirm(`are sure to to delete ${c} task uid`)
    // we need to make sure that the user confirmed the auth
    if(authtentication){
        // we loop to into the task array
        for(i in tasks){
            // and if the uid matches one of the elements
            if(tasks[i].uid == c){
                // we delete it() from the task array
                tasks.splice(i,1)
                // dont forget to delet it() from the dom
                allTasks(c).remove()
            }
        }

        /* to delete later */
        console.log(tasks)
    }
}



//  this function will return to me the whole tasks or if i use the first prameter it will return to a specefic task by passing his id to the first paramter
const allTasks = (selectSpecial)=>{
    if(selectSpecial){
        return document.querySelector(`.tasks > [c="${selectSpecial}"]`)
    }else{
        return document.querySelectorAll(`.tasks > [c]`)
    }
}




// a function to kill all the tasks 
const kill = ()=>{
    tasks = []
    el_tasks.querySelectorAll('.task').forEach(e=>e.remove())
}





        /* to delete later */


/* 

    #this section is only about making some fancy thing happens ,
    #when writing a task ,
    #or some thing else ,
    #its the fancy gen brooh .


    **  
        i will not write any comments write now ,
        cause it will take a while ,
        so i will only write some simple comments
        i hope u uderstands it .
    **

*/

// when click on no tasks find then it will focus on the add field input 
no_task.onclick = ()=>{
    el_addField.focus()
}


// when writing some task it will show in the header " Writing..."
el_addField.oninput = (e)=>{
    if(e.target.value == ''){
        el_header.innerHTML == ''
    }else {
        if(el_header.innerHTML != '<div><div><div></div><div></div><div></div></div></div>'){
            el_header.innerHTML = '<div><div><div></div><div></div><div></div></div></div>'
        }
        setTimeout(
            ()=>{
                el_header.innerHTML = ''
            },
            3000
        )
    }
    
}


/*

    * for some reason safari might sucks when using vh unit
    * so we can make a function to change the body height 
    * every time we resize the screen
    * and we will use the px unit

*/

window.onresize = (e)=>{
    const height = e.target.innerHeight
    body.style.height = `${height}px`
}
// also first time renders we want to change it without waiting to resize 
body.style.height = `${window.innerHeight}px`