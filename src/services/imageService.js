export const uploadImage = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = (error) => {
      console.error('Error uploading image:', error)
      reject(error)
    }
    reader.readAsDataURL(file)
  })
}

export const deleteImage = async () => {
  // No-op for localStorage image handling
  return
}
