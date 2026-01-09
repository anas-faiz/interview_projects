const productsInputValidation = ({name, price, category, stock})=>{

    if(!name.trim() || !price.trim() || !category.trim() || !stock.trim()){
        throw new Error ("enter all the required feilds");
    }
}

module.exports = productsInputValidation