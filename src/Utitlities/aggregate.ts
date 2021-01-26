const aggregateShoppingListData = (shoppingLists: any[]) => {
    const productShoppingLists = []
    for (const list of shoppingLists){
        productShoppingLists.push({value: list.id, label: list.title, 
            title: list.title, role: "Collection"})
    }
    return productShoppingLists;
}

export default aggregateShoppingListData;