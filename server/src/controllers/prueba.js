let arrUser1 = [
  { id: 1, id_user: 2, id_chat: 10},
  { id: 2, id_user: 2, id_chat: 3 },
  { id: 3, id_user: 2, id_chat: 6 },
  { id: 4, id_user: 2, id_chat: 13 },
]

let arrUser2 = [
  { id: 6, id_user: 2, id_chat: 11 },
  { id: 7, id_user: 2, id_chat: 5 },
  { id: 8, id_user: 2, id_chat: 6 },
  { id: 9, id_user: 2, id_chat: 2 },
]
function findChat(arr1 ,arr2){
  const newX = arr1.reduce((cc, el) => cc.concat(el.id_chat), [] )
  const mY = arr2.filter(data => newX.indexOf(data.id_chat) != -1)

  if(mY.length == 0){
      return false
  }else{
      return true
  }
}
console.log(findChat(arrUser1, arrUser2))