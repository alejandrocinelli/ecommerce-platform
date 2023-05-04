import UserMongoDao from "./userMongo.dao.js";

export default class UserDaoFactory {
  static getDao(db) {
    switch (db) {
      case "mongo":
        return UserMongoDao.getInstance();
      
        case "mysql":
        return new Error("Not implemented yet");
        
      default:
        return UserMongoDao.getInstance();
    }
  }
}