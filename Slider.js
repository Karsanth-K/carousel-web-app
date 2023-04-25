const rightBtn = document.querySelector('.right')
const leftBtn = document.querySelector('.left')
const container = document.querySelector('.container')
const cntnts = document.querySelectorAll('.cntnt')
const inp_clr = document.querySelector('.inp')
const display_box = document.querySelector('.display_box')
let len = cntnts.length
const clr_arr = ["#c0c0c0",'#ff0000','#ffff00','#00ffff','#00ff00','#808000','#008080',"#000080",'#ff00ff','#0f000f']
let transX_factor = 100/len;
let transX = 0;
let cntnt_no = 1;

document.getElementById('slide').placeholder = `Slide index (1 to ${len})`
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function hexToRgb(hex) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const rgb = `rgb(${r}, ${g}, ${b})`;
    return rgb;
}

cntnts.forEach(element => {
    element.style.backgroundColor = `${clr_arr[(Math.round(Math.random()*7))]}`
});
display_box.style.boxShadow=`0 0 25px ${cntnts[0].style.backgroundColor}`
rightBtn.addEventListener('click',()=>{
    container.style.transform = `translateX(${(transX=(transX-transX_factor >= (len-1)*(0-transX_factor))?transX-transX_factor:0)}%)`
    // setTimeout(() => {
    //     document.querySelector(`.cntnt${Math.round((cntnt_no-1==0)?len:cntnt_no-1)}`).style.visibility = "hidden";
    // }, 750);
    cntnt_no = Math.round(1+transX/(-transX_factor));
    // document.querySelector(`.cntnt${Math.round(cntnt_no)}`).style.visibility = "visible";
    display_box.style.boxShadow="0 0 25px "+document.querySelector(`.cntnt${(cntnt_no)}`).style.backgroundColor
    let clr = document.querySelector(`.cntnt${(cntnt_no)}`).style.backgroundColor
    setTimeout(()=>{
        const rgbValues = clr.substring(4, clr.length - 1).split(",");
        const r = parseInt(rgbValues[0].trim());
        const g = parseInt(rgbValues[1].trim());
        const b = parseInt(rgbValues[2].trim());
        inp_clr.value = rgbToHex(r,g,b)
    },500)
})

leftBtn.addEventListener('click',()=>{
    container.style.transform = `translateX(${(transX=(transX+transX_factor>=1)?((len-1)*(0-transX_factor)):(transX+transX_factor))}%)`
    // setTimeout(() => {
    //     document.querySelector(`.cntnt${Math.round((cntnt_no+1>len)?1:cntnt_no+1)}`).style.visibility = "hidden";
    //     // console.log(`.cntnt${Math.round((cntnt_no+1>len)?0:cntnt_no+1)}`)
    // }, 750);
    cntnt_no = Math.round(1+transX/(-transX_factor));
    // console.log(cntnt_no)
    // document.querySelector(`.cntnt${Math.round(cntnt_no)}`).style.visibility = "visible";
    display_box.style.boxShadow="0 0 25px "+document.querySelector(`.cntnt${(cntnt_no)}`).style.backgroundColor
    let clr = document.querySelector(`.cntnt${(cntnt_no)}`).style.backgroundColor
    setTimeout(()=>{
        const rgbValues = clr.substring(4, clr.length - 1).split(",");
        const r = parseInt(rgbValues[0].trim());
        const g = parseInt(rgbValues[1].trim());
        const b = parseInt(rgbValues[2].trim());
        inp_clr.value = rgbToHex(r,g,b)
    },500)
})

inp_clr.addEventListener('input',()=>{
    const inp = inp_clr.value
    document.querySelector(`.cntnt${cntnt_no}`).style.backgroundColor = `${inp}`;
    display_box.style.boxShadow="0 0 10000px "+document.querySelector(`.cntnt${(cntnt_no)}`).style.backgroundColor
    // console.log(`.cntnt${cntnt_no}`)
})

function delete_element(){
    const eleno = Number(document.getElementById('slide').value)
    if(eleno>=1 && eleno<=len && len>2){
        document.querySelector(`.cntnt${eleno}`).remove()
        len-=1
        transX=0
        container.style.transform = `translateX(${transX})`
        transX_factor = 100/len
        for(let i=eleno;i<=len;i++){
            document.querySelectorAll('.cntnt')[i-1].classList.remove(`cntnt${i+1}`)
            document.querySelectorAll('.cntnt')[i-1].classList.add(`cntnt${i}`)
        }
        setTimeout(() => {
            document.getElementById('slide').placeholder = `Slide index (1 to ${len})`
        }, 2000);
        document.getElementById('slide').placeholder = "Successfully Deleted !"
    }
    else if(len==2){
        document.getElementById('slide').placeholder = "Invalid operation!"
    }
    else 
        document.getElementById('slide').placeholder = `Enter a valid index (1 to ${len})`
        
    document.getElementById('slide').value = null
}

function add_element(){
    const newDiv = document.createElement('div')
    const url=document.getElementById('img_src').value
    const color = document.getElementById('clr_select').value
    // console.log(url,color)
    newDiv.style.backgroundColor = hexToRgb(color)
    newDiv.classList.add(`cntnt${len+1}`)
    newDiv.classList.add("cntnt")
    container.appendChild(newDiv)
    len++
    const newImg = document.createElement('img')
    if(url!=0){
        newImg.src = url
        newImg.alt = "Invalid Image/Url"
    }
    document.getElementsByClassName(`cntnt${len}`)[0].appendChild(newImg)
    transX=0
    container.style.transform = `translateX(${transX})`
    transX_factor = 100/len
    document.getElementById('clr_select').value = '#000000'
    document.getElementById('img_src').value = null
    document.getElementById('img_src').placeholder = "Successfully added"
    setTimeout(() => {
        document.getElementById('img_src').placeholder = "(if required)"
    }, 3000);
    document.getElementById('slide').placeholder = `Slide index (1 to ${len})`
}