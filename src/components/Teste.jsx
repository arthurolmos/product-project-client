import { app } from '../services/base'

export default function Teste () {
  const onChangeFile = (event) => {
    const file = event.target.files[0]

    const storageRef = app.storage().ref()
    const ref = storageRef.child(file.name)
    ref.put(file).then(function (snapshot) {
      console.log('Uploaded a blob or file!')
      console.log(snapshot.ref.getDownloadURL().then(function (response) {
        console.log(response)
      }))
    })
  }
  return <input type='file' onChange={onChangeFile} />
}
// File or Blob named mountains.jpg
