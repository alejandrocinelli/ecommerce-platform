import { Product } from "../models/product.model.js";
import MongoDao from "./mongo.dao.js";

let instance;

export default class ProductMongoDao extends MongoDao {
  constructor() {
    super(Product);
  }
 
  static getInstance() {
    if (!instance) {
      instance = new ProductMongoDao();
    }
    return instance;
  }
}