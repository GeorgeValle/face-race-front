export //function for calculate all amount the itemList
const calculateTotalAmount = (selected) =>{
    if(!selected||!selected.itemList) return 0;
    return selected.itemList.reduce((total, concurrent)=> total + concurrent.amount, 0)
}