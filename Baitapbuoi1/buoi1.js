// 
// câu 1:Tạo mảng sản phẩm.
function product (id , name , price , quantity , category, isAvailable) {
    this.id = id
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.category = category;
    this.isAvailable = isAvailable;
}
// câu 2: Khởi tạo mảng products với ít nhất 6 sản phẩm.
const products = [
 new product (1,"Iphone 16 Promax", 30000000,5,"Phone", true),
 new product (2,"Samsung Galaxy S25 Ultra", 28000000,10,"Phone", true),
 new product (3,"Xiaomi Mi 14 Pro", 20000000,15,"Phone", true),
 new product (4,"Sony WH-1000XM5", 8000000,8,"Tai HeadPhone", true),
 new product (5,"Bose QuietComfort 45", 7500000,12,"HeadPhone", false),
 new product (6,"Dell XPS 13", 35000000,4,"Laptop", true),
 new product (7,"MacBook Pro 16", 45000000,6,"Laptop", true),    
 new product (8, "G90 mouse", 150000,12,"Accessories", true),
 new product (8, "G502 mouse", 150000,12,"Accessories", false),
];
console.log("Câu 2:", products);

// câu 3: Tạo mảng mới chỉ chứa name và price của sản phẩm.
const productNamesAndPrices = products.map(p => ({
  name: p.name,
  price: p.price
}));

console.log("Câu 3:", productNamesAndPrices);

// câu 4:Lọc ra sản phẩm còn hàng trong kho
console.log("Câu 4:");
const InStockProduct = products.filter(product => product.quantity>0 && product.isAvailable);
console.log(InStockProduct);

// câu 5:Kiểm tra tất cả sản phẩm có giá trên 30000000
console.log("Câu 5:");
const PriceOver30M = products.some(product => product.price > 30000000);
console.log(PriceOver30M);


//câu 6:kiểm tra sản phẩm thuộc danh mục  "Accessories"  có đang được bán isavaliable = true 
console.log("Câu 6:");
const AccessoriesAvailable = products
  .filter(product => product.category === "Accessories")
  .every(product => product.isAvailable);

console.log(AccessoriesAvailable);


//câu 7:Tính tổng giá trị kho hàng . giá trị kho hàng = price * quantity
console.log("Câu 7:");
const totalInventoryValue = products.reduce((total, product) => {
    return total + (product.price * product.quantity);
}, 0);
console.log(totalInventoryValue);

// câu 8: dùng for ...of duyệt mảng products và in ra: tên sản phẩm- Danh mục-Trạng Thái.
console.log("Câu 8:");
for (const product of products) {
    const status = product.isAvailable ? "Còn hàng" : "Hết hàng";
    console.log(`Tên sản phẩm: ${product.name} - Danh mục: ${product.category} - Trạng Thái: ${status}`);
} 

// câu 9: dùng for...in  để :
// in ra giá trị thuộc tính
// in ra giá trị tương ứng

console.log("Câu 9:");
for (const key in products[0]) {
  console.log(`${key}: ${products[0][key]}`);
}

//câu 10: lấy danh sách  tên sản phẩm đang bán và còn hàng
console.log("Câu 10:");
const availableProductNames = [];
for (const product of products) {
    if (product.isAvailable && product.quantity > 0) {
        availableProductNames.push(product.name);
    }
}