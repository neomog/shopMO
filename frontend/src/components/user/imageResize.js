const imageResize = img =>{
    
    const fileInput = document.getElementById('customeFile')

    const max_width = fileInput.getAttribute('data-maxwidth')
    const max_height = fileInput.getAttribute('data-maxheight')

    const canvas = document.createElement('canvas')

    let width = img.width;
    let height = img.height;

    //calculate the width and hight 
    if (width > height){
        if(width > max_width){
            height = Math.random(height *= max_width / width)
            width = max_width;
        }
    }else{
        if(height > max_height){
            width = Math.random(width *= max_height / height);
            height = max_height;
        }
    }
    
    //resize the canvas and draw the image into it 
    canvas.width = width;
    canvas.height = height;

    let ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, width, height);

    return canvas.toDataURL("image/jpeg",0.7)
    


}

export default imageResize