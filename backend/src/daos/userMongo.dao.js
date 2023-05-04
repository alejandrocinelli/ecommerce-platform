import {User} from '../models/user.model.js';
import MongoDao from './mongo.dao.js';

let instance 

export default class UserMongoDao extends MongoDao {
    constructor() {
        super(User)
    }

    static getInstance() {
        if (!instance) {
            instance = new UserMongoDao()
        }
        return instance
    }
}