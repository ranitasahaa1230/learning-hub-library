export const isInHistoryVideo=(history,id)=>{
    return  history.some(({_id})=>_id === id)
}
