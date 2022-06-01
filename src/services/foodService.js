import db from '../models';
let getAllFood = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let foods = await db.Food.findAll();
            resolve(foods);
        } catch (error) {
            reject(error);
        }
    });
};
let paginateFood = async (page, limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let foodAll = await getAllFood();
            let foods = await db.Food.findAll({
                offset: page * limit, // your page number
                limit: limit,
            });

            resolve({ page: Math.floor(foodAll.length / limit), current: page, limit: limit, foods: foods });
        } catch (error) {
            reject(error);
        }
    });
};
let insertMultiFood = async (foods) => {
    return new Promise(async (resolve, reject) => {
        try {
            foods.forEach((element, index) => {
                element.id = index + 1;
                element.createAt = formartDate();
                element.updateAt = formartDate();
            });
            await db.Food.destroy({ where: {} });
            await db.Food.bulkCreate(foods).catch((error) => {
                console.log(error);
            });
            resolve(foods);
        } catch (error) {
            reject(error);
        }
    });
};

let deleteFoodById = async (id) => {
    return new Promise(async (resolve, reject) => {
        db.Food.destroy({ where: { id: id } });
        resolve('Xoá thành công Food ' + id);
        try {
        } catch (error) {
            reject(error);
        }
    });
};
let randomFood = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let count = await getCountFood();
            const random = Math.floor(Math.random() * count);
            let randomFood = await findFoodById(random);
            resolve(randomFood);
        } catch (error) {
            reject(error);
        }
    });
};
let deleteAllFood = () => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Food.destroy({ where: {}, truncate: true });
            resolve('Xoá thành công');
        } catch (error) {
            reject(error);
        }
    });
};
let findFoodById = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (id) {
                let result = await db.Food.findOne({ where: { id }, raw: true });
                resolve(result);
            }
        } catch (error) {
            reject(error);
        }
    });
};

let formartDate = () => {
    var date = new Date();
    return (
        ('00' + (date.getMonth() + 1)).slice(-2) +
        '/' +
        ('00' + date.getDate()).slice(-2) +
        '/' +
        date.getFullYear() +
        ' ' +
        ('00' + date.getHours()).slice(-2) +
        ':' +
        ('00' + date.getMinutes()).slice(-2) +
        ':' +
        ('00' + date.getSeconds()).slice(-2)
    );
};
let insertFood = async (food) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Food.create({
                name: food.name,
                key: food.key,
                link: food.link,
                image: food.image,
                message: food.message,
            });
        } catch (error) {
            reject(error);
        }
    });
};
let getCountFood = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let count = await db.Food.count();
            resolve(count);
        } catch (error) {
            reject;
        }
    });
};
module.exports = {
    getAllFood: getAllFood,
    insertMultiFood: insertMultiFood,
    insertFood: insertFood,
    deleteAllFood: deleteAllFood,
    deleteFoodById: deleteFoodById,
    paginateFood: paginateFood,
    randomFood: randomFood,
    getCountFood: getCountFood,
    findFoodById: findFoodById,
};
