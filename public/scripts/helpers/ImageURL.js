const baseURL = import.meta.env.PUBLIC_URL

function imageURL(imagePath){
  const safeULR = `url(${baseURL}/${imagePath})`
  return safeULR
}
  

export {imageURL};