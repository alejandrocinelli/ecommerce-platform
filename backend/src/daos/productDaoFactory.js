import ProductMongoDao from "./productMongo.doa.js";

export default class ProductDaoFactory {
    static getDao(db) {
        switch (db) {
            case "mongo":
                return ProductMongoDao.getInstance();

            case "mysql":
                return new Error("Not implemented yet");

            default:
                return ProductMongoDao.getInstance();
        }
    }
}
