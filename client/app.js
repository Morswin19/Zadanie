const fetch = require('node-fetch')

const getTheResult = (data) => {
  // deconstructing property array
  const {colors, products, selectedFilters, sizes} = data

  // add empty array, colorsProductMerged form merging colors nad product arrays, groupedProducts for merging colorsProductMerged and sizes
  let colorsProductsMerged = [];
  let groupedProducts = [];

  // monogo variables
  let name = "Monogo";
  let buildingNumber = 14;

  // merge colors and products to colorProductMerged array
  for(let i=0; i < colors.length; i++) {
    colorsProductsMerged.push({
     ...(products.find((item) => item.id === colors[i].id)),
     ...colors[i],
    },
    );
  }

  // add key name "color" and give it a "value" key values
  colorsProductsMerged.map(item => item.color = item.value)

  // merge colorsProductMerged and sized to groupedProduct array
  for(let i=0; i < colorsProductsMerged.length; i++) {
    groupedProducts.push({
     ...colorsProductsMerged[i], 
     ...(sizes.find((item) => Number(item.id) == colorsProductsMerged[i].id)),
    },
    );
  }

  // add key name "size" and give it a "value" key values
  groupedProducts.map(item => item.size = item.value)

  // remove "value" key from every item in groupedProducts array
  groupedProducts.map(item => delete item.value)
  // console.log(groupedProducts)

  // filter data by size, colors and selectedFilters
  let filteredProducts = groupedProducts
    .filter(item => selectedFilters.colors.includes(item.color))
    .filter(item => selectedFilters.sizes.includes(item.size))
    .filter(item => item.price > 200)

  // sort products by price
  let sortedPrices = filteredProducts.map(item => item.price).sort()

  // rounded result of multiply highest and lowest price from sortedPrices
  let result = Math.round(sortedPrices[0] * sortedPrices[sortedPrices.length - 1])

  // adding odd and even digits from result
  let splittingArray = result.toString().split("")
  let splittingResult = []
  for(i=0; i < splittingArray.length; i = i + 2){
    splittingResult.push(Number(splittingArray[i]) + Number(splittingArray[i + 1]))
  }

  // finding, which index is equal to number of monogo builidng
  let buildingIndex = splittingResult.indexOf(buildingNumber);

  // final result
  let finalResult = buildingIndex * name.length * result
  console.log(`Final result: ${finalResult}. Have a nice day!`)

}

// function to get data from url
const getDataFromUrl = async () => {
  const api_url = "http://localhost:3000/monogo"
  const response = await fetch(api_url)
  const json = await response.json()
  getTheResult(json)
}

getDataFromUrl()

